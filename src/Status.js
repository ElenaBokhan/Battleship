class Status {
    constructor() {
        this.condition = "playerMove";
    }
    setMovePlayer() {
        if (this.condition == "computerMove") {
            this.condition = "playerMove"
        }
    }
    setMoveComputer() {
        if (this.condition == "playerMove") {
            this.condition = "computerMove"
        }
    }
    isPlayerMove() {
        return this.condition == "playerMove";
    }
    isComputerMove() {
        return this.condition == "computerMove";
    }
}