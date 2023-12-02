/////////////////////////////////////////////////////// CLASSES ///////////////////////////////////////////////////////

class EscenaJuego { // Parent class for characters and nodes
    constructor(phaserGO){
        this.phaserGO = phaserGO; // Phaser Game Object
        player.setCollideWorldBounds(true);
        player.body.allowGravity = false;
        this.troops = 0;
    }

    get x(){
        return this.phaserGO.x;
    }
    get y(){
        return this.phaserGO.y;
    }
}

class Player extends EscenaJuego {
    constructor(phaserGO){
        super(phaserGO);
        this.range = PLAYER_RANGE;
    }

    isInRange(EscenaJuego){
        var distance = Math.sqrt(
            Math.pow(EscenaJuego.x - this.x, 2) +
            Math.pow(EscenaJuego.y - this.y, 2)
        );
        return distance <= this.range;
    }
}

class Node extends EscenaJuego {
    constructor(phaserGO){
        super(phaserGO);
        this.troops = STARTING_NODE_TROOPS;
    }
}

/////////////////////////////////////////////////////// PHASER GAME ///////////////////////////////////////////////////////

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');

    this.load.image('nodeTeam1', 'assets/crystal_01b.png')
    this.load.image('nodeTeam1', 'assets/crystal_01j.png')
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    this.add.image(400, 300, 'sky');

    player = this.physics.add.sprite(100, 450, 'dude');
    player1 = new Player(player);

    player = this.physics.add.sprite(200, 450, 'dude');
    player2 = new Player(player);

    node = this.add.image(300, 300, 'nodeTeam1');
    node1 = new Node(node);

    //var style = { font: "65px Arial", fill: "#ffffff", align: "center" };

    //var text = this.add.text(game.world.centerX, this.world.centerY, "- phaser -\nwith a sprinkle of\npixi dust", style);

    //text.anchor.set(0.5);
    
    cursors = this.input.keyboard.createCursorKeys();
    keys = this.input.keyboard.addKeys({
        'up': Phaser.Input.Keyboard.KeyCodes.W,
        'down': Phaser.Input.Keyboard.KeyCodes.S,
        'left': Phaser.Input.Keyboard.KeyCodes.A,
        'right': Phaser.Input.Keyboard.KeyCodes.D
    });
}

function update() {
    playerMovement();
}


function playerMovement(){
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
