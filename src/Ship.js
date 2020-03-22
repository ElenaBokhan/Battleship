class Ship {
    constructor() {
        this.x = null;
        this.y = null;
        this.possibleCells = [];
        this.currentCEllsShip = [];
        this.currentSiblingsForNextStep = [];
        this.currentSiblingsShip = [];
        this.i = 0;
        this.j = 0;
        this.lengthShip = 4;
        this.amount = 1;
    }

    init(setting, board, boardPlayer, game) {
        this.setting = setting;
        this.board = board;
        this.boardPlayer = boardPlayer;
        this.game = game;
    }
    // getAllPossibleCells() {
    //     this.board.boardGame.querySelectorAll("td").forEach((elem) => {
    //         this.possibleCells.push(elem)
    //     })
    // }
    getAllPossibleCells() {
        for (let y = 1; y <= this.setting.rowsCount; y++) {
            for (let x = 1; x <= this.setting.colsCount; x++) {
                let arr = {
                    x: x,
                    y: y
                };
                this.possibleCells.push(arr);
            }
        }
    }
    // расставляю карабли. Length - наращивает палубы. Цикл с J - количество каждых караблей
    arrangeShips(event) {
        while (this.lengthShip > 0 && this.amount < 5) {
            for (this.j; this.j < this.amount; this.j++) {
                for (this.i; this.i < this.lengthShip; this.i++) {
                    if (event) {
                        this.getPlayerArrange(event);
                        return;
                    }
                    if (this.i == 0) {
                        this.currentCEllsShip = [];
                        this.currentSiblingsForNextStep = [];
                        this.currentSiblingsShip = [];
                        // ищу первую ячейку
                        this.getFirstCell(this.lengthShip);
                    } else {
                        this.getNextCells(this.lengthShip);
                    }
                }
                this.i = 0;
                this.deleteCellsFromArr(
                    this.currentSiblingsShip,
                    this.possibleCells
                );
                this.deleteCellsFromArr(
                    this.currentCEllsShip,
                    this.possibleCells
                );
            }
            this.j = 0;
            this.amount++;
            this.lengthShip--;
        }
        this.lengthShip = 4;
        this.amount = 1;
    }
    getPlayerArrange(event) {
        let cellsForNextStep = this.getSiblingsCoordsForNextStep(
            this.x,
            this.y
        );
        this.getCoordsPlayerSell(event);
        let currentCell = {
            x: this.x,
            y: this.y
        };
        if (!(this.i == 0)) {
            if (!this.isArrayHaveElem(cellsForNextStep, currentCell)) {
                this.game.message.innerText =
                    "Палубы корабля должны находится рядом";
                return;
            }
        }
        let currentSiblings = this.getSiblingsCoords(this.x, this.y);
        if (this.isSiblingsNotEmpty(currentSiblings)) {
            this.game.message.innerText = "Корабли не могут стоять рядом";
            return;
        }
        this.renderPlayerCell(event);
        this.i++;
        if (this.i == this.lengthShip) {
            this.j++;
            this.i = 0;
        }
        return;
    }
    getCoordsPlayerSell(event) {
        this.x =
            event.target.offsetLeft /
                Math.floor(
                    event.currentTarget.offsetWidth / this.setting.colsCount
                ) +
            1;
        this.y =
            event.target.offsetTop /
                Math.floor(
                    event.currentTarget.offsetHeight / this.setting.rowsCount
                ) +
            1;
    }
    renderPlayerCell(event) {
        let cell = event.target;
        cell.style.background = "green";
        cell.classList.add(`ship${this.lengthShip}`);
        cell.innerText = `${this.lengthShip}`;
    }
    getFirstCell(length) {
        // получаю рандомный элемент
        let randomCell = this.possibleCells[
            Math.floor(Math.random() * this.possibleCells.length)
        ];
        let cellShip = this.board.getCellElem(randomCell.x, randomCell.y);
        cellShip.classList.add(`ship${this.lengthShip}`);
        //cellShip.style.backgroundColor = "yellow";
        this.getAllSiblings(randomCell.x, randomCell.y);

        //добавляю готовую ячейку в массив хранящий все ячейки текущего корабля
        this.currentCEllsShip.push(randomCell);
        if (this.lengthShip > 1) {
            //у текущей ячейки делаю выборку координат для последущих вариантов хода
            this.getSiblingsForNextStep(randomCell.x, randomCell.y);
        }
    }
    getNextCells(length) {
        let nextRandomCellForShip = Math.floor(
            Math.random() * this.currentSiblingsForNextStep.length
        );
        let nextCellCoords = this.currentSiblingsForNextStep[
            nextRandomCellForShip
        ];
        let nextCellShip = this.board.getCellElem(
            nextCellCoords.x,
            nextCellCoords.y
        );
        nextCellShip.classList.add(`ship${this.lengthShip}`);
        this.currentCEllsShip.push(nextCellCoords);

        //nextCellShip.style.backgroundColor = "yellow";

        this.deleteCurrentCellFromPossibleStepArray(nextCellCoords);

        this.x = nextCellCoords.x;
        this.y = nextCellCoords.y;

        let currentCoord = {
            x: this.x,
            y: this.y
        };
        this.deleteCurrentCellFromSiblingsArray(currentCoord);

        this.getAllSiblings(this.x, this.y);
        this.getSiblingsForNextStep(this.x, this.y);
    }

    getSiblingsForNextStep(x, y) {
        let siblingsCoordsForNextStep = this.getSiblingsCoordsForNextStep(x, y);

        for (let elem of siblingsCoordsForNextStep) {
            if (
                this.possibleCells.find(
                    element => element.x == elem.x && element.y == elem.y
                )
            ) {
                let siblingsForNextStep = this.board.getCellElem(
                    elem.x,
                    elem.y
                );
                if (
                    this.currentSiblingsForNextStep.find(
                        element => element.x == elem.x && element.y == elem.y
                    )
                )
                    continue;
                if (
                    siblingsForNextStep != null &&
                    siblingsForNextStep.classList.length == 0
                ) {
                    this.currentSiblingsForNextStep.push(elem);
                }
            }
        }
    }
    getSiblingsCoordsForNextStep(x, y) {
        let siblings = [
            {
                x: x,
                y: y - 1
            },
            {
                x: x - 1,
                y: y
            },
            {
                x: x + 1,
                y: y
            },
            {
                x: x,
                y: y + 1
            }
        ];
        return siblings;
    }
    deleteCurrentCellFromPossibleStepArray(nextCellCoords) {
        this.currentSiblingsForNextStep.splice(
            this.currentSiblingsForNextStep.indexOf(nextCellCoords),
            1
        );
    }
    getAllSiblings(x, y) {
        let siblingsCoords = this.getSiblingsCoords(x, y);

        for (let elem of siblingsCoords) {
            let siblings = this.board.getCellElem(elem.x, elem.y);
            if (this.isArrayHaveElem(this.currentSiblingsShip, elem)) continue;

            if (siblings != null && siblings.classList.length == 0) {
                this.currentSiblingsShip.push(elem);

                //siblings.style.backgroundColor = "green";
            }
        }
    }
    getSiblingsCoords(x, y) {
        let siblingsCoords = [
            {
                x: x - 1,
                y: y - 1
            },
            {
                x: x,
                y: y - 1
            },
            {
                x: x + 1,
                y: y - 1
            },
            {
                x: x - 1,
                y: y
            },
            {
                x: x + 1,
                y: y
            },
            {
                x: x,
                y: y + 1
            },
            {
                x: x - 1,
                y: y + 1
            },
            {
                x: x + 1,
                y: y + 1
            }
        ];
        return siblingsCoords;
    }

    isArrayHaveElem(array, elem) {
        let alreadyHave = array.find(
            element => element.x == elem.x && element.y == elem.y
        );
        return alreadyHave;
    }
    isSiblingsNotEmpty(currentSiblings) {
        for (let current of currentSiblings) {
            let siblings = this.boardPlayer.getCellElem(current.x, current.y);
            if (siblings == null) continue;
            if (siblings.classList.contains(`ship${this.lengthShip}`)) continue;
            if (siblings.classList.length != 0) return true;
        }
    }
    deleteCurrentCellFromSiblingsArray(currentCoord) {
        let index = this.currentSiblingsShip.findIndex(
            item => item.x === currentCoord.x && item.y === currentCoord.y
        );
        this.currentSiblingsShip.splice(index, 1);
    }
    deleteCellsFromArr(arr, array) {
        for (let current of arr) {
            let alreadyHave = array.find(
                element => element.x == current.x && element.y == current.y
            );
            if (alreadyHave) {
                array.splice(array.indexOf(alreadyHave), 1);
            }
        }
    }

    playerArrangeShip() {
        this.getAllPossibleCells();
        document
            .getElementById("gamePlayer")
            .addEventListener("click", elem => {
                if (this.game.isClickOnEmptyCell(elem)) {
                    this.arrangeShips(elem);
                }
            });
    }
}
