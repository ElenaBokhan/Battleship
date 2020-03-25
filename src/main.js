window.addEventListener("load", (event) => {
    const board = new Board("game");
    const boardPlayer = new Board("gamePlayer");
    const ship = new Ship();
    const game = new Game();
    const menu = new Menu();
    const setting = new Setting();
    const status = new Status();

    setting.init();
    board.init(setting, ship);
    boardPlayer.init(setting, ship)
    ship.init(setting, board, boardPlayer, game)
    game.init(setting, board, boardPlayer, ship, status, menu);

    // event.preventDefault();
    // event.stopPropagation();

    board.renderBoard();
    boardPlayer.renderBoard();
    ship.getAllPossibleCells();
    ship.arrangeShips();
    menu.run()
    ship.getAllPossibleCells();
    game.run();
})