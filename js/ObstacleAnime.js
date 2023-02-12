import Obstacle  from './ObstacleClass.js';

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class ObstacleAnime extends Obstacle {
    constructor(x, y, l, h, speed, spriteTableau, sens, startPos, endPos) {
        // on appelle le constructeur de la classe mère
        super(x, y, l, h);
        this.speed = -speed;
        this.startPos = startPos;
        this.endPos = endPos;
        this.spriteTableau = spriteTableau;
        this.numeroSprite = 0;
        this.sens = sens;
        this.direction = null;
    }

    
    // on hérite de la méthode draw(ctx)
    draw(ctx) {
        // on appelle la méthode draw de la classe mère
       
        //super.draw(ctx);

        if (this.sens === "vertical"){
            this.y += this.speed;
            // collision en bas
            if(this.y + this.h > this.endPos) {
                // On met l'obstacle au point de contact
                this.y = this.endPos - this.h;
                // et on inverse la vitesse
                this.speed = -this.speed;
                
                this.direction = "haut";

            }
            // collision en haut
            if(this.y < this.startPos) {
                // On met l'obstacle au point de contact
                this.y = this.startPos;
                // et on inverse la vitesse
                this.speed = -this.speed;

                this.direction = "bas";
            }
        }



        if (this.sens === "horizontal"){
            this.x += this.speed;
            // collision a droite
            if(this.x + this.l > this.endPos) {
                // On met l'obstacle au point de contact
                this.x = this.endPos - this.l;
                // et on inverse la vitesse
                this.speed = -this.speed;
                
                this.direction = "gauche";

            }
            // collision a gauche
            if(this.x < this.startPos) {
                // On met l'obstacle au point de contact
                this.x = this.startPos;
                // et on inverse la vitesse
                this.speed = -this.speed;

                this.direction = "droite";
            }
        }

        ctx.save();
        //this.drawBoundingBox(ctx);
        ctx.translate(this.x, this.y);



        ctx.drawImage(this.spriteTableau[this.numeroSprite], 0, 0, 50, 50);
        ctx.restore();
    }

    spriteMvt(timeSprite){

        this.timeSprite = timeSprite;

        if (this.sens === "vertical") {

            if (this.direction === "bas") {
                if (this.timeSprite == 15) {
                    this.numeroSprite = 1;
                }

                if (this.timeSprite == 30) {
                    this.numeroSprite = 2;
                }

                if (this.timeSprite == 45) {
                    this.numeroSprite = 3;
                }

                if (this.timeSprite == 0) {
                    this.numeroSprite = 0;
                }
            }


            if (this.direction === "haut") {

                if (this.timeSprite == 15) {
                    this.numeroSprite = 13;
                }

                if (this.timeSprite == 30) {
                    this.numeroSprite = 14;
                }

                if (this.timeSprite == 45) {
                    this.numeroSprite = 15;
                }

                if (this.timeSprite == 0) {
                    this.numeroSprite = 12;
                }

            }

        }

        if (this.sens === "horizontal") {

            if (this.direction === "gauche") {
                if (this.timeSprite == 15) {
                    this.numeroSprite = 5;
                }

                if (this.timeSprite == 30) {
                    this.numeroSprite = 6;
                }

                if (this.timeSprite == 45) {
                    this.numeroSprite = 7;
                }

                if (this.timeSprite == 0) {
                    this.numeroSprite = 4;
                }

            }

            if (this.direction === "droite") {

                if (this.timeSprite == 15) {
                    this.numeroSprite = 9;
                }

                if (this.timeSprite == 30) {
                    this.numeroSprite = 10;
                }

                if (this.timeSprite == 45) {
                    this.numeroSprite = 11;
                }

                if (this.timeSprite == 0) {
                    this.numeroSprite = 8;
                }


            }


        }


    }

}

