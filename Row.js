class TableRow {
  constructor(data, columns) {
    this.id = data.id;
    this.data = data;
    this.columns = columns;
  }

  render() {
    let html = `<tr class="row" id="row-${this.id}">`;
    for (let col of this.columns) {
      if (col == "id") continue;
      html += `<td id="${col}-${this.id}">${this.data[col]}`;
      if (col == "name") {
        html += `<button class="edit" id=buttonEdit${this.id}>e</button><button class="x" id=buttonX${this.id}></button></td>`;
      } else html += `</td>`;
    }
    html += `</tr>`;
    return html;
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
    let html = ``;
    for (let col of this.columns) {
      let text = document.getElementById(col + "-" + rowToEditId).textContent;
      text = text.replace("ex", "");
      html += `<td><textarea id="${col}-${rowToEditId}">${text}</textarea></td>`;
    }
    html += `<td><button id="saveEdit">Coxpaнить</button></td>`;
    document.getElementById(`row-${rowToEditId}`).innerHTML = html;
  }
}
