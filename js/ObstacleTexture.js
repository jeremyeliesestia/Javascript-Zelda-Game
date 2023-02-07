import Obstacle from "./ObstacleClass.js";
// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class ObstacleTexture extends Obstacle {
    constructor(x, y, l, h, url_texture) {
        // on appelle le constructeur de la classe mère
        super(x, y, l, h, 'black');

        // On cree une texture et on l'affecte à la couleur
        this.image = new Image();
        this.image.onload = () => {
            this.ready = true;
        }

        this.image.src = url_texture;
    }

    draw(ctx) {
        if(this.ready) {
            // on appelle la méthode draw de la classe mère
            this.texture = ctx.createPattern(this.image, 'repeat');
            this.couleur = this.texture;
            super.draw(ctx);
        }
    }
}

