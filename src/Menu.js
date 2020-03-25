class Menu {
    constructor() {
        this.button = document.getElementById("tips");
        this.hint = false;

    }
    run() {
        this.button.addEventListener("click", (event) => {
            document.querySelectorAll("table[id=game] td").forEach((elem) => {
                if (elem.hasAttribute("deck")) {
                    if (this.hint == false) {
                        elem.classList.add("hint");                                                
                    } else {
                        elem.classList.remove("hint");              
                    }
                }                
            })
            if(this.hint==false) this.hint=true;
            else this.hint=false;            
        });
    }
}