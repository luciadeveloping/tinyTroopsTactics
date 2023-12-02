var player1;
var player2;
var node1; // Nuevo
var node2; // Nuevo
var text;

var cursors;
var keys;
var PLAYER_RANGE = 200;
var STARTING_NODE_TROOPS = 10;

class SceneObject {
    constructor(phaserGO) {
        this.phaserGO = phaserGO;

        // para ver si es un objeto fisico
        if (this.phaserGO.body) {
            this.phaserGO.setCollideWorldBounds(true);
            this.phaserGO.body.allowGravity = false;
        }

        this.troops = 0;
    }

    get x() {
        return this.phaserGO.x;
    }
    get y() {
        return this.phaserGO.y;
    }
}

class Player extends SceneObject {
    constructor(phaserGO) {
        super(phaserGO);
        this.range = PLAYER_RANGE;
    }

    isInRange(sceneObject) {
        var distance = Math.sqrt(
            Math.pow(sceneObject.x - this.x, 2) +
            Math.pow(sceneObject.y - this.y, 2)
        );
        return distance <= this.range;
    }
}

class Node extends SceneObject {
    constructor(phaserGO) {
        super(phaserGO);
        this.troops = STARTING_NODE_TROOPS;
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('nodeTeam1', 'assets/crystal_01b.png');
        this.load.image('nodeTeam2', 'assets/crystal_01j.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        this.add.image(400, 300, 'sky');

        player1 = new Player(this.physics.add.sprite(100, 450, 'dude'));
        player2 = new Player(this.physics.add.sprite(200, 450, 'dude'));

        node1 = new Node(this.physics.add.sprite(300, 300, 'nodeTeam1')); // Cambiado a physics.add.sprite
        node2 = new Node(this.physics.add.sprite(500, 300, 'nodeTeam2')); // Cambiado a physics.add.sprite

        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update() {
        this.playerMovement();
    }

    playerMovement() {
        // PLAYER 1 (wasd)
        if (keys.left.isDown) {
            player1.phaserGO.setVelocityX(-160);
        } else if (keys.right.isDown) {
            player1.phaserGO.setVelocityX(160);
        } else {
            player1.phaserGO.setVelocityX(0);
        }

        if (keys.up.isDown) {
            player1.phaserGO.setVelocityY(-160);
        } else if (keys.down.isDown) {
            player1.phaserGO.setVelocityY(160);
        } else {
            player1.phaserGO.setVelocityY(0);
        }

        // PLAYER 2 (flechas)
        if (cursors.left.isDown) {
            player2.phaserGO.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player2.phaserGO.setVelocityX(160);
        } else {
            player2.phaserGO.setVelocityX(0);
        }

        if (cursors.up.isDown) {
            player2.phaserGO.setVelocityY(-160);
        } else if (cursors.down.isDown) {
            player2.phaserGO.setVelocityY(160);
        } else {
            player2.phaserGO.setVelocityY(0);
        }
    }
}
