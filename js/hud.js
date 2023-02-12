import ObjetGraphique from "./ObjetGraphique.js";

export default class hud extends ObjetGraphique {
    constructor(x, y, l, h, tableauSprite, numero) {
        
        super(x, y, l, h);

        this.tableauSprite = tableauSprite;
        this.numero = numero;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.tableauSprite[this.numero], 0, 0, 35, 35);
        ctx.restore();
    }

    loseLife(){
        this.numero++;
    }

    gainLife(){
        this.numero--;
    }

}