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
        document.addEventListener("click", (event) => {
            this.handlerClick(event)
        })
    }
    handlerClick(event) {
        if (this.isClickCorrect(event)) {
            let hit = event.target;
            if (this.isHitTheMark(hit)) {
                hit.style.background = "red";
                if (hit.classList.contains("ship1")) {
                    this.message.innerText = "Убил"
                } else {
                    this.message.innerText = "Ранил"
                }
            } else {
                hit.innerText = "X";
                this.message.innerText = "Мимо"
            }
        }
    }
    isClickCorrect(event) {
        if (this.isClickOnTable(event) && this.isClickOnEmptyCell(event)) {
            return true;
        }
    }
    isClickOnTable(event) {
        if (event.target.parentNode.parentNode.id == "game") return true;
    }
    isClickOnEmptyCell(event) {
        if (event.target.innerText == "") return true;
    }
    isHitTheMark(hit) {
        if (!hit.classList.length == "") return true;
    }

    computerStep(){

    }


}