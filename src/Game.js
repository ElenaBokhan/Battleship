class Game {
    constructor() {
        this.message = document.getElementById("message");

    }
    init(setting, board, boardPlayer, ship, status, menu) {
        this.setting = setting;
        this.board = board;
        this.boardPlayer = boardPlayer;
        this.ship = ship;
        this.status = status;
        this.menu = menu;
    }
    run() {
        document.addEventListener("click", elem => {
            if (this.ship.allShipsPlayer.length < 20) {
                if (this.isClickCorrect(event, "gamePlayer")) {
                    this.ship.arrangeShips(elem);
                }
            } else {
                this.handlerClick(event)
            }
        });
    }

    handlerClick(event) {
        if (this.status.condition == "playerMove") {
            this.playerStep(event);
        }

    }
    playerStep(event) {
        if (this.isClickCorrect(event, "game")) {
            let hit = event.target;
            if (this.isHitTheMark(hit)) {
                hit.style.background = "red";
                this.ship.killedShips.push(hit);
                if (this.isKilledShip(hit, this.ship.killedShips,"deck")) {
                    this.message.innerText = "Убил"
                    if (this.isGameWon()) {
                        this.message.innerText = "Вы выиграли!";
                        return;
                    }
                } else {
                    this.message.innerText = "Ранил"
                }
            } else {
                hit.innerText = "X";
                this.message.innerText = "Мимо";
                this.status.setMoveComputer();
                event.preventDefault();
                setTimeout(() => {
                    this.computerStep(); 
                }, 1000); 
            }
        }
    }
    isClickCorrect(event, nameField) {
        if (this.isClickOnTable(event, nameField) && this.isClickOnEmptyCell(event)) {
            return true;
        }
    }
    isClickOnTable(event, nameField) {
        if (event.target.parentNode.parentNode.id == nameField) return true;
    }
    isClickOnEmptyCell(event) {
        if (event.target.innerText == "") return true;
    }
    isHitTheMark(hit) {
        if (hit.hasAttribute("deck")) return true;
    }
    isKilledShip(hit, array,attribute) {
        let numOfDeck = hit.getAttribute(attribute);
        let numShip = hit.getAttribute("data-number");
        let allHit = array.filter(item => (item.getAttribute(attribute) == `${numOfDeck}` && item.getAttribute("data-number") == `${numShip}`))
        if (allHit.length % numOfDeck == 0) return true;
    }
    isGameWon() {
        return this.ship.killedShips.length == 20;
    }
    computerStep() {
        if (this.ship.currentCEllsShip.length == 0) {
            let randomCell = this.ship.getRandomCoords(this.ship.possibleCells);
            this.ship.x = randomCell.x;
            this.ship.y = randomCell.y;
        }else{
            let nextCell = this.ship.getRandomCoords(this.ship.currentSiblingsForNextStep);
            this.ship.x = nextCell.x;
            this.ship.y = nextCell.y;
        }   
        let cellShipCoords={
            x:this.ship.x,
            y:this.ship.y
        }     
        let cellShip = this.boardPlayer.getCellElem(this.ship.x, this.ship.y);
        if (cellShip.hasAttribute("deck-player")) {
            this.ship.killedShipsPlayers.push(cellShip);
            this.ship.currentCEllsShip.push(cellShipCoords);
            this.ship.getAllSiblings(this.ship.x, this.ship.y, this.boardPlayer);
            cellShip.style.background="red";
            if (this.isKilledShip(cellShip, this.ship.killedShipsPlayers,"deck-player")) {
                this.ship.deleteCellFromArray(cellShipCoords, this.ship.possibleCells);
                this.ship.deleteCellsFromArr(this.ship.currentSiblingsShip, this.ship.possibleCells);
                this.ship.currentCEllsShip = [];
                this.ship.currentSiblingsForNextStep = [];
                this.ship.currentSiblingsShip = [];
                this.message.innerText = "Убит";
                setTimeout(() => {
                    this.computerStep(); 
                }, 1000);
            } else {
                this.message.innerText = "Ранен";
                this.ship.getSiblingsForNextStep(this.ship.x, this.ship.y, this.boardPlayer);
                this.ship.deleteCellFromArray(cellShipCoords, this.ship.currentSiblingsForNextStep);
                this.ship.deleteCellFromArray(cellShipCoords, this.ship.possibleCells);                
                setTimeout(() => {
                    this.computerStep(); 
                }, 1000);
            }
        } else {
            cellShip.innerText = "X";
            this.ship.deleteCellFromArray(cellShipCoords, this.ship.possibleCells);
            this.message.innerText = "Ваш ход";
            this.status.setMovePlayer();
            return;
        }
    }
}