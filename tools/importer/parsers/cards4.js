/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header row as required
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Get all <li> (cards)
  const cards = ul.querySelectorAll(':scope > li');
  cards.forEach((card) => {
    // Defensive: Find image container and body container
    const imageContainer = card.querySelector('.cards-card-image');
    const bodyContainer = card.querySelector('.cards-card-body');

    // Find the image (use <picture> or <img> directly)
    let imageEl = null;
    if (imageContainer) {
      // Prefer <picture> if present
      imageEl = imageContainer.querySelector('picture') || imageContainer.querySelector('img');
    }

    // Defensive: If no image, cell must still be present (empty)
    const imageCell = imageEl ? imageEl : '';

    // For the text cell, include the entire body container (preserves heading, description, etc)
    const textCell = bodyContainer ? bodyContainer : '';

    // Add the row: [image, text]
    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
