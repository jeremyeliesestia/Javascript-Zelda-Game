import Joueur from './JoueurClasse.js';
import Obstacle from './ObstacleClass.js';
import ObstacleAnime from './ObstacleAnime.js';
import ObstacleAnimeClignotant from './ObstacleAnimeClignotant.js';
import ObstacleTexture from './ObstacleTexture.js';
import { ajouteEcouteurSouris, ajouteEcouteursClavier, inputState, mousePos } from './ecouteurs.js';
import { circRectsOverlap, rectsOverlap } from './collisions.js';
import { loadAssets } from './assets.js';
import Sortie from './Sortie.js';


let canvas, ctx;
let gameState = 'menuStart';
let joueur, sortie;
let niveau = 1;
let tableauDesObjetsGraphiques = [];
let assets;

var assetsToLoadURLs = {
    joueur: { url: '../assets/images/mario.png' }, // http://www.clipartlord.com/category/weather-clip-art/winter-clip-art/
    backgroundImage: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/background.png' }, // http://www.clipartlord.com/category/weather-clip-art/winter-clip-art/
    logo1: { url: "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/SkywardWithoutBalls.png" },
    logo2: { url: "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/BoundsWithoutBalls.png" },
    bell: { url: "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/bells.png" },
    spriteSheetBunny: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/bunnySpriteSheet.png' },
    plop: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/plop.mp3', buffer: false, loop: false, volume: 1.0 },
    victory: { url: '../assets/audio/victory.wav', buffer: false, loop: false, volume: 1.0 },
    humbug: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/humbug.mp3', buffer: true, loop: true, volume: 0.5 },
    concertino: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/christmas_concertino.mp3', buffer: true, loop: true, volume: 1.0 },
    xmas: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/xmas.mp3', buffer: true, loop: true, volume: 0.6 },
    backinblack: { url: '../assets/audio/backinblack.m4a', buffer: true, loop: true, volume: 0.5 }

};

// Bonne pratique : on attend que la page soit chargée
// avant de faire quoi que ce soit
window.onload = init;

function init(event) {
    console.log("Page chargée et les éléments HTML sont prêts à être manipulés");
    canvas = document.querySelector('#myCanvas');
    //console.log(canvas);
    // pour dessiner, on utilise le contexte 2D
    ctx = canvas.getContext('2d');

    // chargement des assets (musique,  images, sons)
    loadAssets(assetsToLoadURLs, startGame);

    //startGame();
}

function startGame(assetsLoaded) {
    assets = assetsLoaded;

    // appelée quand tous les assets sont chargés
    console.log("StartGame : tous les assets sont chargés");
    //assets.backinblack.play();

   // On va prendre en compte le clavier
   ajouteEcouteursClavier();
   ajouteEcouteurSouris();

    // On va créer un joueur
    joueur = new Joueur(100, 0, 50, 50, assets.joueur, 3);
    tableauDesObjetsGraphiques.push(joueur);
    // On crée la sortie
    sortie = new Sortie(700, 400, 30, 'yellow');
    tableauDesObjetsGraphiques.push(sortie);
    // et des obstacles
    creerDesObstaclesLevel1();

    requestAnimationFrame(animationLoop);
}

function creerDesObstaclesLevel1() {
    tableauDesObjetsGraphiques.push(new Obstacle(250, 0, 30, 300, 'green'));
    tableauDesObjetsGraphiques.push(new ObstacleAnime(450, 0, 30, 300, 'green', 1));
    tableauDesObjetsGraphiques.push(new ObstacleAnimeClignotant(350, 0, 30, 300, 'red', 1));
    let url ='https://img.freepik.com/free-vector/seamless-japanese-inspired-geometric-pattern_53876-80353.jpg';
    tableauDesObjetsGraphiques.push(new ObstacleTexture(550, 0, 30, 300, url));
}

function dessinerLesObjetsGraphiques(ctx) {
    tableauDesObjetsGraphiques.forEach(o => {
        o.draw(ctx);
    });
    /*
    for(let i = 0; i < tableauDesObstacles.length; i++) {
        tableauDesObstacles[i].draw(ctx);
    }
    */
}

var y = 0;
function animationLoop() {
    // On va exécuter cette fonction 60 fois par seconde
    // pour créer l'illusion d'un mouvement fluide
    // 1 - On efface le contenu du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (gameState) {
        case 'menuStart':
            afficheMenuStart(ctx);
            break;
        case 'gameOver':
            afficheGameOver(ctx);
            break;
            case 'ecranDebutNiveau':
            afficheEcranDebutNiveau(ctx);
                break;
        case 'jeuEnCours':
            // 2 - On dessine le nouveau contenu
            tableauDesObjetsGraphiques.forEach(o => {
                o.draw(ctx);
            });

            // 3 - on déplace les objets
            testeEtatClavierPourJoueur();

            joueur.move();
            //joueur.followMouse()
            joueur.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height);
            detecteCollisionJoueurAvecObstacles();
            detecteCollisionJoueurAvecSortie();
            break;
    }

    // 4 - On rappelle la fonction d'animation
    requestAnimationFrame(animationLoop);
}

function afficheEcranDebutNiveau(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "40px Arial";
    ctx.fillText("Bienvenue au niveau "+niveau, 190, 100);
    ctx.restore();
}

function afficheMenuStart(ctx) {
    ctx.save()
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "130px Arial";
    ctx.fillText("Press space to start", 190, 100);
    ctx.strokeText("Press space to start", 190, 100);
    if (inputState.space) {
        gameState = 'jeuEnCours';
    }
    ctx.restore();
}
function afficheGameOver(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "130px Arial";
    ctx.fillText("GAME OVER", 190, 100);
    ctx.strokeText("GAME OVER", 190, 100);
    if (inputState.space) {
        gameState = 'menuStart';
        joueur.x = 0;
    }
    ctx.restore();
}
function testeEtatClavierPourJoueur() {
    joueur.vx = 0;
    if (inputState.left) {
        joueur.vx = -5;
    } else {
        if (inputState.right) joueur.vx = 5;
    }
    joueur.vy = 0;
    if (inputState.up) {
        joueur.vy = -5;
    } else {
        if (inputState.down) joueur.vy = 5;
    }
}


function exempleDessin() {
    ctx.lineWidth = 20
    ctx.strokeStyle = 'green';
    ctx.strokeRect(10, y, 100, 150);

    ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
    ctx.fillRect(0, 10, 50, 70);

    ctx.lineWidth = 2
    ctx.font = "130px Arial";
    ctx.fillText("Hello", 190, 100);
    ctx.strokeText("Hello", 190, 100);

    // Les rectangles avec strokeRect et fillRect sont en mode "immédiat"
    // les cercles, lignes, courbes, sont en mode "bufférisé" ou "chemin" (path)
    // On commence par définir le chemin et à la fin tout le chemin est dessiné
    // d'un coup dans le GPU
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(400, 200, 50, 0, Math.PI * 2);
    ctx.stroke();

    // 3 - On déplace les objets, on regarde ce que fait le joueur avec la souris, etc.
    // On teste les collisions etc... bref, on change l'état des objets graphiques à dessiner
    y += 0.1;
}



function detecteCollisionJoueurAvecObstacles() {
    let collisionExist = false;
    // On va tester si le joueur est en collision avec un des obstacles
    tableauDesObjetsGraphiques.forEach(o => {
        if (o instanceof Obstacle) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true;
                assets.plop.play();
            }
        }
    });

    if (collisionExist) {
        joueur.couleur = 'red';
        //gameState = 'gameOver';
        joueur.x -= 10;
    } else {
        joueur.couleur = 'green';
    }
}

function detecteCollisionJoueurAvecSortie() {
    joueur.drawBoundingBox(ctx);
    sortie.drawBoundingBox(ctx);
    if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, sortie.x, sortie.y, sortie.r)) {
        joueur.x = 10;
        joueur.y = 10;
        gameState = 'ecranDebutNiveau';
        niveauSuivant(niveau++);
        sortie.couleur = 'lightgreen';
        assets.backinblack.stop();
        assets.victory.play();
    }
}

function niveauSuivant(niveau) {
    // Passe au niveau suivant....
    // todo.....
    console.log("Niveau suivant !");
}