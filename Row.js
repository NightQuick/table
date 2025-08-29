export class TableRow {
  constructor(data, columns) {
    this.id = data.id;
    this.data = data;
    this.columns = columns;
    // const number = data.id;
  }

  render(rowTemplate) {
    let template = rowTemplate.content.cloneNode(true);
    let row = rowTemplate.firstElementChild;
    row.id = `row-${this.id}`;
    let td = row.querySelectorAll("td"); //, id=,
    this.columns.forEach(col, (i) => {
      td[i].id = `${col}-${this.id}`;
      td[i].textContent = this.data[col];
    });
  }

  // render() {
  //   let row = document.createElement("tr");
  //   row.className = "row";
  //   row.id = "row" + "-" + this.id;

  //   for (let col of this.columns) {
  //     let tableData = document.createElement("td");
  //     tableData.id = col + "-" + this.id;
  //     tableData.textContent = this.data[col];
  //     if (this.data[col] == undefined) {
  //       tableData.textContent = this.id;
  //     }

  //     if (col == "name") {
  //       let buttonEdit = document.createElement("button");
  //       buttonEdit.className = "edit";
  //       buttonEdit.id = "buttonEdit" + this.id;
  //       let buttonX = document.createElement("button");
  //       buttonX.className = "x";
  //       buttonX.id = "buttonX" + this.id;
  //       let buttons = [buttonEdit, buttonX];
  //       buttons.forEach((button) => {
  //         tableData.appendChild(button);
  //       });
  //     }
  //     row.appendChild(tableData);
  //   }
  //   return row;
  // }

  getValue(columnName) {
    return this.data[columnName];
  }

  setValue(columnName, value) {
    this.data[columnName] = value;
  }

  contains(searchBy, searchStr) {
    if (!searchStr) return true;
    if (searchBy == undefined) searchBy = this.id;
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
      if (col == undefined) continue;
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
