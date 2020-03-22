class Board {
    constructor(name) {
        this.boardGame = document.getElementById(name);
    }
    init(setting, ship) {
        this.setting = setting;
        this.ship = ship;
    }
    renderBoard() {
        for (let row = 0; row < this.setting.rowsCount; row++) {
            let tr = document.createElement("tr");
            this.boardGame.appendChild(tr);
            for (let col = 0; col < this.setting.colsCount; col++) {
                let td = document.createElement("td");
                tr.appendChild(td);
            }
        }
        this.getNumbersForRows();
        this.getLettersForCols();
    }
    getNumbersForRows() {
        let NumbersforRows = document.createElement("div");
        this.boardGame.insertAdjacentElement("beforebegin", NumbersforRows);
        NumbersforRows.classList.add("numbers");
        for (let i = 0; i <= 10; i++) {
            if (i == 0) {
                let number = document.createElement("div");
                NumbersforRows.appendChild(number);
                number.innerText = "";
            } else {
                let number = document.createElement("div");
                NumbersforRows.appendChild(number);
                number.innerText = i;
            }

        }
    }
    getLettersForCols() {
        let letters = ["A", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];
        let lettersforCols = document.createElement("div");
        lettersforCols.classList.add("lettersArr");
        this.boardGame.insertAdjacentElement("beforebegin", lettersforCols);
        for (let i = 0; i < 10; i++) {
            let letter = document.createElement("div");
            lettersforCols.appendChild(letter);
            letter.classList.add("letters");
            letter.innerHTML = letters[i];
        }
    }
    clearBoard() {
        document.querySelectorAll("td").forEach((elem) => {
            elem.className = "";
        })
    }

    getCellElem(x, y) {
        return this.boardGame.querySelector(`tr:nth-child(${y}) td:nth-child(${x})`);
    }

}