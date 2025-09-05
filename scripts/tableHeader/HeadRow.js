import { HeadElement } from './HeadElement.js';

export class HeadRow {
  constructor(headers, type = 'label') {
    this.headers = headers;
    this.type = type;
    this.data = headers.map((item) => {
      return new HeadElement(item, type);
    });
  }

  render() {
    const row = document.createElement('tr');
    row.id = 'row-' + this.type;
    this.data.forEach((elem) => {
      row.appendChild(elem.render());
    });

    return row;
  }
}
