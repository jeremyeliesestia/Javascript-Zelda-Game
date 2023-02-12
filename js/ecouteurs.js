let inputState = {}
let mousePos = { x: 0, y: 0 }

function ajouteEcouteurClickSourie() {
    window.addEventListener("mousedown", function(event) {
        console.log(event.button);

        switch (event.button) {
          case 0:
            inputState.leftClick = true;
            break;
          case 1:
            inputState.middleClick = true;
            break;
          case 2:
            inputState.rightClick = true;
            break;
        }
      }); 
}

function ajouteEcouteurSouris() {
    window.onmousemove = (event) => {
        // on récupère la positon de la souris et on
        // la stocke dans une variable globale mousePos
        // adjust mouse position relative to the canvas
        var rect = event.target.getBoundingClientRect()
        mousePos.x = event.clientX - rect.left;
        mousePos.y = event.clientY - rect.top;
        console.log(mousePos);
    }
}

function ajouteEcouteursClavier() {
    // On va écouter les événements clavier
    // et on va modifier la vitesse du joueur
    // en fonction de la touche pressée
    window.onkeydown = (event) => {
        console.log(event.key);
        switch (event.key) {
            case 'ArrowLeft':
                inputState.left = true;
                break;
            case 'ArrowRight':
                inputState.right = true;
                break;
            case 'ArrowUp':
                inputState.up = true;
                break;
            case 'ArrowDown':
                inputState.down = true;
                break;
            case ' ':
                inputState.space = true;
                break;
            case 'Enter':
                inputState.enter = true;
                break;
        }
    }

    window.onkeyup = (event) => {
        console.log(event.key);
        switch (event.key) {
            case 'ArrowLeft':
                inputState.left = false;
                break;
            case 'ArrowRight':
                inputState.right = false;
                break;
            case 'ArrowUp':
                inputState.up = false;
                break;
            case 'ArrowDown':
                inputState.down = false;
                break;
            case ' ':
                inputState.space = false;
                break
            case 'Enter':
                inputState.enter = false;
                break;
        }
    }


}

export { ajouteEcouteurSouris, ajouteEcouteursClavier, ajouteEcouteurClickSourie, inputState, mousePos }