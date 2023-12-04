var game;
var player1;
var player2;
var node1; // Nuevo
var node2; // Nuevo
var text;
var mapZones;

var nodeList;

var cursors;
var keys;
const PLAYER_RANGE = 200;
const PLAYER_MOVEMENT_SPEED = 200;
const SOLDIER_DISPLAY_VERTICAL_ANCHOR = -20
const NODE_STARTING_SOLDIERS = 5;
const Factions = {
    Neutral: "Neutral",
    One: "One",
    Two: "Two"
}

const DRAFTING_COOLDOWN = 500; // Miliseconds
var initTimeDraftPlayer1 = 0;

class SceneObject {
    // This class uses 'game' which is a Phaser object that needs to be initialize in the 'create' method !!!!!
    constructor(xPos, yPos, sprite) {
        this.phaserGO = game.physics.add.sprite(xPos, yPos, sprite); // Phaser Game Object.
        if (this.phaserGO.body) {
            this.phaserGO.setCollideWorldBounds(true);
            this.phaserGO.body.allowGravity = false;
        }
    }

    get x() {
        return this.phaserGO.x;
    }
    get y() {
        return this.phaserGO.y;
    }

    distanceTo(sceneObject){
        return Math.sqrt(
            Math.pow(sceneObject.x - this.x, 2) +
            Math.pow(sceneObject.y - this.y, 2)
        )
    }
}

class Player extends SceneObject {
    constructor(xPos, yPos, sprite) {
        super(xPos, yPos, sprite);
        this.phaserGO.setDepth(1);
        this.soldiers = 0;
        this.soldiersDisplay = game.add.text(xPos, yPos+30, '0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });;
        this.updateSoldiersDisplay();
        this.range = PLAYER_RANGE;
        this.nodesInRange = new Array();
        this.selectedNode = undefined;
    }

    moveDown(){
        this.phaserGO.setVelocityY(PLAYER_MOVEMENT_SPEED);
        this.updateSoldiersDisplayPosition();
    }
    moveUp(){
        this.phaserGO.setVelocityY(-PLAYER_MOVEMENT_SPEED);
        this.updateSoldiersDisplayPosition();
    }
    moveRight(){
        this.phaserGO.setVelocityX(PLAYER_MOVEMENT_SPEED);
        this.updateSoldiersDisplayPosition();
    }
    moveLeft(){
        this.phaserGO.setVelocityX(-PLAYER_MOVEMENT_SPEED);
        this.updateSoldiersDisplayPosition();
    }
    stopHorizontal(){
        this.phaserGO.setVelocityX(0);
    }
    stopVertical(){
        this.phaserGO.setVelocityY(0);
    }
    updateSoldiersDisplayPosition(){
        this.soldiersDisplay.x = this.phaserGO.x;
        this.soldiersDisplay.y = this.phaserGO.y - SOLDIER_DISPLAY_VERTICAL_ANCHOR;
    }
    updateSoldiersDisplay(){
        this.soldiersDisplay.setText(this.soldiers);
    }    

    isInRange(sceneObject) { // Checks if a given Scene Object is in range.
        return this.distanceTo(sceneObject) <= this.range;
    }

    checkForNodesInRange(){ // Fills up nodesInRange.
        this.nodesInRange.splice(0, this.nodesInRange.length); // Empty array.
        nodeList.forEach(node => {
            if(this.isInRange(node) && !this.nodesInRange.includes(node)){ // if a scene node is in range and its also not in the nodesInRange list already.
                this.nodesInRange.push(node);
            }
        });
        //console.log("Nodes in range:" + this.nodesInRange.length);
    }

    selectClosestNode(){
        this.checkForNodesInRange();

        if(this.nodesInRange.length == 0){ // If there are no nodes in range.
            if(this.selectedNode != undefined){ // If there was one previously selected, unselect it.
                this.selectedNode.unselect();
                this.selectedNode = undefined;
            }
            return undefined;
        }
        
        // If there are nodes in range find the colsest one.
        var closestNode = this.nodesInRange[0];
        this.nodesInRange.forEach(node => {
            if(this.distanceTo(node) < this.distanceTo(closestNode)){
                closestNode = node;
            }
        });

        if(this.selectedNode != undefined){ // If there was a previously selected node...
            if(this.selectedNode != closestNode) this.selectedNode.unselect(); // ...and its no longer the closest one, unselect the previous one.
        }
        
        // Select the closest node.
        closestNode.select(); 
        this.selectedNode = closestNode;
    }

    draftSoldierFromSelectedNode(){
        if(this.selectedNode != undefined){ // If a node is selected.
            if(this.selectedNode.draftSoldier()) this.soldiers = this.soldiers + 1; // If there are enough soldiers in selected node draft them.
            this.updateSoldiersDisplay()
            return true;
        }
        return false;
    }
}

class Node extends SceneObject {
    constructor(xPos, yPos) {
        super(xPos, yPos, 'nodeTeam1');
        this.soldiers = NODE_STARTING_SOLDIERS;
        this.soldiersDisplay = game.add.text(xPos - 7, yPos+30, '0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });;
        this.updateSoldiersDisplay();
        this.region = game.add.sprite(xPos, yPos);
        this.faction = Factions.Neutral;
    }

    draftSoldier(){
        if(this.soldiers > 0){
            this.soldiers = this.soldiers - 1;
            this.updateSoldiersDisplay();
            return true;
        }
        console.log("This node is empty!");
        return false;
    }

    select(){
        this.phaserGO.setTint(100);
    }
    unselect(){
        this.phaserGO.clearTint();
    }
    updateSoldiersDisplay(){
        this.soldiersDisplay.setText(this.soldiers);
    }  

    changeFaction(faction){
        switch(faction){
            case Factions.Neutral:
                // Cambiar el color de region al color neutral
                break;
            case Factions.One:
                // region con color equipo 1...
                break;
            case Factions.Two:

                break;
            default:
                break;
        }
        this.faction = faction;
    }

}

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Map.
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

        // Scene Obects.
        this.load.image('nodeTeam1', 'assets/crystal_01b.png');
        this.load.image('nodeTeam2', 'assets/crystal_01j.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create() {
        game = this;

        // Map.
        this.cameras.main.setBackgroundColor('#add8e6');
        //this.add.image(600, 300, 'map'); 

        // Players.
        player1 = new Player(100, 500, 'dude');
        player2 = new Player(200, 500, 'dude');

        nodeList = [
            new Node(300, 300),
            new Node(500, 300)
        ]

        //regArr = [
        //    this.add.sprite()
        //]

        //KEYBOARD INPUTS
        cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'interact': Phaser.Input.Keyboard.KeyCodes.CTRL
        });
    }

    update() {
        this.playerControls();
        player1.selectClosestNode();
    }

    //prueba color
    handleZoneOverlap(player, zone) {
        if (player === player1.phaserGO) {
            zone.setTint(0xFFA500); // Naranja para el jugador 1
        } else if (player === player2.phaserGO) {
            zone.setTint(0x800080); // Lila para el jugador 2
        }
    }
    
    playerControls() {
        // Movement Player 1 (wasd).
        if (keys.left.isDown) {
            player1.moveLeft();
        } else if (keys.right.isDown) {
            player1.moveRight();
        } else {
            player1.stopHorizontal();
        }

        if (keys.up.isDown) {
            player1.moveUp();
        } else if (keys.down.isDown) {
            player1.moveDown();
        } else {
            player1.stopVertical();
        }

        // Interaction Player 1.
        if(keys.interact.isDown){
            // Cooldown implementation.
            var time = new Date();
            var timeElapsed = (time.getSeconds() * 1000 + time.getMilliseconds()) - initTimeDraftPlayer1;
            //console.log(" te = " + timeElapsed + ", initTime = " + initTimeDraftPlayer1);

            if(timeElapsed >= DRAFTING_COOLDOWN){
                player1.draftSoldierFromSelectedNode();
                initTimeDraftPlayer1 = time.getSeconds() * 1000 + time.getMilliseconds();
                //console.log("Player1 soldiers: " + player1.soldiers);
            }
        }

        // Movement Player 2 (Arrows).
        if (cursors.left.isDown) {
            player2.moveLeft();
        } else if (cursors.right.isDown) {
            player2.moveRight();
        } else {
            player2.stopHorizontal();
        }

        if (cursors.up.isDown) {
            player2.moveUp();
        } else if (cursors.down.isDown) {
            player2.moveDown();
        } else {
            player2.stopVertical();
        }
    }

    generateMap(){
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

        //prueba zonas con overlap
        this.physics.add.overlap(player1.phaserGO, mapZones, this.handleZoneOverlap, null, this);
        this.physics.add.overlap(player2.phaserGO, mapZones, this.handleZoneOverlap, null, this);
    }
}
