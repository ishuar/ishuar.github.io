#!/usr/bin/env bash
# PreToolUse guard. Blocks writes to .env* (holds the GitHub token) and local
# deploys (the site deploys from GitHub Actions only). Branch protection for
# main lives in GitHub repo settings, not here.
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

case "$tool" in
  Write|Edit|MultiEdit)
    path=$(jq -r '.tool_input.file_path // empty' <<<"$input")
    if [[ "$(basename "$path")" =~ ^\.env(\..+)?$ ]]; then
      deny "Writing to $path is blocked. .env holds REACT_APP_GITHUB_TOKEN; edit env.example instead."
    fi
    ;;

  Bash)
    cmd=$(jq -r '.tool_input.command // empty' <<<"$input")

    # --- local deploy ---
    if [[ "$cmd" =~ (npm[[:space:]]+run[[:space:]]+deploy|npx[[:space:]]+gh-pages|(^|[^a-z-])gh-pages[[:space:]]) ]]; then
      deny "Local deploy is blocked. This site deploys via the GitHub Actions workflow only."
    fi

    # --- .env via shell redirect or tee ---
    # Matches "> .env", ">> .env.local", "tee -a ./.env", "> \"$PWD/.env\"".
    env_target='[[:space:]]*["'"'"']?([^[:space:]"'"'"']*/)?\.env(\.[^[:space:]"'"'"']+)?["'"'"']?([[:space:]]|$)'
    if [[ "$cmd" =~ (\>\>?|tee[[:space:]]+(-a[[:space:]]+)?)$env_target ]]; then
      deny "Redirecting output into .env is blocked. Edit env.example instead."
    fi
    ;;
esac

exit 0
