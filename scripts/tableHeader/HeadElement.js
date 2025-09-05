import { headers, table } from '../main.js';

export class HeadElement {
  constructor(header, type) {
    this.header = header;
    this.type = type;
  }
  render() {
    const elem = document.createElement('th');
    elem.id = this.header.key + '-' + this.type;
    elem.className = this.type;
    if (this.type == 'search') {
      const inner = document.createElement('textarea');
      elem.appendChild(inner);
    } else {
      elem.textContent = this.header.label;
      if (this.header.sortable === false) {
        elem.className = this.type + '-unsortable';
      }
    }
    return elem;
  }
}
