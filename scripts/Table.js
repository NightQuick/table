import { BodyRow } from './tableBody/BodyRow.js';
import { FootRow } from './tableFooter/FootRow.js';
import { HeadRow } from './tableHeader/HeadRow.js';

export class Table {
  constructor(headers, data) {
    this.headers = headers;
    for (let col of this.headers) {
      if (!col.key) {
        col.key = 'id';
      }
      if (col.sortable != false) {
        col.sortable = true;
      }
    }
    this.rows = data.map((item) => {
      console.log(item);
      return new BodyRow(
        item,
        this.headers.map((col) => col.key)
      );
    });
    this.head = [new HeadRow(this.headers), new HeadRow(this.headers, 'search')];
    this.sortCache = '';
    this.editing = true;
  }
  sorting(header) {
    console.log('Сортировка!');
    const sortBy = header.id.replace('-label', '');

    if (this.sortCache == sortBy) {
      this.rows.reverse();
    } else {
      this.rows.sort((a, b) => BodyRow.compare(a, b, sortBy));
    }
    this.sortCache = sortBy;

    this.render();
  }

  search(searchStr, searchBy) {
    console.log(searchBy);
    const searchedData = this.rows.filter((row) => row.contains(searchBy, searchStr));
    this.renderBody(searchedData);
  }

  removeRow(rowId) {
    rowId -= 1;
    this.rows.splice(rowId, 1);
    this.renderBody();
  }

  editRow(rowId) {
    this.editing = false;
    console.log(rowId);
    console.log(this.rows);
    this.rows[rowId - 1].edit(rowId);
    document.getElementById('saveEdit').addEventListener('click', () => {
      const item = { id: rowId };
      for (let col of this.headers) {
        if (col.sortable == false) continue;
        item[col.key] = document.getElementById(col.key + '-' + rowId).value;
      }
      console.log(item);
      this.rows.splice(
        rowId - 1,
        1,
        new BodyRow(
          item,
          this.headers.map((cols) => cols.key)
        )
      );
      this.renderBody(this.rows);
      this.editing = true;
    });
  }

  addNew() {
    const list = document.querySelectorAll('.new');
    const item = {};
    list.forEach((box) => {
      if (box.id === 'new-id') {
        item[box.id.replace('new-', '')] = box.textContent;
      } else {
        item[box.id.replace('new-', '')] = box.value;
      }
    });
    this.rows.push(
      new BodyRow(
        item,
        this.headers.map((cols) => cols.key)
      )
    );
    document.getElementById('foot').remove();
    this.renderBody();
  }

  renderHead() {
    if (!document.getElementById('headLabels')) {
      const headTable = document.createElement('thead');
      headTable.id = 'head';

      headTable.appendChild(this.head[0].render());

      headTable.appendChild(this.head[1].render());

      document.getElementById('table').appendChild(headTable);

      //Вызов сортировки
      document.querySelectorAll('.label').forEach((label) => {
        label.addEventListener('click', () => {
          this.sorting(label);
        });
      });

      //Вызов поиска строк
      document.querySelectorAll('.search').forEach((search) => {
        const searchBox = search.firstChild;
        searchBox.addEventListener('input', () => {
          this.search(searchBox.value, search.id.replace('-search', ''));
        });
      });
    }
  }

  renderBody(data = this.rows) {
    const body = document.createElement('tbody');
    body.id = 'tableBody';
    if (document.getElementById('tableBody')) {
      document.getElementById('tableBody').remove();
    }

    for (let row of data) {
      body.appendChild(row.render());
    }
    document.getElementById('table').appendChild(body);

    //Вызов удаления строк
    document.querySelectorAll('.remove').forEach((button) => {
      button.addEventListener('click', () => {
        this.removeRow(button.id.replace('remove-', ''));
      });
    });

    //Вызов изменения строк
    document.querySelectorAll('.edit').forEach((button) => {
      button.addEventListener('click', () => {
        if (this.editing) this.editRow(button.id.replace('edit-', ''));
      });
    });
  }
  renderFoot() {
    const foot = new FootRow(
      this.rows.at(-1).id + 1,
      this.headers.map((col) => col.key)
    );
    console.log(foot);
    document.getElementById('table').appendChild(foot.render());

    document.getElementById('saveButton').addEventListener('click', () => {
      this.addNew();
    });
  }

  render() {
    const table = document.createElement('table');
    table.id = 'table';

    const addButton = document.createElement('button');
    addButton.id = 'addNew';
    addButton.textContent = 'Добавить';

    if (!document.getElementById('table')) {
      document.body.appendChild(addButton);
      document.body.appendChild(table);

      this.renderHead();
    }

    this.renderBody();

    addButton.addEventListener('click', () => {
      this.renderFoot();
    });
  }
}
