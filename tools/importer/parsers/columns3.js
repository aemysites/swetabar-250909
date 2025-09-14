/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row as specified
  const headerRow = ['Columns (columns3)'];

  // Find the main columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all top-level rows (each direct child of .columns.block)
  const rowDivs = Array.from(columnsBlock.children);

  // For each row, collect its immediate children as columns
  const contentRows = rowDivs.map(rowDiv => {
    // Each rowDiv should have two children (columns)
    return Array.from(rowDiv.children);
  });

  // Build the table rows: header, then each row's columns
  const tableRows = [headerRow, ...contentRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
