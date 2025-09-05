import { FootElement } from './FootElement.js';

export class FootRow {
  constructor(id, headers) {
    this.id = id;
    this.headers = headers;
    this.data = headers.map((header) => new FootElement(id, header));
    console.log(this.data);
  }
  render() {
    const foot = document.createElement('tfoot');
    foot.id = 'foot';
    const row = document.createElement('tr');
    for (let col of this.data) {
      const td = col.render();

      row.appendChild(td);
    }
    const saveCell = document.createElement('td');
    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.textContent = 'Сохранить';
    saveCell.appendChild(saveButton);
    row.appendChild(saveCell);
    foot.appendChild(row);

    return foot;
  }
}
