import Obstacle  from './ObstacleClass.js';

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class ObstacleAnime extends Obstacle {
    constructor(x, y, l, h, vy) {
        // on appelle le constructeur de la classe mère
        super(x, y, l, h);
        this.vy = -vy;
        

         //on recupere l'image du joueur en png que l'on divise en 30*30 et on l'associe à la propriété sprite
         let url = new Image();
         url.src = "../assets/images/OctupusSprite/OctopusSpriteDown/00_octorock.png";
         this.sprite = url;
    }

    
    // on hérite de la méthode draw(ctx)
    draw(ctx) {
        // on appelle la méthode draw de la classe mère
       
        super.draw(ctx);
        this.y += this.vy;
        // collision en bas
        if(this.y + this.h > 200) {
            // On met l'obstacle au point de contact
            this.y = 200 - this.h;
            // et on inverse la vitesse
            this.vy = -this.vy;

        }
        // collision en haut
        if(this.y < 100) {
            // On met l'obstacle au point de contact
            this.y = 100;
            // et on inverse la vitesse
            this.vy = -this.vy;
        }
        
        ctx.save();
        this.drawBoundingBox(ctx);
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.sprite, 0, 0);
        ctx.restore();
    }

    
}

