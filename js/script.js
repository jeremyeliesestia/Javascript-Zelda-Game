import Joueur from './JoueurClasse.js';
import Obstacle from './ObstacleClass.js';
import Item from './ItemClass.js';
import ObstacleAnime from './ObstacleAnime.js';
import ObstacleAnimeClignotant from './ObstacleAnimeClignotant.js';
import ObstacleTexture from './ObstacleTexture.js';
import { ajouteEcouteurSouris, ajouteEcouteursClavier, inputState, mousePos } from './ecouteurs.js';
import { circRectsOverlap, rectsOverlap } from './collisions.js';
import { loadAssets } from './assets.js';
import Sortie from './Sortie.js';
import ObstacleRounded from './ObstacleRounded.js';



let canvas, ctx;
let gameState = 'menuStart';
let joueur, sortie;
let niveau = 1;
let tableauDesObjetsGraphiques = [];
let assets;

let coeur;
let monster;
let monster2;
let timeSprite = 0;
var musiqueOn = true;
var textVisible = true;
var lastBlinkTime = 0;
var blinkInterval = 500; // La fréquence de clignotement en millisecondes
let timeSpriteHeart = 0;
let positionTableau = 0;

var assetsToLoadURLs = {
    backgroundImage: { url: '../assets/images/haunted_grove.png' }, // http://www.clipartlord.com/category/weather-clip-art/winter-clip-art/
    logo1: { url: "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/SkywardWithoutBalls.png" },
    logo2: { url: "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/BoundsWithoutBalls.png" },
    bell: { url: "https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/bells.png" },
    spriteSheetBunny: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/bunnySpriteSheet.png' },
    plop: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/plop.mp3', buffer: false, loop: false, volume: 1.0 },
    victory: { url: '../assets/sounds/LTTP_Secret.wav', buffer: false, loop: false, volume: 1.0 },
    humbug: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/humbug.mp3', buffer: true, loop: true, volume: 0.5 },
    concertino: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/christmas_concertino.mp3', buffer: true, loop: true, volume: 1.0 },
    xmas: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/xmas.mp3', buffer: true, loop: true, volume: 0.6 },
    linkForestMusic: { url: '../assets/audio/overworld_theme.mp3', buffer: true, loop: true, volume: 0.5 },
    backinblack: { url: '../assets/audio/backinblack.m4a', buffer: true, loop: true, volume: 0.1  },
    menuMusic: { url: '../assets/sounds/select_screen.mp3', buffer: true, loop: true, volume: 0.5 },
    BackgroundMenu: { url: '../assets/images/menuGame.png' },
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

    assets.menuMusic.play();

   // On va prendre en compte le clavier
    ajouteEcouteursClavier();
    ajouteEcouteurSouris();

    // On va créer un joueur
    creerTableauSpritePlayer();
    joueur = new Joueur(50, 240, 50, 50, 3, tableauSpritePlayer);

    tableauDesObjetsGraphiques.push(joueur);

    // On crée la sortie
    sortie = new Sortie(700, 250, 30, 'yellow');
    tableauDesObjetsGraphiques.push(sortie);

    // et des obstacles
    creerTableauDesItemsLevel1();
    creerTableauSpritePlayer();
    creerTableauSpriteMonsterLevel1();
    creerDesObstaclesLevel1();
    requestAnimationFrame(animationLoop);
}

function creerDesObstaclesLevel1() {
    tableauDesObjetsGraphiques.push(new ObstacleRounded(195, 155, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(578, 155, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(195, 378, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(610, 378, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(388, 200, 30));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(388, 0, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(420 , 500, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(90, 0, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(50, 80, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(0, 170, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(-50, 270, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(-5, 360, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(50 , 460, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(780, 0, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(830, 80, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(870 , 170, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(920, 270, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(870, 360, 70));
    tableauDesObjetsGraphiques.push(new ObstacleRounded(830, 460, 70));
    //tableauDesObjetsGraphiques.push(new ObstacleAnime(400, 200, 70, 20, 1, tableauSpriteMonster, 'vertical'));
}

let tableauSpriteItems = [];
function creerTableauDesItemsLevel1(){
    
    //coeur
    for (let i=16;i<24; i++){
        let url = new Image();
        url.src = "../assets/images/Items/" + i + "_Items.png";
        tableauSpriteItems.push(url)    
    }
    coeur = new Item(370, 260, 40, 40, tableauSpriteItems);
    tableauDesObjetsGraphiques.push(coeur);
}

let tableauSpriteMonster= [];
function creerTableauSpriteMonsterLevel1(){
    
    let directionMonster= null;
    let i = 1;

    //player down
    directionMonster = "OctopusSpriteDown";
        for (i=1;i<5;i++){
            let url = new Image();
            url.src = "../assets/images/OctopusSprite/" + directionMonster + "/" + i + "_octorock.png";
            tableauSpriteMonster.push(url)    
        }

    //player left
    directionMonster = "OctopusSpriteLeft";
        for (i=1;i<5;i++){
            let url = new Image();
            url.src = "../assets/images/OctopusSprite/" + directionMonster + "/" + i + "_octorock.png";
            tableauSpriteMonster.push(url)    
        }


    //player right
    directionMonster = "OctopusSpriteRight";
        for (i=1;i<5;i++){
            let url = new Image();
            url.src = "../assets/images/OctopusSprite/" + directionMonster + "/" + i + "_octorock.png";
            tableauSpriteMonster.push(url)    
        }

    //player up
    directionMonster = "OctopusSpriteUp";
        for (i=1;i<5;i++){
            let url = new Image();
            url.src = "../assets/images/OctopusSprite/" + directionMonster + "/" + i + "_octorock.png";
            tableauSpriteMonster.push(url)    
        }

        monster = new ObstacleAnime(450, 100, 70, 20, 0.8, tableauSpriteMonster, "vertical", 100, 250);
        tableauDesObjetsGraphiques.push(monster);

        monster2 = new ObstacleAnime(250, 250, 70, 20, 0.8, tableauSpriteMonster, "horizontal", 250, 580);
        tableauDesObjetsGraphiques.push(monster2);


}

let tableauSpritePlayer = [];
function creerTableauSpritePlayer(){
    
    let directionPlayer = null;
    let typeMvt = null;
    let i = 1;

    //player down
    directionPlayer = "LinkSpriteDown";
        //dynamic
        typeMvt = "Dynamic";
        for (i=1;i<11;i++){
            let url = new Image();
            url.src = "../assets/images/LinkSprite/" + directionPlayer + "/" + typeMvt + "/" + i + "_link_sprite.png";
            tableauSpritePlayer.push(url)    
        }

        //static
        typeMvt = "Static";
        for (i=1;i<4;i++){
            let url = new Image();
            url.src = "../assets/images/LinkSprite/" + directionPlayer + "/" + typeMvt + "/" + i + "_link_sprite.png";
            tableauSpritePlayer.push(url)    
        }


    //player left
    directionPlayer = "LinkSpriteLeft";
        //dynamic
        typeMvt = "Dynamic";
        for (i=1;i<11;i++){
            let url = new Image();
            url.src = "../assets/images/LinkSprite/" + directionPlayer + "/" + typeMvt + "/" + i + "_link_sprite.png";
            tableauSpritePlayer.push(url)    
        }

        //static
        typeMvt = "Static";
        for (i=1;i<4;i++){
            let url = new Image();
            url.src = "../assets/images/LinkSprite/" + directionPlayer + "/" + typeMvt + "/" + i + "_link_sprite.png";
            tableauSpritePlayer.push(url)    
        }

    //player right
    directionPlayer = "LinkSpriteRight";
        //dynamic
        typeMvt = "Dynamic";
        for (i=1;i<11;i++){
            let url = new Image();
            url.src = "../assets/images/LinkSprite/" + directionPlayer + "/" + typeMvt + "/" + i + "_link_sprite.png";
            tableauSpritePlayer.push(url)    
        }

        //static
        typeMvt = "Static";
        for (i=1;i<4;i++){
            let url = new Image();
            url.src = "../assets/images/LinkSprite/" + directionPlayer + "/" + typeMvt + "/" + i + "_link_sprite.png";
            tableauSpritePlayer.push(url)    
        }

    //player up
    directionPlayer = "LinkSpriteUp";
        //dynamic
        typeMvt = "Dynamic";
        for (i=1;i<11;i++){
            let url = new Image();
            url.src = "../assets/images/LinkSprite/" + directionPlayer + "/" + typeMvt + "/" + i + "_link_sprite.png";
            tableauSpritePlayer.push(url)    
        }

        //static
        typeMvt = "Static";
        for (i=1;i<4;i++){
            let url = new Image();
            url.src = "../assets/images/LinkSprite/" + directionPlayer + "/" + typeMvt + "/" + i + "_link_sprite.png";
            tableauSpritePlayer.push(url)    
        }


}

var y = 0;
function animationLoop() {
    // On va exécuter cette fonction 60 fois par seconde
    // pour créer l'illusion d'un mouvement fluide
    // 1 - On efface le contenu du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 - On dessine le nouveau contenu
    // On met le fond d'écran du canva
    ctx.drawImage(assets.backgroundImage, 0, 0, canvas.width, canvas.height);

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
            
            timeSprite += 1; 
            if (timeSprite == 60) {
                timeSprite = 0;
            }

            //timer pour le sprite du coeur
            timeSpriteHeart += 1;
            if (timeSpriteHeart == 5) {
                coeur.spriteMvt(positionTableau);
                positionTableau += 1;
                if (positionTableau == 8) {
                    positionTableau = 0;
                }
                timeSpriteHeart = 0;
            }



            

            monster.spriteMvt(timeSprite);
            monster2.spriteMvt(timeSprite);






            if(inputState.left){
                joueur.spriteMvt('left', timeSprite);
            }

            else if(inputState.right){   
                joueur.spriteMvt('right', timeSprite);
            }

            else if(inputState.up){  
                joueur.spriteMvt('up', timeSprite);
            }

            else if(inputState.down){
                joueur.spriteMvt('down', timeSprite);
            }

            else if(!inputState.left && !inputState.right && !inputState.up && !inputState.down){
                joueur.spriteMvt('any', timeSprite);
            }








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
    ctx.save();
    ctx.drawImage(assets.BackgroundMenu, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "50px Arial";
    var textWidth = ctx.measureText("Press space to start").width;
    var x = (canvas.width - textWidth) / 2;
    var y = canvas.height - 50;
    var currentTime = Date.now();
    if (currentTime - lastBlinkTime >= blinkInterval) {
        textVisible = !textVisible;
        lastBlinkTime = currentTime;
    }
    if (textVisible) {
        ctx.fillText("Press space to start", x, y);
        ctx.strokeText("Press space to start", x, y);
    }
    if (inputState.space) {
        assets.menuMusic.pause();
        gameState = 'jeuEnCours';
        assets.linkForestMusic.play();
    }
    ctx.restore();
}

// Pour allumer/éteindre la musique
function toggleMusic() {
    musiqueOn = !musiqueOn;
    if (musiqueOn) {
        assets.menuMusic.play();
    } else {
        assets.menuMusic.pause();
    }
}
function afficheGameOver(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "130px Arial";
    ctx.fillText("GAME OVER", 190, 100);
    ctx.strokeText("GAME OVER", 190, 100);
    assets.menuMusic.play();
    if (inputState.space) {
        gameState = 'menuStart';
        joueur.x = 0;
    }
    ctx.restore();
}
function testeEtatClavierPourJoueur() {

    joueur.vx = 0;
    if (inputState.left) {
        joueur.vx = -joueur.v;
    } else {
        if (inputState.right) joueur.vx = joueur.v;
    }
    joueur.vy = 0;
    if (inputState.up) {
        joueur.vy = -joueur.v;
    } else {
        if (inputState.down) joueur.vy = joueur.v;

    }
}

function detecteCollisionJoueurAvecObstacles() {
    let collisionExist = false;
    let currentObstacle = null;
    let typeObstacle = null;
    // On va tester si le joueur est en collision avec un des obstacles
    tableauDesObjetsGraphiques.forEach(o => {
        
        if (o instanceof Obstacle) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true;
                currentObstacle = o;
                typeObstacle = 'rect';
                //assets.plop.play();
            }
        }
        if (o instanceof ObstacleRounded) {
            if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.r)) {
                collisionExist = true;
                currentObstacle = o;
                typeObstacle = 'rounded';
                //assets.plop.play();
            }
        }
    }
    );

    if (collisionExist) {
        joueur.couleur = 'red';
        joueur.v = 0;

        if (typeObstacle == 'rect') {
            if ((inputState.left || inputState.right) && (!inputState.up && !inputState.down)) {
            //collision par la gauche
                if(joueur.x < currentObstacle.x){
                    joueur.x = currentObstacle.x - joueur.l - 5;
                }
                //collision par la droite
                if(joueur.x > currentObstacle.x){
                    joueur.x = currentObstacle.x + currentObstacle.l + 5;
                }
            }

            if ((inputState.up || inputState.down) && (!inputState.left && !inputState.right)) {
                //collision par le haut
                if(joueur.y < currentObstacle.y){
                    joueur.y = currentObstacle.y - joueur.h - 5;
                }
                //collision par le bas
                if(joueur.y > currentObstacle.y){
                    joueur.y = currentObstacle.y + currentObstacle.h + 5;
                }
            }
        }

        if (typeObstacle == 'rounded') {

            if ((inputState.left || inputState.right) && (!inputState.up && !inputState.down)) {
                //collision par la gauche
                if(joueur.x < currentObstacle.x){
                    joueur.x = currentObstacle.x - (currentObstacle.x - joueur.x) - 5;
                }
                //collision par la droite
                if(joueur.x > currentObstacle.x){
                    joueur.x = currentObstacle.x + (joueur.x - currentObstacle.x) + 5;
                }
            }

            if ((inputState.up || inputState.down) && (!inputState.left && !inputState.right)) {
                //collision par le haut
                if(joueur.y < currentObstacle.y){
                    joueur.y = currentObstacle.y - (currentObstacle.y - joueur.y) - 5;
                }
                //collision par le bas
                if(joueur.y > currentObstacle.y){
                    joueur.y = currentObstacle.y + (joueur.y - currentObstacle.y) + 5;
                }
            }



        }





    } else {
        joueur.v = 5;
        joueur.couleur = 'green';
    }
}
function detecteCollisionJoueurAvecSortie() {
    //joueur.drawBoundingBox(ctx);
    //sortie.drawBoundingBox(ctx);
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