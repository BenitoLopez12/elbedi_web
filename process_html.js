const fs = require('fs');
const path = 'c:/Users/Lopez Mejia/OneDrive/Escritorio/exapleIaPage.html';

try {
    let content = fs.readFileSync(path, 'utf8');

    // 1) Extract srcdoc content from iframe
    const srcdocMatch = content.match(/srcdoc="([^"]+)"/);
    if (!srcdocMatch) {
        console.error("No srcdoc found in iframe");
        process.exit(1);
    }
    let innerHtml = srcdocMatch[1];

    // 2) Decode HTML entities
    innerHtml = innerHtml
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');

    // 3) Clean editor artifacts
    // Remove CSS block containing .hovered-element etc.
    innerHtml = innerHtml.replace(/<style[^>]*>[^<]*\.hovered-element[^<]*<\/style>/gi, '');
    // Remove script
    innerHtml = innerHtml.replace(/<script src="\/embed\/main\.umd\.js"><\/script>/gi, '');

    // 4) Remove unnecessary wrappers (frame-root, frame-content)
    // This looks for divs with these classes/ids and unwraps them while keeping children
    innerHtml = innerHtml.replace(/<div[^>]*class="[^"]*(frame-root|frame-content)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi, '$2');
    // Simple recursive-ish check for a few levels if nested
    innerHtml = innerHtml.replace(/<div[^>]*class="[^"]*(frame-root|frame-content)[^"]*"[^>]*>([\s\S]*?)<\/div>/gi, '$2');

    // 5) Save result
    fs.writeFileSync(path, innerHtml, 'utf8');

    // 6) Verify
    const finalContent = fs.readFileSync(path, 'utf8');
    const hasIframe = finalContent.includes('<iframe');
    const hasSrcdoc = finalContent.includes('srcdoc=');
    const hasHtmlTag = /<!doctype html>|<html/i.test(finalContent);

    console.log("Validation:");
    console.log("- Contains <iframe: " + hasIframe);
    console.log("- Contains srcdoc=: " + hasSrcdoc);
    console.log("- Contains <html> or doctype: " + hasHtmlTag);

    if (!hasIframe && !hasSrcdoc && hasHtmlTag) {
        console.log("Success: File processed and verified.");
    } else {
        console.log("Warning: Verification failed conditions.");
    }

} catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
}
