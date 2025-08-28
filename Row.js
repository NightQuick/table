import { createElement } from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
export class TableRow {
  constructor(data, columns) {
    this.id = data.id;
    this.data = data;
    this.columns = columns;
  }

  render() {
    let row = document.createElement("tr");
    row.class = row;
    row.id = "row" + "-" + this.id;

    for (let col of this.columns) {
      if (col == "id") continue;
      let tableData = document.createElement("td");
      tableData.id = col + "-" + this.id;
      tableData.textContent = this.data[col];

      if (col == "name") {
        let buttonEdit = document.createElement("button");
        buttonEdit.className = "edit";
        buttonEdit.id = "buttonEdit" + this.id;
        let buttonX = document.createElement("button");
        buttonX.className = "x";
        buttonX.id = "buttonX" + this.id;
        let buttons = [buttonEdit, buttonX];
        buttons.forEach((button) => {
          tableData.appendChild(button);
        });
      }
      row.appendChild(tableData);
    }
    return row;
  }

  getValue(columnName) {
    return this.data[columnName];
  }

  setValue(columnName, value) {
    this.data[columnName] = value;
  }

  contains(searchBy, searchStr) {
    if (!searchStr) return true;
    const value = this.getValue(searchBy);
    return (
      value && value.toString().toLowerCase().includes(searchStr.toLowerCase())
    );
  }
  static compare(a, b, sortBy) {
    let valA = a.getValue(sortBy);
    let valB = b.getValue(sortBy);
    if (valA < valB) return -1;
    if (valA > valB) return 1;
    if (valA == valB) return 0;
  }
  edit(rowToEditId) {
    let row = document.getElementById(`row-${rowToEditId}`);
    for (let col of this.columns) {
      let text = document.getElementById(col + "-" + rowToEditId).textContent;
      text = text.replace("ex", "");
      let textCell = document.getElementById(`${col}-${rowToEditId}`),
        textBox = document.createElement("textarea");

      textCell.innerHTML = "";
      textCell.id = "";
      textBox.id = col + "-" + rowToEditId;
      textBox.textContent = text;

      textCell.appendChild(textBox);
      row.appendChild(textCell);
    }
    let Cell = document.createElement("cd"),
      saveButton = document.createElement("button");
    saveButton.id = "saveEdit";
    saveButton.textContent = "Сохранить";
    Cell.appendChild(saveButton);
    row.appendChild(Cell);
  }
}
