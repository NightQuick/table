import { BodyElement } from './BodyElement.js';

export class BodyRow {
  constructor(data, cols) {
    this.cols = cols;
    this.id = data.id;
    data = Object.entries(data);
    this.data = data.map((elem) => new BodyElement(this.id, elem));
  }
  getValue(colName) {
    for (let elem of this.data) {
      if (elem.data[0] == colName) {
        return elem.data[1];
      }
    }
  }

  static compare(a, b, sortBy) {
    const valA = a.getValue(sortBy);
    const valB = b.getValue(sortBy);
    if (valA < valB) return -1;
    if (valA > valB) return 1;
    if (valA == valB) return 0;
  }

  contains(searchBy, searchStr) {
    if (!searchStr) return true;
    const value = this.getValue(searchBy);
    return value && value.toString().toLowerCase().includes(searchStr.toLowerCase());
  }

  addNew(newRowId) {
    const row = document.createElement('tr');
    for (elem of this.data) {
      if (elem.data[0] == 'id') {
        continue;
      }
      const textCell = elem.render('textarea');
      row.appendChild(textCell);
    }
    return row;
  }

  edit(rowToEditId) {
    const row = document.getElementById(`row-${rowToEditId}`);

    for (let elem of this.data) {
      if (elem.data[0] == 'id') {
        continue;
      }
      let text = elem.data[1];
      text = text.replace('ex', '');
      document.getElementById(elem.data[0] + '-' + rowToEditId).remove();
      const textCell = elem.render('textarea');

      row.appendChild(textCell);
    }

    const Cell = document.createElement('td'),
      saveButton = document.createElement('button');
    saveButton.id = 'saveEdit';
    saveButton.textContent = 'Сохранить';
    Cell.appendChild(saveButton);
    row.appendChild(Cell);
  }

  render() {
    const row = document.createElement('tr');
    row.id = 'row-' + this.id;
    row.className = 'row';
    for (let elem of this.data) {
      row.appendChild(elem.render());
    }
    return row;
  }
}
