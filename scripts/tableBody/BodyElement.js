export class BodyElement {
  constructor(data, id, typeData, type = 'span') {
    this.data = data;
    this.id = id;
    this.typeData = typeData;
    this.type = type;
  }
  render() {
    const td = document.createElement('td');
    if (this.type != 'span') {
      const inner = document.createElement(this.type);
      inner.textContent = data;
      td.appendChild(inner);
    } else {
      td.textContent = data;
    }
    td.id = this.typeData + '-' + this.id;
    return td;
  }
}
