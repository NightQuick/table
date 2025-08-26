class Table {
  constructor(cols = []) {
    this.cols = cols;
    this.rows = [];
    this.sortCache = "";
    this.editing = true;
  }
  set data(data) {
    if (Array.isArray(data)) {
      this.rows = data.map((item) => new TableRow(item, this.cols));
    } else {
      this.rows.push(new TableRow(data, this.cols));
    }
  }

  get data() {
    return this.rows.map((row) => row.data);
  }

  render(data = this.rows, search = ["", "", "", ""]) {
    let html = ``;
    html += `<button id="addNew">Добавить</button>`;
    html += `<table id="table">`;
    html += `<thead><tr>`;
    for (let col of this.cols) {
      html += `<th class="col" id="${col}">${col}</th>`;
    }
    html += `</tr>`;

    html += `<tr>`;
    for (let i = 0; i < this.cols.length; i++) {
      html += `<th><textarea class="search" id=${this.cols[i]}Search>${search[i]}</textarea></th>`;
    }
    html += `</tr></thead>`;

    this.rows.sort((a, b) => TableRow.compare(a, b, "id"));
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i]["id"] = i + 1;
    }

    html += `<tbody>`;

    for (let row of data) {
      html += row.render();
    }

    html += `</tbody>`;

    html += `<tfoot id="add"></tfoot>`;

    let body = document.getElementById("body");
    body.innerHTML = html;
    for (let col of cols) {
      document
        .getElementById(col)
        .addEventListener("click", () => this.sorting(col));
    }
    let timer;
    document.addEventListener("keydown", function () {
      clearTimeout(timer);
    });
    for (let col of cols) {
      let textBox = document.getElementById(col + "Search");

      textBox.addEventListener("keyup", () => {
        timer = setTimeout(
          this.search.bind(this),
          1500,
          textBox.id.replace("Search", ""),
          textBox.value
        );
      });
    }
    document.getElementById("addNew").addEventListener("click", () => {
      html = `<tr>`;
      for (let col of this.cols) {
        html += `<td><textarea id="new${col}"></textarea></td>`;
      }
      html += `<td><button id="saveButton">Сохранить</button></td>`;
      html += `</tr>`;
      document.getElementById("add").innerHTML = html;
      document.getElementById("saveButton").addEventListener("click", () => {
        this.addRow();
      });
    });
    document.querySelectorAll(".x").forEach((button) => {
      button.addEventListener("click", () => {
        this.removeRow(button);
      });
    });

    document.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", () => {
        if (this.editing) this.editRow(button);
      });
    });
  }

  sorting(sortBy) {
    if (this.sortCache == sortBy) {
      this.rows.reverse();
    } else {
      this.rows.sort((a, b) => TableRow.compare(a, b, sortBy));
    }

    this.rows.forEach((row, index) => {
      row.data.id = index + 1;
    });
    this.sortCache = sortBy;
    this.render(this.rows);
  }

  search(searchBy, searchStr) {
    const searchedData = this.rows.filter((row) =>
      row.contains(searchBy, searchStr)
    );

    let search = this.cols.map((col) => (col === searchBy ? searchStr : ""));

    this.render(searchedData, search);
  }
  addRow() {
    let item = { id: 0 };
    for (let col of this.cols) {
      item[col] = document.getElementById(`new${col}`).value;
    }
    document.getElementById("add").innerHTML = "";
    this.rows.push(new TableRow(item, this.cols));
    this.render();
  }
  removeRow(button) {
    let removingRowId = button.id.replace("buttonX", "");
    removingRowId -= 1;
    this.rows.splice(removingRowId, 1);
    this.render();
  }

  editRow(button) {
    this.editing = false;
    let editingRowId = button.id.replace("buttonEdit", "");
    this.rows[editingRowId].edit(editingRowId);
    document.getElementById("saveEdit").addEventListener("click", () => {
      let item = { id: editingRowId };
      for (let col of this.cols) {
        item[col] = document.getElementById(col + "-" + editingRowId).value;
      }
      this.rows.splice(editingRowId - 1, 1, new TableRow(item, this.cols));
      this.render(this.rows);
      this.editing = true;
    });
  }
}
cols = ["name", "year", "price", "rate"];
let table = new Table(cols);
let newData = [
  {
    id: 1,
    name: "Minecraft",
    year: "2011",
    price: "26.95$",
    rate: "9.3",
  },
  {
    id: 2,
    name: "Counter-Strike 2",
    year: "2023",
    price: "0",
    rate: "7.8",
  },
  {
    id: 3,
    name: "Grand Theft Auto V",
    year: "2013",
    price: "29.99$",
    rate: "9.0",
  },
  {
    id: 4,
    name: "The Witcher 3: Wild Hunt",
    year: "2015",
    price: "39.99$",
    rate: "9.7",
  },
  {
    id: 5,
    name: "Red Dead Redemption 2",
    year: "2018",
    price: "59.99$",
    rate: "9.5",
  },
  {
    id: 6,
    name: "Elden Ring",
    year: "2022",
    price: "59.99$",
    rate: "9.3",
  },
  {
    id: 7,
    name: "Cyberpunk 2077",
    year: "2020",
    price: "49.99$",
    rate: "7.5",
  },
  {
    id: 8,
    name: "Baldur's Gate 3",
    year: "2023",
    price: "59.99$",
    rate: "9.8",
  },
  {
    id: 9,
    name: "Dota 2",
    year: "2013",
    price: "0",
    rate: "8.5",
  },
  {
    id: 10,
    name: "Apex Legends",
    year: "2019",
    price: "0",
    rate: "8.0",
  },
  {
    id: 11,
    name: "Fortnite",
    year: "2017",
    price: "0",
    rate: "8.2",
  },
  {
    id: 12,
    name: "The Legend of Zelda: Breath of the Wild",
    year: "2017",
    price: "59.99$",
    rate: "9.7",
  },
  {
    id: 13,
    name: "God of War (2018)",
    year: "2018",
    price: "19.99$",
    rate: "9.5",
  },
  {
    id: 14,
    name: "Stardew Valley",
    year: "2016",
    price: "14.99$",
    rate: "9.2",
  },
  {
    id: 15,
    name: "Valorant",
    year: "2020",
    price: "0",
    rate: "7.9",
  },
];
table.data = newData;

table.render();
