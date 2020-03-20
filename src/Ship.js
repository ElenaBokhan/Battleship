class Ship {
    constructor() {
        this.x = null;
        this.y = null;
        this.possibleCells = [];
        this.currentCEllsShip = [];
        this.currentSiblingsForNextStep = [];
        this.currentSiblingsShip = [];
        this.i=0;
        this.j=0;
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
        let length = 4;
        let amount = 1;
        while (length > 0 && amount < 5) {
            for (this.j; this.j < amount; this.j++) {
                for (this.i; this.i < length; this.i++) {
                    if (this.i == 0) {
                        // перед поиском первой ячейки для следующего карабля,
                        //очищаю массив с возможными вариантами ячеек и массив с ячейками предыдущего корабля
                        this.currentCEllsShip = [];
                        this.currentSiblingsForNextStep = [];
                        this.currentSiblingsShip = [];
                        if(event){
                            console.log("work");
                            event.target.style.background = "green";
                            return;
                        }
                        // ищу первую ячейку                  
                        this.getFirstCell(length);
                    } else {
                        //поиск последующих ячеек при length>1
                        this.getNextCells(length);
                    }

                }
               this.i=0;
                this.deleteCurrentCellsAndSiblingsFromArr();
            }
            this.j=0
            amount++;
            length--;
        }

    }
    getFirstCell(length) {
        // получаю рандомный элемент 
        let randomCell = this.possibleCells[Math.floor(Math.random() * this.possibleCells.length)];
        let cellShip = this.board.getCellElem(randomCell.x, randomCell.y);
        cellShip.classList.add(`ship${length}`);
        //cellShip.style.backgroundColor = "yellow";
        this.getAllSiblings(randomCell.x, randomCell.y);

        //добавляю готовую ячейку в массив хранящий все ячейки текущего корабля 
        this.currentCEllsShip.push(randomCell);
        if (length > 1) {
            //у текущей ячейки делаю выборку координат для последущих вариантов хода
            this.getSiblingsForNextStep(randomCell.x, randomCell.y);
        }
    }
    getNextCells(length) {

        let nextRandomCellForShip = Math.floor(Math.random() * this.currentSiblingsForNextStep.length);
        let nextCellCoords = this.currentSiblingsForNextStep[nextRandomCellForShip];
        let nextCellShip = this.board.getCellElem(nextCellCoords.x, nextCellCoords.y);
        nextCellShip.classList.add(`ship${length}`);
        this.currentCEllsShip.push(nextCellCoords);

        //nextCellShip.style.backgroundColor = "yellow";

        this.deleteCurrentCellFromPossibleStepArray(nextCellCoords);

        this.x = nextCellCoords.x;
        this.y = nextCellCoords.y;

        let currentCoord = {
            x: this.x,
            y: this.y
        }
        this.deleteCurrentCellFromSiblingsArray(currentCoord);

        this.getAllSiblings(this.x, this.y);
        this.getSiblingsForNextStep(this.x, this.y);
    }

    getSiblingsForNextStep(x, y) {

        let siblingsCoordsForNextStep = this.getSiblingsCoordsForNextStep(x, y);

        for (let elem of siblingsCoordsForNextStep) {
            if (this.possibleCells.find(element => element.x == elem.x && element.y == elem.y)) {
                let siblingsForNextStep = this.board.getCellElem(elem.x, elem.y);
                if (this.currentSiblingsForNextStep.find(element => element.x == elem.x && element.y == elem.y)) continue;
                if (siblingsForNextStep != null && siblingsForNextStep.classList.length == 0) {
                    this.currentSiblingsForNextStep.push(elem);
                }
            }
        }
    }
    getSiblingsCoordsForNextStep(x, y) {
        let siblings = [{
            x: x,
            y: y - 1
        }, {
            x: x - 1,
            y: y
        }, {
            x: x + 1,
            y: y
        }, {
            x: x,
            y: y + 1
        }];
        return siblings;
    }
    deleteCurrentCellFromPossibleStepArray(nextCellCoords) {
        this.currentSiblingsForNextStep.splice(this.currentSiblingsForNextStep.indexOf(nextCellCoords), 1);
    }
    getAllSiblings(x, y) {
        let siblingsCoords = this.getSiblingsCoords(x, y);

        for (let elem of siblingsCoords) {
            let siblings = this.board.getCellElem(elem.x, elem.y);
            if (this.isCurrentSiblingsShipHaveElem(elem)) continue;

            if (siblings != null && siblings.classList.length == 0) {
                this.currentSiblingsShip.push(elem);

                //siblings.style.backgroundColor = "green";
            }
        }
    }
    getSiblingsCoords(x, y) {
        let siblingsCoords = [{
            x: x - 1,
            y: y - 1
        },
        {
            x: x,
            y: y - 1
        }, {
            x: x + 1,
            y: y - 1
        },
        {
            x: x - 1,
            y: y
        }, {
            x: x + 1,
            y: y
        },
        {
            x: x,
            y: y + 1
        }, {
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

    isCurrentSiblingsShipHaveElem(elem) {
        let alreadyHave = this.currentSiblingsShip.find(element => element.x == elem.x && element.y == elem.y)
        return alreadyHave;
    }
    deleteCurrentCellFromSiblingsArray(currentCoord) {
        let index = this.currentSiblingsShip.findIndex(item => item.x === currentCoord.x && item.y === currentCoord.y);
        this.currentSiblingsShip.splice(index, 1);
    }
    deleteCurrentCellsAndSiblingsFromArr() {
        for (let current of this.currentSiblingsShip) {
            let alreadyHave = this.possibleCells.find(element => element.x == current.x && element.y == current.y)
            if (alreadyHave) {
                this.possibleCells.splice(this.possibleCells.indexOf(alreadyHave), 1);
            };
        }
        for (let currentCell of this.currentCEllsShip) {
            let alreadyHave = this.possibleCells.find(elem => elem.x == currentCell.x && elem.y == currentCell.y)
            if (alreadyHave) {
                this.possibleCells.splice(this.possibleCells.indexOf(alreadyHave), 1);
            }
        }
    }

    playerArrangeShip() {
        // let length = 4;
        // let step = 1;
        document.getElementById("gamePlayer").addEventListener("click", (elem) => {
            if (this.game.isClickOnEmptyCell(elem)) {
                this.arrangeShips(elem)
                // if(length>0){
                //     if (step > length) {
                //         step = 1;
                //         length--;
                //     }
                //     elem.target.style.background = "green";
                //     elem.target.classList.add(`ship${length}`);
                //     step++;
                // }                
            }
        })
    }
}