const fs = require("fs");
const path = require("path");

// Function to recursively find all .js files in a directory
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findJsFiles(filePath, fileList);
    } else if (file.endsWith(".js")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Function to update imports and component usage
function updateFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Skip files that don't use react-reveal
  if (!content.includes("react-reveal")) {
    return;
  }

  console.log(`Updating ${filePath}`);

  // Update import statements
  content = content.replace(
    /import\s+\{\s*Fade\s*\}\s+from\s+["']react-reveal["']/g,
    'import { Fade } from "react-awesome-reveal"'
  );

  content = content.replace(
    /import\s+\{\s*Fade\s*,\s*Slide\s*\}\s+from\s+["']react-reveal["']/g,
    'import { Fade, Slide } from "react-awesome-reveal"'
  );

  // Update Fade component usage
  content = content.replace(
    /<Fade\s+left(\s+duration=\{[^}]+\})?/g,
    '<Fade direction="left" triggerOnce'
  );

  content = content.replace(
    /<Fade\s+right(\s+duration=\{[^}]+\})?/g,
    '<Fade direction="right" triggerOnce'
  );

  content = content.replace(
    /<Fade\s+bottom(\s+duration=\{[^}]+\})?/g,
    '<Fade direction="up" triggerOnce'
  );

  content = content.replace(
    /<Fade\s+top(\s+duration=\{[^}]+\})?/g,
    '<Fade direction="down" triggerOnce'
  );

  // For Fade without direction, just add triggerOnce
  content = content.replace(
    /<Fade(\s+duration=\{[^}]+\})?(?!\s+direction)/g,
    "<Fade triggerOnce"
  );

  // Update Slide component usage if present
  content = content.replace(
    /<Slide\s+left(\s+duration=\{[^}]+\})?/g,
    '<Slide direction="left" triggerOnce'
  );

  content = content.replace(
    /<Slide\s+right(\s+duration=\{[^}]+\})?/g,
    '<Slide direction="right" triggerOnce'
  );

  content = content.replace(
    /<Slide\s+bottom(\s+duration=\{[^}]+\})?/g,
    '<Slide direction="up" triggerOnce'
  );

  content = content.replace(
    /<Slide\s+top(\s+duration=\{[^}]+\})?/g,
    '<Slide direction="down" triggerOnce'
  );

  fs.writeFileSync(filePath, content, "utf8");
}

// Main function
function main() {
  const srcDir = path.join(__dirname, "src");
  const jsFiles = findJsFiles(srcDir);

  jsFiles.forEach(updateFile);

  console.log("All files updated successfully!");
}

main();
