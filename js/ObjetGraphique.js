export default class ObjetGraphique {
    constructor(x, y, l, h, couleur) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.h = h;
        this.couleur = couleur;
    }   

    draw(ctx) {
        // Bonne pratique, quand on change la couleur, la position du repère, etc.
        // les ombres, par exemple, on sauvegarde le contexte avant de le modifier
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.couleur;
        ctx.fillRect(0, 0, this.l, this.h);
        // et on le restaure à la fin de la fonction
        ctx.restore();
    }
    drawBoundingBox(ctx) {
        // Bonne pratique, quand on change la couleur, la position du repère, etc.
        // les ombres, par exemple, on sauvegarde le contexte avant de le modifier
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(0, 0, this.l, this.h);
        // et on le restaure à la fin de la fonction
        ctx.restore();
    }
}