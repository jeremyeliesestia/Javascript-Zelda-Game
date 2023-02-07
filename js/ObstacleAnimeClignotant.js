import ObstacleAnime  from './ObstacleAnime.js';

// bonne pratique : une seule classe exportée par fichier et on l'exporte par 
// defaut
export default class ObstacleAnimeClignotant extends ObstacleAnime {
    constructor(x, y, l, h, couleur, vy) {
        super(x, y, l, h, couleur, vy);

        setInterval(() => {
            // cette fonction interne est appelée toutes les 500ms
            // on inverse la couleur
            if(this.couleur === 'red') 
                this.couleur = 'blue';
            else 
                this.couleur = 'red';
        }, 500)
    }
    // on hérite de la méthode draw(ctx)
    draw(ctx) {
        super.draw(ctx);
    }
}

