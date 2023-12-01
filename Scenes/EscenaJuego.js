class EscenaJuego extends Phaser.Scene {
    constructor(){
        super({key: EscenaJuego})
    }

    preload() {

    }

    create () {
        this.add.text(20, 20, "Playing game");
    }

    update(time, delta) {

    }
}