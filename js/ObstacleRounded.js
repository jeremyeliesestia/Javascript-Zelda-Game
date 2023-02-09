import ObjetGraphique from "./ObjetGraphique.js";

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class ObstacleRounded extends ObjetGraphique {
    constructor(x, y, r) {
        super(x, y, 2*r);
        this.r = r;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();

        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";

        ctx.arc(0, 0, this.r, 0, 2*Math.PI);
        ctx.fill();

        //fond transparent

        ctx.strokeStyle="blue";
        ctx.lineWidth=2;




        ctx.stroke();
        ctx.restore();
    }

}

