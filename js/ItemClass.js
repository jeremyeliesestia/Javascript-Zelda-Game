import ObjetGraphique from "./ObjetGraphique.js";

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class Item extends ObjetGraphique {
    constructor(x, y, l, h, spriteTableau, type) {
        // on appelle le constructeur de la classe mère
        super(x, y, l, h);
        this.spriteTableau = spriteTableau;
        this.type = type;
        this.numeroSprite = 0;
    }

    draw(ctx) {
        ctx.save();
        //this.drawBoundingBox(ctx);
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.spriteTableau[this.numeroSprite], 0, 0, this.l, this.h);
        ctx.restore();
    }

    spriteMvt(position){
            this.numeroSprite = position;
    }

} 