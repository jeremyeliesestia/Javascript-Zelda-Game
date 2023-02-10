import ObjetGraphique from "./ObjetGraphique.js";

export default class Joueur extends ObjetGraphique {
 
    constructor(x, y, l, h, nbVies, spriteTableau) {
        // on appelle le constructeur de la classe mère
        // pour initialiser les propriétés héritées
        super(x, y, l, h, 'black');

        //on recupere l'image du joueur en png que l'on divise en 30*30 et on l'associe à la propriété sprite
        // let url = new Image();
        // url.src = "../assets/images/LinkSprite/LinkSpriteDown/Static/1_link_sprite.png";
        // this.sprite = url;

        // on initialise les propriétés propres à la classe Joueur
        this.nbVies = nbVies;
        this.vx = 0;
        this.vy = 0;
        this.v = 5;
        this.spriteTableau = spriteTableau;
        this.numeroSprite = 0;
        
        //this.video = document.querySelector('#sourcevid');
        
    }
    // on redefinit la méthode héritée draw(ctx)
    draw(ctx) {
        //if(!this.ready) return;

        // bonne pratique : si on change le contexte (position du repère, couleur, ombre, etc.)
        // on sauvegarde le contexte avant de le modifier et
        // on le restaure à la fin de la fonction
        ctx.save();
        this.drawBoundingBox(ctx);
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.spriteTableau[this.numeroSprite], 0, 0);
    
        //ctx.drawImage(this.video, 0, 0, this.l, this.h);
        /*
        ctx.fillStyle = this.couleur;
        ctx.fillRect(0, 0, this.l, this.h);
        // on dessine les yeux
        ctx.fillStyle = 'yellow';
        ctx.fillRect(5, 5, 10, 10);
        ctx.fillRect(32, 5, 10, 10);
        // bouche
        ctx.fillRect(15, 30, 20, 10);
        this.dessineCorps(ctx);
        */

        ctx.restore();
    }

    dessineCorps(ctx) {
        ctx.save();
        ctx.translate(0, 50);
        ctx.fillStyle = 'blue';
        ctx.fillRect(12, 0, 25, 30);
        ctx.restore();
    }


    move() {

        this.x += this.vx;
        this.y += this.vy;

    }

    spriteMvt(direction, timeSprite){

        let timeSpriteAny = timeSprite / 20;
        let timeSpriteSec = timeSprite / 6;

        if (direction === 'any') {
        
            if(timeSpriteAny === 0){
                this.numeroSprite = 10;
            }
            if(timeSpriteAny === 1){
                this.numeroSprite = 11;
            }
            if(timeSpriteAny === 2){
                this.numeroSprite = 12;
            }
            if(timeSpriteAny === 3){
                this.numeroSprite = 10;
            }
    
        }

        if (direction === 'down') {
            if (timeSpriteSec === 0){
                this.numeroSprite = 0;
            }

            if (timeSpriteSec === 1){
                this.numeroSprite = 1;
            }

            if (timeSpriteSec === 2){
                this.numeroSprite = 2;
            }

            if (timeSpriteSec === 3){
                this.numeroSprite = 3;
            }

            if (timeSpriteSec === 4){
                this.numeroSprite = 4;
            }

            if (timeSpriteSec === 5){
                this.numeroSprite = 5;
            }

            if (timeSpriteSec === 6){
                this.numeroSprite = 6;
            }

            if (timeSpriteSec === 7){
                this.numeroSprite = 7;
            }

            if (timeSpriteSec === 8){
                this.numeroSprite = 8;
            }

            if (timeSpriteSec === 9){
                this.numeroSprite = 9;
            }

            if (timeSpriteSec === 10){
                this.numeroSprite = 0;
            }

        }

        if (direction === 'left') {
            if (timeSpriteSec === 0){
                this.numeroSprite = 13;
            }

            if (timeSpriteSec === 1){
                this.numeroSprite = 14;
            }

            if (timeSpriteSec === 2){
                this.numeroSprite = 15;
            }

            if (timeSpriteSec === 3){
                this.numeroSprite = 16;
            }

            if (timeSpriteSec === 4){
                this.numeroSprite = 17;
            }

            if (timeSpriteSec === 5){
                this.numeroSprite = 18;
            }

            if (timeSpriteSec === 6){
                this.numeroSprite = 19;
            }

            if (timeSpriteSec === 7){
                this.numeroSprite = 20;
            }

            if (timeSpriteSec === 8){
                this.numeroSprite = 21;
            }

            if (timeSpriteSec === 9){
                this.numeroSprite = 22;
            }

            if (timeSpriteSec === 10){
                this.numeroSprite = 13;
            }
        }

        if (direction === 'right') {

            if (timeSpriteSec === 0){
                this.numeroSprite = 26;
            }

            if (timeSpriteSec === 1){
                this.numeroSprite = 27;
            }

            if (timeSpriteSec === 2){
                this.numeroSprite = 28;
            }

            if (timeSpriteSec === 3){
                this.numeroSprite = 29;
            }

            if (timeSpriteSec === 4){
                this.numeroSprite = 30;
            }

            if (timeSpriteSec === 5){
                this.numeroSprite = 31;
            }

            if (timeSpriteSec === 6){
                this.numeroSprite = 32;
            }

            if (timeSpriteSec === 7){
                this.numeroSprite = 33;
            }

            if (timeSpriteSec === 8){
                this.numeroSprite = 34;
            }

            if (timeSpriteSec === 9){
                this.numeroSprite = 35;
            }

            if (timeSpriteSec === 10){
                this.numeroSprite = 26;
            }
        }

        if (direction === 'up') {
            if (timeSpriteSec === 0){
                this.numeroSprite = 39;
            }

            if (timeSpriteSec === 1){
                this.numeroSprite = 40;
            }

            if (timeSpriteSec === 2){
                this.numeroSprite = 41;
            }

            if (timeSpriteSec === 3){
                this.numeroSprite = 42;
            }

            if (timeSpriteSec === 4){
                this.numeroSprite = 43;
            }

            if (timeSpriteSec === 5){
                this.numeroSprite = 44;
            }

            if (timeSpriteSec === 6){
                this.numeroSprite = 45;
            }

            if (timeSpriteSec === 7){
                this.numeroSprite = 46;
            }

            if (timeSpriteSec === 8){
                this.numeroSprite = 47;
            }

            if (timeSpriteSec === 9){
                this.numeroSprite = 48;
            }

            if (timeSpriteSec === 10){
                this.numeroSprite = 39;
            }
        }

    }

    followMouse(mousePos) {
        this.x = mousePos.x - this.l / 2;
        this.y = mousePos.y - this.h / 2;
    }

    testeCollisionAvecBordsDuCanvas(largeurCanvas, hauteurCanvas) {
        if (this.x + this.l > largeurCanvas) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.x = largeurCanvas - this.l;
            this.vitesse = -this.vitesse;
        }

        if (this.x < 0) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.x = 0;
            this.vitesse = -this.vitesse;
        }





        if (this.y + this.h > hauteurCanvas) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.y = hauteurCanvas - this.h;
            this.vitesse = -this.vitesse;
        }

        if (this.y < 0) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.y = 0;
            this.vitesse = -this.vitesse;
        }
    }
}