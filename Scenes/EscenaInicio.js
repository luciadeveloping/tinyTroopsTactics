class EscenaInicio extends Phaser.Scene {
    constructor () {
        super({key: EscenaInicio});
    }

    preload() {

    }

    create() {
        this.add.text(20, 20, "Loading game...");
    }

    update(time, delta) {

    }
}