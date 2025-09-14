/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first <picture> or <img> for the background image
  let imageEl = element.querySelector('picture, img');

  // Compose content: heading, subheading, CTA (if present)
  const content = [];
  // Find the heading (h1, h2, etc.)
  let headingEl = element.querySelector('h1, h2, h3, h4, h5, h6');
  if (headingEl) content.push(headingEl);

  // Optionally: find subheading, paragraph, CTA (not present in this example)
  if (headingEl) {
    let next = headingEl.nextElementSibling;
    while (next) {
      if (next.tagName === 'P' && next.textContent.trim()) {
        content.push(next);
      }
      next = next.nextElementSibling;
    }
  }
  // Defensive: If no heading found, try to find any paragraph with text
  if (!headingEl) {
    const paragraphs = element.querySelectorAll('p');
    for (const p of paragraphs) {
      if (p.textContent.trim()) {
        content.push(p);
        break;
      }
    }
  }

  // Build the table: header, image, then content (title/subheading/cta)
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [content.length > 0 ? content : ''];
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
