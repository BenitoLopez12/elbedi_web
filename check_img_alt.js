import fs from 'fs';
import path from 'path';

const extensions = ['.jsx', '.tsx', '.astro', '.html', '.vue', '.svelte'];

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else {
      if (extensions.includes(path.extname(filePath))) {
        results.push(filePath);
      }
    }
  });
  return results;
}

function checkFiles() {
  const srcDir = path.join(process.cwd(), 'src');
  if (!fs.existsSync(srcDir)) {
    console.log("No 'src' directory found.");
    return;
  }
  const files = getFiles(srcDir);
  let totalImg = 0;
  let totalMissingAlt = 0;
  const missingAltDetails = [];

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split(/\r?\n/);
    
    let currentTag = '';
    let startLine = 0;
    let insideTag = false;

    lines.forEach((line, index) => {
      let i = 0;
      while (i < line.length) {
        if (!insideTag) {
          const imgStart = line.indexOf('<img', i);
          if (imgStart !== -1 && (imgStart === 0 || /\s/.test(line[imgStart-1]))) {
            insideTag = true;
            startLine = index + 1;
            currentTag = '';
            i = imgStart;
          } else {
            break;
          }
        }

        if (insideTag) {
          const tagEnd = line.indexOf('>', i);
          if (tagEnd !== -1) {
            currentTag += line.substring(i, tagEnd + 1);
            totalImg++;
            
            // Fixed regex: word boundary \b for alt
            const hasAlt = /\balt\s*=/.test(currentTag);
            
            if (!hasAlt) {
              totalMissingAlt++;
              const relativePath = path.relative(process.cwd(), file);
              missingAltDetails.push(`${relativePath}:${startLine}`);
            }
            
            insideTag = false;
            i = tagEnd + 1;
            currentTag = '';
          } else {
            currentTag += line.substring(i) + ' ';
            break;
          }
        }
      }
    });
  });

  console.log(`Total images found: ${totalImg}`);
  console.log(`Total missing alt: ${totalMissingAlt}`);
  if (missingAltDetails.length > 0) {
    console.log('\nDetails (file:line):');
    missingAltDetails.forEach(detail => console.log(detail));
  }
}

checkFiles();
