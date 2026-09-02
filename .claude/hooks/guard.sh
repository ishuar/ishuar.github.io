#!/usr/bin/env bash
# PreToolUse guard. Blocks: .env writes, local deploy, any write to main.
# Reads the tool call as JSON on stdin; emits a deny decision on match.
set -euo pipefail

input=$(cat)
tool=$(jq -r '.tool_name' <<<"$input")

deny() {
  jq -n --arg r "$1" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: $r
    }
  }'
  exit 0
}

current_branch() {
  git -C "${CLAUDE_PROJECT_DIR:-.}" branch --show-current 2>/dev/null || echo ""
}

case "$tool" in
  Write|Edit|MultiEdit)
    path=$(jq -r '.tool_input.file_path // empty' <<<"$input")
    if [[ "$(basename "$path")" =~ ^\.env(\..+)?$ ]]; then
      deny "Writing to $path is blocked. .env holds REACT_APP_GITHUB_TOKEN; edit env.example instead."
    fi
    ;;

  Bash)
    cmd=$(jq -r '.tool_input.command // empty' <<<"$input")

    # --- deploy ---
    if [[ "$cmd" =~ (npm[[:space:]]+run[[:space:]]+deploy|npx[[:space:]]+gh-pages|(^|[^a-z-])gh-pages[[:space:]]) ]]; then
      deny "Local deploy is blocked. This site deploys via the GitHub Actions workflow only."
    fi

    # --- .env via shell redirect ---
    if [[ "$cmd" =~ (>|>>|tee[[:space:]]+(-a[[:space:]]+)?)[[:space:]]*\.env($|[[:space:]]|\.) ]]; then
      deny "Redirecting output into .env is blocked. Edit env.example instead."
    fi

    # --- main branch protection ---
    # 1. Any push that names main, or any force push.
    if [[ "$cmd" =~ git[[:space:]]+push ]]; then
      if [[ "$cmd" =~ (^|[[:space:]:/])main([[:space:]]|$) ]]; then
        deny "Pushing to main is blocked. Open a PR from a branch."
      fi
      if [[ "$cmd" =~ (--force|-f([[:space:]]|$)|--force-with-lease|\+[a-zA-Z]) ]]; then
        deny "Force push is blocked."
      fi
      # Bare 'git push' while on main.
      if [[ "$(current_branch)" == "main" ]]; then
        deny "You are on main. Pushing from main is blocked. Create a branch first."
      fi
    fi

    # 2. History-writing commands while checked out on main.
    if [[ "$cmd" =~ git[[:space:]]+(commit|merge|rebase|cherry-pick|revert|am|reset[[:space:]]+--hard) ]]; then
      if [[ "$(current_branch)" == "main" ]]; then
        deny "You are on main. Commits/merges on main are blocked. Run: git switch -c <branch>"
      fi
    fi

    # 3. Indirect writes via GitHub API.
    if [[ "$cmd" =~ gh[[:space:]]+api ]] && [[ "$cmd" =~ (PUT|POST|PATCH|DELETE|-X[[:space:]]+(PUT|POST|PATCH|DELETE)) ]] && [[ "$cmd" =~ /contents/ ]]; then
      deny "Writing repo contents via gh api is blocked. Use a branch and PR."
    fi
    ;;
esac

exit 0
