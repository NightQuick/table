export class FootElement {
  constructor(id, header) {
    this.id = id;
    this.header = header;
  }
  render() {
    const td = document.createElement('td');
    if (this.header === 'id') {
      td.id = 'new-id';
      td.textContent = +this.id;
      td.className = 'new';
    } else {
      const textarea = document.createElement('textarea');
      textarea.id = 'new-' + this.header;
      textarea.className = 'new';
      td.appendChild(textarea);
    }
    return td;
  }
}
