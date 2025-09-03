export class TableRow {
  constructor(data, columns) {
    this.id = data.id;
    this.data = data;
    this.columns = columns;
    // const number = data.id;
    // this.events = events;
  }

  render() {
    const template = document.getElementById('template').content.cloneNode(true);
    const row = template.firstElementChild;
    row.id = `row-${this.id}`;
    const td = row.querySelectorAll('td');
    let i = 0;
    this.columns.forEach((col) => {
      if (col == undefined) {
        col = 'id';
      }
      td[i].id = `${col}-${this.id}`;

      if (col != 'name') {
        td[i].textContent += this.data[col];
      }

      if (col == 'name') {
        const buttonEdit = td[i].firstElementChild;
        buttonEdit.className = 'edit';
        buttonEdit.id = 'buttonEdit' + this.id;

        const buttonX = td[i].lastElementChild;
        buttonX.className = 'x';
        buttonX.id = 'buttonX' + this.id;
        td[i].textContent = this.data[col];
        const buttons = [buttonEdit, buttonX];
        buttons.forEach((button) => {
          td[i].appendChild(button);
        });
      }

      i++;
    });
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
    if (searchBy == undefined) searchBy = this.id;
    const value = this.getValue(searchBy);
    return value && value.toString().toLowerCase().includes(searchStr.toLowerCase());
  }
  static compare(a, b, sortBy) {
    const valA = a.getValue(sortBy);
    const valB = b.getValue(sortBy);
    if (valA < valB) return -1;
    if (valA > valB) return 1;
    if (valA == valB) return 0;
  }
  edit(rowToEditId) {
    const row = document.getElementById(`row-${rowToEditId}`);
    for (let col of this.columns) {
      if (col == undefined) continue;
      let text = document.getElementById(col + '-' + rowToEditId).textContent;
      text = text.replace('ex', '');
      const textCell = document.getElementById(`${col}-${rowToEditId}`),
        textBox = document.createElement('textarea');

      textCell.innerHTML = '';
      textCell.id = '';
      textBox.id = col + '-' + rowToEditId;
      textBox.textContent = text;

      textCell.appendChild(textBox);
      row.appendChild(textCell);
    }
    const Cell = document.createElement('cd'),
      saveButton = document.createElement('button');
    saveButton.id = 'saveEdit';
    saveButton.textContent = 'Сохранить';
    Cell.appendChild(saveButton);
    row.appendChild(Cell);
  }
}
