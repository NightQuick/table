import { TableRow } from "./Row.js";

class Table {
  constructor(headers = [], data) {
    this.headers = headers;
    this.rows = [];
    this.sortCache = "";
    this.editing = true;
    this.data = data;
    let columns;
    this.rows = data.map(
      (item) =>
        new TableRow(
          item,
          this.headers.map((cols) => {
            if ("sortable" in cols) {
            } else return cols.key;
          })
        )
    );
    // this.template = this.createTemplate();
  }

  // createTemplate() {
  //   let template = document.createElement("template");
  //   template.id = "template";
  //   let rowTemplate = document.createElement("tr");
  //   rowTemplate.className = "row"; //
  //   template.appendChild(rowTemplate);
  //   for (let col of this.headers) {
  //     let td = document.createElement("td");
  //     td.textContent = "-";
  //     rowTemplate.appendChild(td);
  //     //, id=`${col}-${this.id}`,textContent=this.data[col]
  //   }
  //   return template;
  // }

  render(data = this.rows, search = ["", "", "", ""]) {
    //Отрисовка таблицы
    // document.body.innerHTML = this.template;
    let template = document.getElementById("template");
    if (document.getElementById("table")) {
      document.getElementById("table").remove();
      document.getElementById("addNew").remove();
    }

    let newRowButton = document.createElement("button");
    (newRowButton.id = "addNew"), (newRowButton.textContent = "добавить");
    document.body.appendChild(newRowButton);

    let table = document.createElement("table");
    table.id = "table";
    document.body.appendChild(table);

    this.renderCol(search, table);

    let tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    this.rows.sort((a, b) => TableRow.compare(a, b, "id"));
    for (let i = 0; i < this.rows.length; i++) {
      this.rows[i]["id"] = i + 1;
    }

    for (let row of data) {
      tableBody.appendChild(row.render());
    }
    //

    //Эвенты
    //Сортирвка столбцов
    for (let col of this.headers) {
      if (col.sortable || "sortable" in col == false) {
        document
          .getElementById(col.key)
          .addEventListener("click", () => this.sorting(col.key));
      }
    }
    //Поиск по столбцам
    let timer;
    document.addEventListener("keydown", function () {
      clearTimeout(timer);
    });
    for (let col of this.headers) {
      let textBox = document.getElementById(col.key + "Search");

      textBox.addEventListener("keyup", () => {
        timer = setTimeout(
          this.search.bind(this),
          1500,
          textBox.id.replace("Search", ""),
          textBox.value
        );
      });
    }

    let tableFoot = document.createElement("tfoot");
    table.appendChild(tableFoot);
    //Создание новой строки
    document.getElementById("addNew").addEventListener("click", () => {
      let row = document.createElement("tr");
      row.id = "add";
      for (let col of this.headers) {
        let newDataCell = document.createElement("td");
        if (col.key == undefined) {
          newDataCell.textContent = 0;
        } else {
          let newDataTextBox = document.createElement("textarea");
          newDataCell.appendChild(newDataTextBox);
          newDataTextBox.id = "new" + col.key;
        }

        row.appendChild(newDataCell);
      }
      let saveButton = document.createElement("button"),
        buttonCell = document.createElement("td");
      saveButton.id = "saveButton";
      saveButton.textContent = "Сохранить";
      buttonCell.appendChild(saveButton);
      row.appendChild(buttonCell);
      tableFoot.appendChild(row);

      document.getElementById("saveButton").addEventListener("click", () => {
        this.addRow();
      });
    });
    //Удаление строки
    document.querySelectorAll(".x").forEach((button) => {
      button.addEventListener("click", () => {
        this.removeRow(button);
      });
    });
    //Изменение строки
    document.querySelectorAll(".edit").forEach((button) => {
      button.addEventListener("click", () => {
        if (this.editing) this.editRow(button);
      });
    });
  }
  renderCol(search, table) {
    let tableHead = document.createElement("thead");
    table.appendChild(tableHead);

    let headRow = document.createElement("tr");
    tableHead.appendChild(headRow);

    let searchRow = document.createElement("tr");
    tableHead.appendChild(searchRow);

    this.headers.forEach((col, i) => {
      let headCol = document.createElement("th");
      headCol.class = "col";
      headCol.id = col.key;
      headCol.textContent = col.label;
      headRow.appendChild(headCol);

      let searchCell = document.createElement("th");
      let searchTextBox = document.createElement("textarea");
      searchTextBox.class = "search";
      searchTextBox.id = `${col.key}Search`;
      searchTextBox.textContent = search[i];

      searchCell.appendChild(searchTextBox);
      searchRow.appendChild(searchCell);
    });
    // for (let i = 0; i < this.cols.length; i++) {

    // }
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
    let search;
    if (searchBy == "undefined") {
      search = [searchStr, "", "", "", ""];
    } else {
      search = this.headers.map((col) =>
        col.key == searchBy ? searchStr : ""
      );
    }

    this.render(searchedData, search);
  }
  addRow() {
    let item = { id: 0 };
    for (let col of this.headers) {
      if (col.key == undefined) {
        continue;
      }
      item[col.key] = document.getElementById(`new${col.key}`).value;
    }
    document.getElementById("add").innerHTML = "";
    this.rows.push(
      new TableRow(
        item,
        this.headers.map((cols) => {
          if ("sortable" in cols) {
          } else return cols.key;
        })
      )
    );
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
      for (let col of this.headers) {
        if (col.sortable == false) continue;
        item[col.key] = document.getElementById(
          col.key + "-" + editingRowId
        ).value;
      }
      this.rows.splice(
        editingRowId - 1,
        1,
        new TableRow(
          item,
          this.headers.map((cols) => {
            if ("sortable" in cols) {
            } else return cols.key;
          })
        )
      );
      this.render(this.rows);
      this.editing = true;
    });
  }
}
// let cols = ["name", "year", "price", "rate"];
import { headers, data } from "./main.js";
let table = new Table(headers, data);
table.render();
