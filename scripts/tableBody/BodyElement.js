export class BodyElement {
  constructor(id, data) {
    this.id = id;
    this.data = data;
  }
  render(type = 'span') {
    const td = document.createElement('td');

    if (type === 'textarea') {
      const inner = document.createElement('textarea');
      inner.id = this.data[0] + '-' + this.id;
      inner.textContent = this.data[1];
      td.appendChild(inner);
    } else {
      td.id = this.data[0] + '-' + this.id;
      td.textContent = this.data[1];

      if (this.data[0] == 'name') {
        const buttonRemove = document.createElement('button');
        buttonRemove.className = 'remove';
        buttonRemove.id = 'remove-' + this.id;
        td.appendChild(buttonRemove);

        const buttonEdit = document.createElement('button');
        buttonEdit.className = 'edit';
        buttonEdit.id = 'edit-' + this.id;
        td.appendChild(buttonEdit);
      }
    }

    return td;
  }
}
