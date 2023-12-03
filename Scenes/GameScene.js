var player1;
var player2;
var node1; // Nuevo
var node2; // Nuevo
var text;
var mapZones;

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

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        //MAPA
        this.load.image('map', 'assets/map/mapa.png');
        this.load.image('mapZone0', 'assets/map/mapZone0.png');
        this.load.image('mapZone1', 'assets/map/mapZone1.png');
        this.load.image('mapZone2', 'assets/map/mapZone2.png');
        this.load.image('mapZone3', 'assets/map/mapZone3.png');
        this.load.image('mapZone4', 'assets/map/mapZone4.png');
        this.load.image('mapZone5', 'assets/map/mapZone5.png');
        this.load.image('mapZone6', 'assets/map/mapZone6.png');
        this.load.image('mapZone7', 'assets/map/mapZone7.png');
        this.load.image('mapZone8', 'assets/map/mapZone8.png');
        this.load.image('mapZone9', 'assets/map/mapZone9.png');

        //DEMÁS
        this.load.image('nodeTeam1', 'assets/crystal_01b.png');
        this.load.image('nodeTeam2', 'assets/crystal_01j.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {

        //MAPA
        this.cameras.main.setBackgroundColor('#add8e6'); // Código azul claro
        this.add.image(600, 300, 'map'); //mapa entero

        mapZones = this.physics.add.group();
        // Agrega las zonas del mapa al grupo
        var zone0 = this.physics.add.sprite(96, 146, 'mapZone0');
        var zone1 = this.physics.add.sprite(185, 129, 'mapZone1');
        var zone2 = this.physics.add.sprite(247, 160, 'mapZone2');
        var zone3 = this.physics.add.sprite(247, 209, 'mapZone3');
        var zone4 = this.physics.add.sprite(181, 278, 'mapZone4');
        var zone5 = this.physics.add.sprite(285, 271, 'mapZone5');
        var zone6 = this.physics.add.sprite(275, 357, 'mapZone6');
        var zone7 = this.physics.add.sprite(250, 405, 'mapZone7');
        var zone8 = this.physics.add.sprite(195, 365, 'mapZone8');
        var zone9 = this.physics.add.sprite(258, 459, 'mapZone9');

        mapZones.addMultiple([zone0, zone1, zone2, zone3 ,zone4 ,
        zone5, zone6, zone7, zone8, zone9]);
        
        mapZones.children.iterate(function (zone) {
            zone.setImmovable(true); //así no se mueven
            zone.body.allowGravity = false; // para q no haya gravedad, sino se caen
            zone.setCollideWorldBounds(true);
        });

        //JUGADORES
        player1 = new Player(this.physics.add.sprite(100, 450, 'dude'));
        player2 = new Player(this.physics.add.sprite(200, 450, 'dude'));
        //-->para que los jugadores estén por encima de las zonas
        player1.phaserGO.setDepth(1);
        player2.phaserGO.setDepth(1);

        node1 = new Node(this.physics.add.sprite(300, 300, 'nodeTeam1')); // Cambiado a physics.add.sprite
        node2 = new Node(this.physics.add.sprite(500, 300, 'nodeTeam2')); // Cambiado a physics.add.sprite

        //prueba zonas con overlap
        this.physics.add.overlap(player1.phaserGO, mapZones, this.handleZoneOverlap, null, this);
        this.physics.add.overlap(player2.phaserGO, mapZones, this.handleZoneOverlap, null, this);
        

        //KEYBOARD INPUTS
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

    //prueba color
    handleZoneOverlap(player, zone) {
        if (player === player1.phaserGO) {
            zone.setTint(0xFFA500); // Naranja para el jugador 1
        } else if (player === player2.phaserGO) {
            zone.setTint(0x800080); // Lila para el jugador 2
        }
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
