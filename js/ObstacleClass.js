import ObjetGraphique from "./ObjetGraphique.js";

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class Obstacle extends ObjetGraphique {
    constructor(x, y, l, h) {
        // on appelle le constructeur de la classe mère
        super(x, y, l, h);
    }

    // on hérite de la méthode draw(ctx)
    draw(ctx) {
        ctx.save();
        ctx.translate(0, 0);
        ctx.beginPath();

        ctx.globalAlpha = 0;
        ctx.fillRect(this.x, this.y, this.l, this.h);
        ctx.lineWidth = 0;
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        
        ctx.fill();
        ctx.restore();
    }

}

