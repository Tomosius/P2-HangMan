// Function to create a table from game history data
function createGameHistoryTable(data) {
  const table = document.createElement('table');

  for (const game of data) {
    const tableRow = document.createElement('tr');

    for (let i = 0; i < game.length; i++) {
      const cellData = game[i];
      const tableCell = document.createElement('td');

      if (Array.isArray(cellData)) {
        const subTable = document.createElement('table');

        for (const attempt of cellData) {
          const subTableRow = document.createElement('tr');

          for (const attemptData of attempt) {
            const subTableCell = document.createElement('td');
            subTableCell.textContent = attemptData;
            subTableRow.appendChild(subTableCell);
          }

          subTable.appendChild(subTableRow);
        }

        tableCell.appendChild(subTable);
      } else {
        tableCell.textContent = cellData;
      }

      tableRow.appendChild(tableCell);
    }

    table.appendChild(tableRow);
  }

  return table;
}

// Call the function with the game history data
const tableContainer = document.getElementById('table-container');
const gameHistoryTable = createGameHistoryTable(gameHistory);
tableContainer.appendChild(gameHistoryTable);
