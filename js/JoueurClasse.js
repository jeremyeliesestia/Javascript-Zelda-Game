import ObjetGraphique from "./ObjetGraphique.js";

export default class Joueur extends ObjetGraphique {
 

    constructor(x, y, l, h, sprite, nbVies) {
        // on appelle le constructeur de la classe mère
        // pour initialiser les propriétés héritées
        super(x, y, l, h, 'black');
        this.sprite = sprite;
        // on initialise les propriétés propres à la classe Joueur
        this.nbVies = nbVies;
        this.vx = 0;
        this.vy = 0;
        
        //this.video = document.querySelector('#sourcevid');
        
    }
    // on redefinit la méthode héritée draw(ctx)
    draw(ctx) {
        //if(!this.ready) return;

        // bonne pratique : si on change le contexte (position du repère, couleur, ombre, etc.)
        // on sauvegarde le contexte avant de le modifier et
        // on le restaure à la fin de la fonction
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.drawImage(this.sprite, 0, 0);
        //ctx.drawImage(this.video, 0, 0, this.l, this.h);
        /*
        ctx.fillStyle = this.couleur;
        ctx.fillRect(0, 0, this.l, this.h);
        // on dessine les yeux
        ctx.fillStyle = 'yellow';
        ctx.fillRect(5, 5, 10, 10);
        ctx.fillRect(32, 5, 10, 10);
        // bouche
        ctx.fillRect(15, 30, 20, 10);
        this.dessineCorps(ctx);
        */

        ctx.restore();
    }
    dessineCorps(ctx) {
        ctx.save();
        ctx.translate(0, 50);
        ctx.fillStyle = 'blue';
        ctx.fillRect(12, 0, 25, 30);
        ctx.restore();
    }
    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    followMouse(mousePos) {
        this.x = mousePos.x - this.l / 2;
        this.y = mousePos.y - this.h / 2;
    }

    testeCollisionAvecBordsDuCanvas(largeurCanvas, hauteurCanvas) {
        if (this.x + this.l > largeurCanvas) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.x = largeurCanvas - this.l;
            this.vitesse = -this.vitesse;
        }
        if (this.x < 0) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.x = 0;
            this.vitesse = -this.vitesse;
        }
    }
}