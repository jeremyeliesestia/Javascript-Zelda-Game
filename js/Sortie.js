import ObjetGraphique from "./ObjetGraphique.js";

export default class Sortie extends ObjetGraphique {
    constructor(x, y, r, couleur) {
        super(x, y, 2*r, 2*r, couleur);
        this.r = r;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.couleur;
        // voir mooc html5 coding essentials and best practices
        // module 3 sur graphics
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle="black";
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.restore();
    }

    drawBoundingBox(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        // voir mooc html5 coding essentials and best practices
        // module 3 sur graphics
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, 2*Math.PI);
        ctx.strokeStyle="red";
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.restore();
    }
}