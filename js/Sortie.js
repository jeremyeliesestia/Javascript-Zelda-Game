import ObjetGraphique from "./ObjetGraphique.js";

export default class Sortie extends ObjetGraphique {
    constructor(x, y, r, couleur) {
        super(x, y, 2*r, 2*r, couleur);
        this.r = r;

        let url = new Image();
        url.src = "../assets/images/zelda_sprite.png";
        this.sprite = url;

    }

    draw(ctx) {

        ctx.save();
        //this.drawBoundingBox(ctx); 
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.sprite, 0, -14  , 102/2, 174/2 );

        /*ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.couleur;
        // voir mooc html5 coding essentials and best practices 
        // module 3 sur graphics
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle="black";
        ctx.lineWidth=2;
        ctx.stroke();*/
        ctx.restore();
    }

    drawBoundingBox(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(0, 0, this.l, this.h);
        // et on le restaure à la fin de la fonction
        ctx.restore(); 
    } 
}