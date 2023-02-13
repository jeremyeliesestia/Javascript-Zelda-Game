import Joueur from './JoueurClasse.js';
import Obstacle from './ObstacleClass.js';
import Item from './ItemClass.js';
import ObstacleAnime from './ObstacleAnime.js';
import hud from './hud.js';
import { ajouteEcouteurSouris, ajouteEcouteursClavier,ajouteEcouteurClickSourie, inputState, mousePos } from './ecouteurs.js';
import { circRectsOverlap, rectsOverlap } from './collisions.js';
import { loadAssets } from './assets.js';
import Sortie from './Sortie.js';
import ObstacleRounded from './ObstacleRounded.js';

let canvas, ctx;
let gameState = 'menuStart';
let joueur, sortie1, sortie2;
let tableauDesObjetsGraphiquesLv1 = [];
let tableauDesObjetsGraphiquesLv2 = [];

let assets;
let coeur;
let coeur2;
let rubyListLv1 = [];
let rubyListLv2 = [];
let monster;
let monster2;
let monster3;
let monster4;
let timeSprite = 0;
var textVisible = true;
var lastBlinkTime = 0;
var blinkInterval = 500; // La fréquence de clignotement en millisecondes
let timeSpriteHeart = 0;
let timeSpriteRuby = 0;
let positionTableauHeart = 0;
let positionTableauRuby = 0;
let score = 0;

var assetsToLoadURLs = {
    backgroundImageLv1: { url: "../assets/images/haunted_grove.png"},
    gameOverAssets: { url: "../assets/images/gameOver.png"},
    backgroundImageLv2: { url: "../assets/images/montain.png"},
    linkForestMusic: { url: '../assets/audio/overworld_theme.mp3', buffer: true, loop: true, volume: 0.5 },
    menuMusic: { url: '../assets/sounds/select_screen.mp3', buffer: true, loop: true, volume: 0.5 },
    hitMusic: { url: '../assets/sounds/LTTP_Enemy_Hit.wav', buffer: true, loop: false, volume: 0.8 },
    victoryMusic: { url: '../assets/sounds/LTTP_Secret.wav', buffer: true, loop: false, volume: 0.8  },
    getRuby: { url: '../assets/audio/sounds/LTTP_Get_Ruby.wav', buffer: true, loop: false, volume: 0.8  },
    heartCharge: { url: '../assets/sounds/LTTP_Heart_Charge.wav', buffer: true, loop: false, volume: 0.8  },
    BackgroundMenu: { url: '../assets/images/menuGame.png' },
    coinScore: { url: '../assets/images/coin_sprite.png' },
    menuLevel: { url: '../assets/images/menuLevel.png' }
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
    joueur = new Joueur(50, 240, 50, 50, 6, tableauSpritePlayer);
    tableauDesObjetsGraphiquesLv1.push(joueur);
    tableauDesObjetsGraphiquesLv2.push(joueur);

    // On crée la sortie
    sortie1 = new Sortie(700, 250, 30, 'yellow');
    tableauDesObjetsGraphiquesLv1.push(sortie1);

    sortie2 = new Sortie(100, 430, 30, 'yellow');
    tableauDesObjetsGraphiquesLv2.push(sortie2);

    // et des obstacles
    creerTableauDesItems();
    creerTableauSpritePlayer();
    creerTableauSpriteMonster();
    creerDesObstaclesLevel1();
    creerDesObstaclesLevel2();

    initializeHeart();

    requestAnimationFrame(animationLoop);
}

function creerDesObstaclesLevel1() {
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(195, 155, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(578, 155, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(195, 378, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(610, 378, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(388, 200, 30));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(388, 0, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(420 , 500, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(90, 0, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(50, 80, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(0, 170, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(-50, 270, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(-5, 360, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(50 , 460, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(780, 0, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(830, 80, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(870 , 170, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(920, 270, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(870, 360, 70));
    tableauDesObjetsGraphiquesLv1.push(new ObstacleRounded(830, 460, 70));
}

function creerDesObstaclesLevel2(){

    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(200, 200, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(220, 220, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(240, 240, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(260, 260, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(280, 280, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(300, 300, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(320, 320, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(340, 340, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(360, 360, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(380, 380, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(400, 400, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(420, 420, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(440, 440, 30))

    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(380, 0, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(400, 20, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(420, 40, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(440, 60, 30))

    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(500, 80, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(520, 100, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(540, 120, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(560, 140, 30))

    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(570, 200, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(590, 220, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(610, 240, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(630, 260, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(650, 280, 30))
    
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(680, 280, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(700, 260, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(720, 240, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(740, 220, 30))
    tableauDesObjetsGraphiquesLv2.push(new ObstacleRounded(760, 200, 30))
    

    tableauDesObjetsGraphiquesLv2.push(new Obstacle(470, 425, 400, 50))
    tableauDesObjetsGraphiquesLv2.push(new Obstacle(0, 0, 30, 160))
    tableauDesObjetsGraphiquesLv2.push(new Obstacle(0, 160, 95, 490))
    tableauDesObjetsGraphiquesLv2.push(new Obstacle(167, 170, 30, 490))
    tableauDesObjetsGraphiquesLv2.push(new Obstacle(787, 175, 100, 50))


}

let tableauSpriteItemsHeart = [];
let tableauSpriteItemsGreenRuby = [];
let tableauSpriteItemsRedRuby = [];
let tableauSpriteItemsYellowRuby = [];


function creerTableauDesItems(){
    
    //coeur
    for (let i=16;i<24; i++){
        let url = new Image();
        url.src = "../assets/images/Items/" + i + "_Items.png";
        tableauSpriteItemsHeart.push(url)    
    }

    //green ruby
    for (let i=12;i<16; i++){
        let url = new Image();
        url.src = "../assets/images/rubySprite/greenRuby/" + i + "_Items.png";
        tableauSpriteItemsGreenRuby.push(url)    
    }

    //red ruby
    for (let i=28;i<32; i++){
        let url = new Image();
        url.src = "../assets/images/rubySprite/redRuby/" + i + "_Items.png";
        tableauSpriteItemsRedRuby.push(url)    
    }

    //yellow ruby
    for (let i=44;i<48; i++){
        let url = new Image();
        url.src = "../assets/images/rubySprite/yellowRuby/" + i + "_Items.png";
        tableauSpriteItemsYellowRuby.push(url)    
    }


    coeur = new Item(370, 260, 40, 40, tableauSpriteItemsHeart, 'coeur');
    tableauDesObjetsGraphiquesLv1.push(coeur);

    rubyListLv1.push(new Item(215, 240, 40, 40, tableauSpriteItemsGreenRuby, 'ruby_green'));
    rubyListLv1.push(new Item(210, 15, 40, 40, tableauSpriteItemsGreenRuby, 'ruby_green'));
    rubyListLv1.push(new Item(700, 150, 40, 40, tableauSpriteItemsGreenRuby, 'ruby_green'));
    rubyListLv1.push(new Item(700, 400, 40, 40, tableauSpriteItemsGreenRuby, 'ruby_green'));
    rubyListLv1.push(new Item(528, 240, 40, 40, tableauSpriteItemsRedRuby, 'ruby_red'));
    rubyListLv1.push(new Item(580, 15, 40, 40, tableauSpriteItemsYellowRuby, 'ruby_yellow'));


    rubyListLv1.forEach(ruby => {
        tableauDesObjetsGraphiquesLv1.push(ruby);
    });

    coeur2 = new Item(80, 70, 40, 40, tableauSpriteItemsHeart, 'coeur');
    tableauDesObjetsGraphiquesLv2.push(coeur2);

    rubyListLv2.push(new Item(655, 350, 40, 40, tableauSpriteItemsGreenRuby, 'ruby_green'));
    rubyListLv2.push(new Item(450, 130, 40, 40, tableauSpriteItemsRedRuby, 'ruby_red'));
    rubyListLv2.push(new Item(110, 280, 40, 40, tableauSpriteItemsYellowRuby, 'ruby_yellow'));
    
    rubyListLv2.forEach(ruby => {
        tableauDesObjetsGraphiquesLv2.push(ruby);
    });

}

let tableauSpriteMonster= [];
function creerTableauSpriteMonster(){
    
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
        tableauDesObjetsGraphiquesLv1.push(monster);

        monster2 = new ObstacleAnime(250, 250, 70, 20, 0.8, tableauSpriteMonster, "horizontal", 250, 580);
        tableauDesObjetsGraphiquesLv1.push(monster2);

        monster3 = new ObstacleAnime(390, 300, 70, 20, 0.8, tableauSpriteMonster, "horizontal", 390, 590);
        tableauDesObjetsGraphiquesLv2.push(monster3);

        monster4 = new ObstacleAnime(250, 120, 70, 20, 0.8, tableauSpriteMonster, "horizontal", 250, 490);
        tableauDesObjetsGraphiquesLv2.push(monster4);


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
        for (i=1;i<2;i++){
            let url = new Image();
            url.src = "../assets/images/LinkSprite/" + directionPlayer + "/" + typeMvt + "/" + i + "_link_sprite.png";
            tableauSpritePlayer.push(url)    
        }


}

let tableauSpriteHeart = [];

let heart1;
let heart2;
let heart3;

function initializeHeart(){
    let i;
    for (i=1;i<4;i++){
        let heart = new Image();
        heart.src = "../assets/images/heartSprite/" + i + "_heart_sprite.png";
        tableauSpriteHeart.push(heart)    
    }

    heart1 = new hud(20, 15, 50, 50, tableauSpriteHeart);
    heart2 = new hud(55, 15, 50, 50, tableauSpriteHeart);
    heart3 = new hud(90, 15, 50, 50, tableauSpriteHeart);

    tableauDesObjetsGraphiquesLv1.push(heart1);
    tableauDesObjetsGraphiquesLv1.push(heart2);
    tableauDesObjetsGraphiquesLv1.push(heart3);

    tableauDesObjetsGraphiquesLv2.push(heart1);
    tableauDesObjetsGraphiquesLv2.push(heart2);
    tableauDesObjetsGraphiquesLv2.push(heart3);

}

function animationLoop() {
    // On va exécuter cette fonction 60 fois par seconde
    // pour créer l'illusion d'un mouvement fluide
    // 1 - On efface le contenu du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 - On dessine le nouveau contenu
    // On met le fond d'écran du canva

    switch (gameState) {
        case 'menuStart':
            afficheMenuStart(ctx);
            break;
        case 'menuNiveau':
            afficheMenuNiveau(ctx);
            break;
        case 'gameOver':
            afficheGameOver(ctx);
            break;
        case 'jeuEnCoursLv1':

            ctx.drawImage(assets.backgroundImageLv1, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(assets.coinScore, 140, 15, 40, 40);
            ctx.fillStyle = 'white';
            ctx.font = "25px arial";
            ctx.fillText(score, 190, 45 );

            // 2 - On dessine le nouveau contenu
            tableauDesObjetsGraphiquesLv1.forEach(o => {
                o.draw(ctx);
            });

            // 3 - on déplace les objets
            testeEtatClavierPourJoueur();
            
            timeSprite += 1; 
            if (timeSprite === 60) {
                timeSprite = 0;
            }


            //timer pour le sprite du coeur
            timeSpriteHeart += 1;
            if (timeSpriteHeart === 5) {
                coeur.spriteMvt(positionTableauHeart);
                positionTableauHeart += 1;
                if (positionTableauHeart === 8) {
                    positionTableauHeart = 0;
                }
                timeSpriteHeart = 0;
            }

            //timer pour le sprite du ruby
            timeSpriteRuby += 1;
            if (timeSpriteRuby === 10) {

                rubyListLv1.forEach(ruby => {
                
                    ruby.spriteMvt(positionTableauRuby);
                    positionTableauRuby += 1;
                    if (positionTableauRuby === 4) {
                        positionTableauRuby = 0;
                    }

                }
                );
                timeSpriteRuby = 0;
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
            detecteCollisionJoueurAvecObstaclesLv1();
            testCollisionAvecMonsterLv1();
            detecteCollisionJoueurAvecSortie();
            detecteCollisionJoueurCoeurLv1();
            detecteCollisionJoueurRubyLv1();
            break;

        case 'jeuEnCoursLv2':

            ctx.drawImage(assets.backgroundImageLv2, 0, 0, canvas.width, canvas.height);
            ctx.drawImage(assets.coinScore, 140, 15, 40, 40);
            ctx.fillStyle = 'white';
            ctx.font = "25px arial";
            ctx.fillText(score, 190, 45 );

            tableauDesObjetsGraphiquesLv2.forEach(o => {
                o.draw(ctx);
            });

            testeEtatClavierPourJoueur();

            timeSprite += 1; 
            if (timeSprite === 60) {
                timeSprite = 0;
            }

            //timer pour le sprite du coeur
            timeSpriteHeart += 1;
            if (timeSpriteHeart === 5) {
                coeur2.spriteMvt(positionTableauHeart);
                positionTableauHeart += 1;
                if (positionTableauHeart === 8) {
                    positionTableauHeart = 0;
                }
                timeSpriteHeart = 0;
            }

            //timer pour le sprite du ruby
            timeSpriteRuby += 1;
            if (timeSpriteRuby === 10) {

                rubyListLv2.forEach(ruby => {
                
                    ruby.spriteMvt(positionTableauRuby);
                    positionTableauRuby += 1;
                    if (positionTableauRuby === 4) {
                        positionTableauRuby = 0;
                    }

                }
                );
                timeSpriteRuby = 0;
            }

            monster3.spriteMvt(timeSprite);
            monster4.spriteMvt(timeSprite);

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

            joueur.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height);
            detecteCollisionJoueurAvecObstaclesLv2()
            testCollisionAvecMonsterLv2();
            detecteCollisionJoueurAvecSortie();
            detecteCollisionJoueurCoeurLv2();
            detecteCollisionJoueurRubyLv2();            
            break;
    
        } 

    // 4 - On rappelle la fonction d'animation
    requestAnimationFrame(animationLoop);




}

function afficheMenuStart(ctx) {

    ctx.save();
    ctx.drawImage(assets.BackgroundMenu, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';

    ctx.font = "30px arial";
    var textWidth = ctx.measureText("JOUER (Space)").width;
    var x = (canvas.width - textWidth) / 2;
    var y = canvas.height - 25;
    var currentTime = Date.now();
    if (currentTime - lastBlinkTime >= blinkInterval) {
        textVisible = !textVisible;
        lastBlinkTime = currentTime;
    }
    if (textVisible) {
        ctx.fillText("JOUER (Space)", x, y);
        ctx.strokeText("JOUER (Space)", x, y);
    }
    if (inputState.space) {
        assets.menuMusic.pause();
        gameState = 'menuNiveau';
    }
    score = 0;

    ctx.restore(); 
}

function afficheMenuNiveau(ctx) { 

    ctx.save();
    ctx.drawImage(assets.menuLevel, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
 
    if (mousePos.x > 0 && mousePos.x < 420) {  
        ajouteEcouteurClickSourie();
        if (inputState.leftClick) {
            assets.linkForestMusic.play();
            gameState = 'jeuEnCoursLv1';
            joueur.x = 60;
            joueur.y = 230;
            heart1.numero = 0;
            heart2.numero = 0;
            heart3.numero = 0;

            timeSprite = 0;
            timeSpriteHeart = 0;
            timeSpriteRuby = 0;
            positionTableauHeart = 0;
            positionTableauRuby = 0;

        }
     }

    if (mousePos.x > 420 && mousePos.x < 875) {  
        ajouteEcouteurClickSourie();
        if (inputState.leftClick) {
            assets.linkForestMusic.play();
            gameState = 'jeuEnCoursLv2';
            joueur.x = 810;
            joueur.y = 239;
            heart1.numero = 0;
            heart2.numero = 0;
            heart3.numero = 0;

            timeSprite = 0;
            timeSpriteHeart = 0;
            timeSpriteRuby = 0;
            positionTableauHeart = 0;
            positionTableauRuby = 0;
        }
    }

    ctx.restore();
} 

function afficheGameOver(ctx) {

    ctx.save();
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(assets.gameOverAssets, 220, 110, canvas.width/2, canvas.height/2);

    ctx.fillStyle = 'white';
    ctx.font = "25px arial";
    ctx.fillText("RETOUR AU MENU (Enter)", 285, 450 );

    if (inputState.enter) {
        assets.menuMusic.play();
        gameState = 'menuStart';
        joueur.x = 0;
        score = 0;
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

function testCollisionAvecMonsterLv1(){

    let collisionExist = false;
    let currentObstacle;

    tableauDesObjetsGraphiquesLv1.forEach(o => {
        
        if (o instanceof ObstacleAnime) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true;
                currentObstacle = o;
            }
        }
    }
    );

    if (collisionExist) {

        assets.hitMusic.play();



        
        //collision par la gauche
        if(joueur.x < currentObstacle.x){
            joueur.x = currentObstacle.x - joueur.l - 20;
        } 
        //collision par la droite
        if(joueur.x > currentObstacle.x){
            joueur.x = currentObstacle.x + currentObstacle.l + 20;
        }
        //collision par le haut
        if(joueur.y < currentObstacle.y){
            joueur.y = currentObstacle.y - joueur.h - 20;
        }
        //collision par le bas
        if(joueur.y > currentObstacle.y){
            joueur.y = currentObstacle.y + currentObstacle.h + 20 ;
        }
            



        if (heart1.numero === 0 || heart1.numero === 1){
            heart1.loseLife();
        } else if (heart2.numero === 0 || heart2.numero === 1){
            heart2.loseLife();
        } else if (heart3.numero === 0 || heart3.numero === 1){
            heart3.loseLife();
        }

        if (heart3.numero === 2){
            assets.linkForestMusic.stop();
            gameState = 'gameOver';
        }

    }


}

function testCollisionAvecMonsterLv2(){

    let collisionExist = false;
    let currentObstacle;

    tableauDesObjetsGraphiquesLv2.forEach(o => {
        
        if (o instanceof ObstacleAnime) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true;
                currentObstacle = o;
            }
        }
    }
    );

    if (collisionExist) {

        assets.hitMusic.play();

        //collision par la gauche
        if(joueur.x < currentObstacle.x){
            joueur.x = currentObstacle.x - joueur.l - 20;
        } 
        //collision par la droite
        if(joueur.x > currentObstacle.x){
            joueur.x = currentObstacle.x + currentObstacle.l + 20;
        }
        //collision par le haut
        if(joueur.y < currentObstacle.y){
            joueur.y = currentObstacle.y - joueur.h - 20;
        }
        //collision par le bas
        if(joueur.y > currentObstacle.y){
            joueur.y = currentObstacle.y + currentObstacle.h + 20 ;
        }


        if (heart1.numero === 0 || heart1.numero === 1){
            heart1.loseLife();
        } else if (heart2.numero === 0 || heart2.numero === 1){
            heart2.loseLife();
        } else if (heart3.numero === 0 || heart3.numero === 1){
            heart3.loseLife();
        }

        if (heart3.numero === 2){
            assets.linkForestMusic.stop();
            gameState = 'gameOver';
        }

    }


}

function detecteCollisionJoueurAvecObstaclesLv1() {
    let collisionExist = false;
    let currentObstacle = null;
    let typeObstacle = null;
    // On va tester si le joueur est en collision avec un des obstacles
    tableauDesObjetsGraphiquesLv1.forEach(o => {
        
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

        if (typeObstacle === 'rect') {
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

        if (typeObstacle === 'rounded') {

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

function detecteCollisionJoueurAvecObstaclesLv2() {
    let collisionExist = false;
    let currentObstacle = null;
    let typeObstacle = null;
    // On va tester si le joueur est en collision avec un des obstacles
    tableauDesObjetsGraphiquesLv2.forEach(o => {
        
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

        if (typeObstacle === 'rect') {
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

        if (typeObstacle === 'rounded') {

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
    if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, sortie1.x, sortie1.y, sortie1.r)) {
        assets.victoryMusic.play();
        gameState = 'jeuEnCoursLv2';
        joueur.x = 810;
        joueur.y = 250;
        sortie1.couleur = 'lightgreen';
    }

    if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, sortie2.x, sortie2.y, sortie2.r)) {
        assets.linkForestMusic.stop();
        assets.victoryMusic.play();
        gameState = 'menuStart';
        sortie2.couleur = 'lightgreen';
    }
}

function detecteCollisionJoueurCoeurLv1() {

    let collisionExist = false;
    let currentObstacle;

    tableauDesObjetsGraphiquesLv1.forEach(o => {
        if (o instanceof Item && o.type === 'coeur') {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true;
                currentObstacle = o;
                let index = tableauDesObjetsGraphiquesLv1.indexOf(currentObstacle);
                tableauDesObjetsGraphiquesLv1.splice(index, 1);
            }
        }
    }
    );

    if (collisionExist) {
        assets.heartCharge.play();

        if (heart3.numero === 1){
            heart3.gainLife();
        } else if(heart3.numero === 0){
            if (heart2.numero === 2){
                heart2.gainLife();
            }else if(heart2.numero === 1){
                heart2.gainLife();
            }else if(heart2.numero === 0){
                if (heart1.numero === 2){
                    heart1.gainLife();
                }else if(heart1.numero === 1){
                    heart1.gainLife();
                }
            }
        }

    }
}

function detecteCollisionJoueurCoeurLv2() {

    let collisionExist = false;
    let currentObstacle;

    tableauDesObjetsGraphiquesLv2.forEach(o => {
        if (o instanceof Item && o.type === 'coeur') {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true;
                currentObstacle = o;
                let index = tableauDesObjetsGraphiquesLv2.indexOf(currentObstacle);
                tableauDesObjetsGraphiquesLv2.splice(index, 1);
            }
        }
    }
    );

    if (collisionExist) {
        assets.heartCharge.play();

        if (heart3.numero === 1){
            heart3.gainLife();
        } else if(heart3.numero === 0){
            if (heart2.numero === 2){
                heart2.gainLife();
            }else if(heart2.numero === 1){
                heart2.gainLife();
            }else if(heart2.numero === 0){
                if (heart1.numero === 2){
                    heart1.gainLife();
                }else if(heart1.numero === 1){
                    heart1.gainLife();
                }
            }
        }

    }
}

function detecteCollisionJoueurRubyLv1() {

    let collisionExist = false;
    let rubyType;
    let currentObstacle;

    tableauDesObjetsGraphiquesLv1.forEach(o => {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                if (o instanceof Item && (o.type === 'ruby_green' || o.type === 'ruby_red' || o.type === 'ruby_yellow')) {
                    collisionExist = true;
                    rubyType = o.type;
                    console.log("CHUI LA ");
                    currentObstacle = o;
                    let index = tableauDesObjetsGraphiquesLv1.indexOf(currentObstacle);
                    tableauDesObjetsGraphiquesLv1.splice(index, 1);
                }
            }
    }
    );

    if (collisionExist === true) {
        assets.getRuby.play();
        if (rubyType === 'ruby_green'){
            score += 100;
        } else if(rubyType === 'ruby_red'){
            score += 250;
        } else if (rubyType === 'ruby_yellow'){
            score += 500;
        }
        console.log("HOP LA DES SOUS");
    }

}

function detecteCollisionJoueurRubyLv2() {

    let collisionExist = false;
    let rubyType;
    let currentObstacle;

    tableauDesObjetsGraphiquesLv2.forEach(o => {
        if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
            if (o instanceof Item && (o.type === 'ruby_green' || o.type === 'ruby_red' || o.type === 'ruby_yellow')) {
                collisionExist = true;
                rubyType = o.type;
                currentObstacle = o;
                let index = tableauDesObjetsGraphiquesLv2.indexOf(currentObstacle);
                tableauDesObjetsGraphiquesLv2.splice(index, 1);
            }
        }
    }
    );

    if (collisionExist === true) {
        assets.getRuby.play();
        if (rubyType === 'ruby_green'){
            score += 100;
        } else if(rubyType === 'ruby_red'){
            score += 250;
        } else if (rubyType === 'ruby_yellow'){
            score += 500;
        }
        console.log("HOP LA DES SOUS");
    }

}