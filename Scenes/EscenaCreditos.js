class EscenaCreditos extends Phaser.Scene {
    constructor () {
        super({key: EscenaCreditos});
    }

    preload() {

    }

    create() {
        this.add.text(20, 20, "Credits");
    }

    update(time, delta) {

    }
}