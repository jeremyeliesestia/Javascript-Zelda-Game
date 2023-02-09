import ObjetGraphique from "./ObjetGraphique.js";

export default class Joueur extends ObjetGraphique {
 
    constructor(x, y, l, h, nbVies) {
        // on appelle le constructeur de la classe mère
        // pour initialiser les propriétés héritées
        super(x, y, l, h, 'black');

        //on recupere l'image du joueur en png que l'on divise en 30*30 et on l'associe à la propriété sprite
        let url = new Image();
        url.src = "../assets/images/LinkSprite/LinkSpriteDown/Static/00_link_sprite.png";
        this.sprite = url;

        // on initialise les propriétés propres à la classe Joueur
        this.nbVies = nbVies;
        this.vx = 0;
        this.vy = 0;
        this.v = 5;
        
        //this.video = document.querySelector('#sourcevid');
        
    }
    // on redefinit la méthode héritée draw(ctx)
    draw(ctx) {
        //if(!this.ready) return;

        // bonne pratique : si on change le contexte (position du repère, couleur, ombre, etc.)
        // on sauvegarde le contexte avant de le modifier et
        // on le restaure à la fin de la fonction
        ctx.save();
        this.drawBoundingBox(ctx);
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

    spriteMvt(direction, timeSprite){

        let timeSpriteAny = timeSprite / 20;
        let timeSpriteSec = timeSprite / 6;

        if (direction === 'any') {
        
            if(timeSpriteAny === 0){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Static/00_link_sprite.png";
                this.sprite = url;
            }
            if(timeSpriteAny === 1){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Static/01_link_sprite.png";
                this.sprite = url;
            }
            if(timeSpriteAny === 2){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Static/02_link_sprite.png";
                this.sprite = url;
            }
            if(timeSpriteAny === 3){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Static/00_link_sprite.png";
                this.sprite = url;
            }
    
        }

        if (direction === 'right') {
            if (timeSpriteSec === 0){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteRight/Dynamic/70_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 1){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteRight/Dynamic/71_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 2){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteRight/Dynamic/72_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 3){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteRight/Dynamic/73_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 4){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteRight/Dynamic/74_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 5){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteRight/Dynamic/75_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 6){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteRight/Dynamic/76_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 7){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteRight/Dynamic/77_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 8){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteRight/Dynamic/78_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 9){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteRight/Dynamic/79_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 10){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteRight/Dynamic/70_link_sprite.png";
                this.sprite = url;
            }

        }

        if (direction === 'left') {
            if (timeSpriteSec === 0){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteLeft/Dynamic/50_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 1){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteLeft/Dynamic/51_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 2){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteLeft/Dynamic/52_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 3){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteLeft/Dynamic/53_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 4){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteLeft/Dynamic/54_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 5){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteLeft/Dynamic/55_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 6){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteLeft/Dynamic/56_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 7){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteLeft/Dynamic/57_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 8){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteLeft/Dynamic/58_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 9){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteLeft/Dynamic/59_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 10){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteLeft/Dynamic/50_link_sprite.png";
                this.sprite = url;
            }
        }

        if (direction === 'up') {

            if (timeSpriteSec === 0){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteUp/Dynamic/60_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 1){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteUp/Dynamic/61_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 2){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteUp/Dynamic/62_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 3){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteUp/Dynamic/63_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 4){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteUp/Dynamic/64_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 5){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteUp/Dynamic/65_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 6){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteUp/Dynamic/66_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 7){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteUp/Dynamic/67_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 8){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteUp/Dynamic/68_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 9){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteUp/Dynamic/69_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 10){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteUp/Dynamic/60_link_sprite.png";
                this.sprite = url;
            }
        }

        if (direction === 'down') {
            if (timeSpriteSec === 0){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Dynamic/40_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 1){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Dynamic/41_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 2){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Dynamic/42_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 3){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Dynamic/43_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 4){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Dynamic/44_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 5){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Dynamic/45_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 6){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Dynamic/46_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 7){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Dynamic/47_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 8){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Dynamic/48_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 9){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Dynamic/49_link_sprite.png";
                this.sprite = url;
            }

            if (timeSpriteSec === 10){
                let url = new Image();
                url.src = "../assets/images/LinkSprite/LinkSpriteDown/Dynamic/40_link_sprite.png";
                this.sprite = url;
            }
        }


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





        if (this.y + this.h > hauteurCanvas) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.y = hauteurCanvas - this.h;
            this.vitesse = -this.vitesse;
        }

        if (this.y < 0) {
            // On positionne le joueur à la limite du canvas, au point de contact
            this.y = 0;
            this.vitesse = -this.vitesse;
        }
    }
}