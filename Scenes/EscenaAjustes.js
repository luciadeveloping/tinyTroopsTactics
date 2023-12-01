class EscenaAjustes extends Phaser.Scene {
    constructor () {
        super({key: EscenaAjustes});
    }

    preload() {

    }

    create() {
        this.add.text(20, 20, "Settings");
    }

    update(time, delta) {

    }
}