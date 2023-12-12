///////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////
let nodeList;

const MAP_WIDTH = 1280;
const MAP_HEIGHT = 960;


//p1Skin = skinList[0];

const PLAYER_STARTING_SOLDIERS = 0;
const PLAYER_RANGE = 200;
const PLAYER_DRAFTING_RANGE = 30;
const SOLDIER_DISPLAY_VERTICAL_ANCHOR = -20

const SOLDIER_OBJECT_SPEED = 100;

const PLANE_SPEED = 100;
const BOMBARDMENT_DAMAGE = 15;
const PLANE_GENERATION_INTERVAL_MAX = 20000;
const PLANE_GENERATION_INTERVAL_MIN = 10000; // Minimum time for a plane to appear.

const NODE_STARTING_SOLDIERS = 5;
const SOLDIER_GENERATION_INTERVAL = 2000;// Milliseconds
const NODE_MAXIMUN_SOLDIER_CAPACITY = 30;


const DRAFTING_COOLDOWN = 500; // Milliseconds

const Faction = {
    Neutral: "Neutral",
    One: "One",
    Two: "Two"
}

const Movement = {
    None: "None",
    StopVertial: "Stopvertical",
    StopHorizontal: "StopHorizotal",
    Up: "Up",
    Down: "Down",
    Right: "Right",
    Left: "Left"
}

////////////////////////////////////////////////// CLASSES //////////////////////////////////////////////////
class SceneObject {
    // This class uses a global variable 'game' which is a Phaser object that needs to be initialize in the 'create' method !!!!!
    constructor(xPos, yPos, sprite) {
        this.phaserGO = game.physics.add.sprite(xPos, yPos, sprite); // Phaser Game Object.
        this.phaserGO.setScale(1.4);
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

    setTrayectory(destination, speed){
        var deltaX = destination.x - this.x;
        var deltaY = destination.y - this.y;
        var distanceToDestination = this.distanceTo(destination);

        var xSpeed = (speed * deltaX) / distanceToDestination;
        var ySpeed = (speed * deltaY) / distanceToDestination;
        // Set object in motion.
        this.phaserGO.setVelocityX(xSpeed);
        this.phaserGO.setVelocityY(ySpeed);
    }

    destroy(){
        this.phaserGO.destroy();
        delete this;
    }
}

class Player extends SceneObject {
    constructor(xPos, yPos, sprite, faction, soldierAsset) {
        super(xPos, yPos, sprite);
        this.phaserGO.setDepth(1);

        this.faction = faction;
        this.soldiers = PLAYER_STARTING_SOLDIERS;
        this.soldiersDisplay = game.add.text(xPos, yPos+30, '0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });;
        this.updateSoldiersDisplay();
        this.range = PLAYER_RANGE;
        this.draftingRange = PLAYER_DRAFTING_RANGE;
        this.nodesInRange = new Array();
        this.selectedNode = undefined;
        this.initTimeDraft = 0;

        this.soldierAsset = soldierAsset;
    }

    // Movement:
    move(movement){
        switch(movement){
            case Movement.Up:
                this.phaserGO.setVelocityY(-PLAYER_SPEED);
                break;
            case Movement.Down:
                this.phaserGO.setVelocityY(PLAYER_SPEED);
                break;
            case Movement.Right:
                this.phaserGO.setVelocityX(PLAYER_SPEED);
                break;
            case Movement.Left:
                this.phaserGO.setVelocityX(-PLAYER_SPEED);
                break;
            case Movement.None:
                this.phaserGO.setVelocityX(0);
                this.phaserGO.setVelocityY(0);
                break;
            case Movement.StopHorizontal:
                this.phaserGO.setVelocityX(0);
                break;
            case Movement.StopVertial:
                this.phaserGO.setVelocityY(0);
                break;
            default:
                console.log("No movement valid parameter.");
                break;
        }

        this.updateSoldiersDisplayPosition();
        this.selectClosestNode(); // Each time player changes position check for the closest node to select.
    }

    createSoldier(destination) {
        new Soldier(this.x, this.y, this.faction, destination, this.soldierAsset);
    }

    updateSoldiersDisplayPosition(){
        this.soldiersDisplay.x = this.phaserGO.x;
        this.soldiersDisplay.y = this.phaserGO.y - SOLDIER_DISPLAY_VERTICAL_ANCHOR;
    }
    updateSoldiersDisplay(){
        this.soldiersDisplay.setText(this.soldiers);
    }    

    //Mechaics:
    addSoldiers(nSoldiers){ // Can also be used to substract soldiers.
        if((this.soldiers + nSoldiers) < 0 ){ // Can't go negative.
            this.soldiers = 0;
        }else{
            this.soldiers = this.soldiers + nSoldiers;
        }
        this.updateSoldiersDisplay();
    }

    // Node selection:
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
                this.selectedNode.unselect(this.faction);
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
            if(this.selectedNode != closestNode) this.selectedNode.unselect(this.faction); // ...and its no longer the closest one, unselect the previous one.
        }
        
        // Select the closest node.
        closestNode.select(this.faction); 
        this.selectedNode = closestNode;
    }

    isInRange(sceneObject) { // Checks if a given Scene Object is in range.
        return this.distanceTo(sceneObject) <= this.range;
    }
    isInDraftingRange(sceneObject){
        return this.distanceTo(sceneObject) <= this.draftingRange;
    }

    // Node interaction:
    interact(){ // Tries to interact with the scene selected object, cooldown is applied.

        // Cooldown implementation.
        var time = new Date();
        var timeElapsed = (time.getMinutes() * 60000 + time.getSeconds() * 1000 + time.getMilliseconds()) - this.initTimeDraft;
        //console.log(" te = " + timeElapsed + ", initTime = " + this.initTimeDraft + " interacting:");

        if(timeElapsed >= DRAFTING_COOLDOWN){
            this.interactWithSelectedNode();
            this.initTimeDraft = time.getMinutes() * 60000 + time.getSeconds() * 1000 + time.getMilliseconds();
        }

        
    }

    interactWithSelectedNode(){
        if(this.selectedNode == undefined) { return false; }
        
        if(this.isInDraftingRange(this.selectedNode)){
            this.draftSoldierFromSelectedNode();
        }else{
            this.sendSoldierToSelectedNode();
        }
        return true;
    }

    draftSoldierFromSelectedNode(){
        if(this.selectedNode != undefined){ // If a node is selected.

            if(this.selectedNode.draftSoldier()){ // If there are enough soldiers in selected node draft them.
                //console.log("Drafting...");
                this.addSoldiers(1);
            }
            return true;
        }
        return false;
    }

    sendSoldierToSelectedNode() {
        if (this.selectedNode == undefined) {
            return false;
        }

        if (this.soldiers > 0) {
            this.createSoldier(this.selectedNode);
            this.addSoldiers(-1);
        }
    }
}

class Node extends SceneObject {
    constructor(xPos, yPos, zoneKey, faction) { // faction is optional.
        super(xPos, yPos, 'node');
        // Create the region
        this.region = new SceneObject(xPos, yPos, zoneKey);
        
        this.phaserGO.setDepth(1);
        this.soldiers = NODE_STARTING_SOLDIERS;
        this.soldiersDisplay = game.add.text(xPos - 7, yPos + 30, '0', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        this.updateSoldiersDisplay();
        this.faction = Faction.Neutral;
        this.soldiersGenerationTimer;

        if(faction != undefined) { this.setFaction(faction); }
        

        // Booleans to know if the player has already selected this node.
        this.smallRadius1 =false ; 
        this.smallRadius2 =false;
        this.bigRadius1 = false;
        this.bigRadius2 = false;


        // Graphics obsjects for circumferences.
        this.circumferencePlayer1 = game.add.graphics();
        this.circumferencePlayer2 = game.add.graphics();

    }

    updateSoldiersDisplay(){
        this.soldiersDisplay.setText(this.soldiers);
    } 
    equalsPhaserGO(phaserGO){
        return this.phaserGO == phaserGO;
    } 

    // Node selection:
    select(faction){
        const smallRadius = 15;
        const bigRadius = 20;

        switch (faction) {
            case Faction.One: //player1 select a node
                if(this.smallRadius2){ // if the player2 has already selected a node (smallRadius2) --> player1 bigRadius1
                    this.drawCircumference(this.circumferencePlayer1, p1Skin.regionColor, bigRadius);
                    this.bigRadius1 = true;
                }else if(!this.bigRadius1 ){ // if theres no node selected yet (no bigRadius1, no smallRadius2..) --> player1 select it (smallRadius1)
                    this.drawCircumference(this.circumferencePlayer1, p1Skin.regionColor, smallRadius);
                    this.smallRadius1 = true;
                }
            break;
            
            case Faction.Two: //player2 select a node
                if(this.smallRadius1){ // if the player1 has already selected a node (smallRadius1) --> player2 bigRadius2
                    this.drawCircumference(this.circumferencePlayer2, p2Skin.regionColor, bigRadius);
                    this.bigRadius2 = true;
                }else if(!this.bigRadius2){ // if theres no node selected yet (no bigRadius2, no smallRadius1..) --> player2 select it (smallRadius2)
                    this.drawCircumference(this.circumferencePlayer2, p2Skin.regionColor, smallRadius);
                    this.smallRadius2 = true;
                }
            break;
        }
    }   


    unselect(faction){
        const smallRadius = 15;

        switch (faction) {
            case Faction.One: // player1 unselect a node
                if(this.bigRadius2){ // if the player2 still selecting it (bigRadius2) --> player1 clear all --> draw player2 smallRadius2 
                    this.circumferencePlayer1.clear();
                    this.smallRadius1=false;
                    this.bigRadius1=false;

                    this.circumferencePlayer2.clear();
                    this.bigRadius2=false;

                    this.drawCircumference(this.circumferencePlayer2, p2Skin.regionColor, smallRadius);
                    this.smallRadius2=true;
                }else{ // else just clear all
                    this.circumferencePlayer1.clear();
                    this.smallRadius1=false;
                    this.bigRadius1=false;
                }
           break;
            case Faction.Two:// player2 unselect a node
                if(this.bigRadius1){ // if the player1 still selecting it (bigRadius1) --> player2 clear all --> draw player1 smallRadius1 
                    this.circumferencePlayer2.clear();
                    this.smallRadius2=false;
                    this.bigRadius2=false;

                    this.circumferencePlayer1.clear();
                    this.bigRadius1=false;

                    this.drawCircumference(this.circumferencePlayer1, p1Skin.regionColor, smallRadius);
                    this.smallRadius1=true;

                }else{// else just clear all
                    this.circumferencePlayer2.clear();
                    this.smallRadius2=false;
                    this.bigRadius2=false;
                }
           break;
        }
    }
   
    drawCircumference(graphics, color, radius) {
        graphics.lineStyle(2, color, 1);
        graphics.strokeCircle(this.x, this.y, radius);
    }

    // Mechanics:
    startSoldierGeneration(){
        this.soldiersGenerationTimer = setInterval(this.addSoldiers.bind(this), SOLDIER_GENERATION_INTERVAL, 1);
    }
    stopSoldierGeneratio(){
        clearInterval(this.soldiersGenerationTimer);
    }

    // Interaction:
    addSoldiers(nSoldiers){
        if((this.soldiers + nSoldiers) < 0 ){ // Can't go negative.
            this.soldiers = 0;
        }else if((this.soldiers + nSoldiers) > NODE_MAXIMUN_SOLDIER_CAPACITY){ // Can't go above maximun.
            this.soldiers = NODE_MAXIMUN_SOLDIER_CAPACITY;
        }else{
            this.soldiers = this.soldiers + nSoldiers;
        }
        this.updateSoldiersDisplay();
    }

    takeDamage(damage, faction){
        if(this.soldiers > 0){
            this.addSoldiers(-damage);
            if(this.soldiers == 0){ // Turn neutral if soldiers reach 0.
                this.setFaction(Faction.Neutral);
            }

        }else{
            this.addSoldiers(+damage);
            this.setFaction(faction);
        }
        
    }

    getBombed(){ // Gets bombed by a plane.

        this.addSoldiers(-BOMBARDMENT_DAMAGE);

        if(this.soldiers == 0){ // Turn neutral if soldiers reach 0.
            this.setFaction(Faction.Neutral);
        }
    }

    draftSoldier(){
        if(this.soldiers > 0){
            this.addSoldiers(-1);
            return true;
        }
        console.log("This node is empty!");
        return false;
    }

    setFaction(faction){
        switch(faction){
            case Faction.Neutral:
                this.region.phaserGO.clearTint(); // Clear tint
                this.stopSoldierGeneratio()
                break;
            case Faction.One:
                this.region.phaserGO.setTint(p1Skin.regionColor); // Orange tint for player 1
                this.startSoldierGeneration();
                break;
            case Faction.Two:
                this.region.phaserGO.setTint(p2Skin.regionColor); // Purple tint for player 2
                this.startSoldierGeneration();
                break;
            default:
                break;
        }
        this.faction = faction;
    }

}

class Soldier extends SceneObject{
    constructor(xPos, yPos, faction, destination, playerAsset){
        super(xPos, yPos,  playerAsset);
        this.faction = faction;

        this.setUpTint();
        this.setUpCollisions();

        // smaller scale for soldiers
        this.phaserGO.setScale(0.5);

        this.setTrayectory(destination, SOLDIER_OBJECT_SPEED);

    }

    // Initialization.
    setUpTint(){
        switch(this.faction){
            case Faction.One:

                break;
            case Faction.Two:

                break;
            default:
                break;
        }
    }

    setUpCollisions(){ // Assigns an overlap event for each node in nodeList.
        nodeList.forEach(node => {
            game.physics.add.overlap(this.phaserGO, node.phaserGO, this.onOverlap, null, this);
        });
    }

    onOverlap(soldierGO, nodeGO){
        this.attackNode(this.searchNode(nodeGO)); // Since we only have the phaserGO we have to look for the corresponding node to call it's methods.
    }

    searchNode(phaserGO){ // Searchs for a node in nodeList with a matching phaserGO.
        var foundNode;
        nodeList.forEach(node => {
            if(node.equalsPhaserGO(phaserGO)){
                foundNode = node;
            }
        });
        if(foundNode == undefined){ console.log("No matching node was found."); }
        return foundNode;
    }

    // Gameplay.
    attackNode(node){
        if(this.faction == node.faction){
            node.addSoldiers(1);
        }else{
            node.takeDamage(1, this.faction);
        }
        this.destroy();
    }

}

class Plane extends SceneObject{
    constructor(xPos, yPos){
        super(xPos, yPos, 'node');
        this.phaserGO.setDepth(3);
        this.phaserGO.setCollideWorldBounds(false);

        this.hasBombed = false;
        this.targetNode = this.chooseTarget();
        this.setTrayectory(this.targetNode, PLANE_SPEED);

        game.physics.add.overlap(this.phaserGO, this.targetNode.phaserGO, this.onOverlap, null, this); // Add overlap event.

        setTimeout(this.destroy.bind(this), 30000); // Destroy itself after a certain ammount of time.
    }

    chooseTarget(){ // Randomly chooses a node to target.
        if(nodeList.length == 0){
            console.log("Plane couldn't choose target.");
            return undefined;
        }
        return nodeList[this.getRandomInt(nodeList.length)]; // Chooses a random node from nodelist
    }

    onOverlap(planeGO, nodeGO){
        if(!this.hasBombed){
            this.targetNode.getBombed();
        }
    }

    getRandomInt(max) { // credits: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * max);
    }
    
}

///////////////////////////////////////////////// GAME /////////////////////////////////////////////////

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        //Map.
        this.load.image('map', 'assets/map/map_lvl1.png');
        for (let i = 0; i < 10; i++) {
            this.load.image(`mapZone${i}`, `assets/map/mapZone${i}.png`);
        }

    }

    create() {
        game = this; // Store "game" object for SceneObject class.

        // Map.
        map = this.add.image(600+40, 300+100, 'map');
        map.setScale(1.4);


        // Players.
        player1 = new Player(100, 500, p1Skin.spriteTag , Faction.One, 'player1');
        player2 = new Player(200, 500, p2Skin.spriteTag, Faction.Two, 'player2');

        nodeList = [
            new Node(456, 138, 'mapZone0', Faction.One),
            new Node(628, 108,  'mapZone1'),
            new Node(744, 164, 'mapZone2'),
            new Node(746, 260, 'mapZone3'),
            new Node(618, 390, 'mapZone4'),
            new Node(816, 377, 'mapZone5'),
            new Node(643, 556, 'mapZone6'),
            new Node(797, 542, 'mapZone7'),
            new Node(751, 634, 'mapZone8'),
            new Node(767, 735, 'mapZone9', Faction.Two),
        ]

        p1Ctrls = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'interact': Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        p2Ctrls = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'interact': Phaser.Input.Keyboard.KeyCodes.ENTER
        });

        setTimeout(this.generatePlane.bind(this), PLANE_GENERATION_INTERVAL_MIN + this.getRandomInt(PLANE_GENERATION_INTERVAL_MAX));

    }

    update() {
        this.playerControls();
    }
    

    playerControls() {

        // Movement Player 1 (wasd).
        if (p1Ctrls.left.isDown) { // Horizontal movement.
            player1.move(Movement.Left);
        } else if (p1Ctrls.right.isDown) {
            player1.move(Movement.Right);
        } else {
            player1.move(Movement.StopHorizontal);
        }

        if (p1Ctrls.up.isDown) { // Vertical movement.
            player1.move(Movement.Up);
        } else if (p1Ctrls.down.isDown) {
            player1.move(Movement.Down);
        } else {
            player1.move(Movement.StopVertial);
        }

        // Interaction Player 1.
        if(p1Ctrls.interact.isDown){
            player1.interact();
        }

        // Movement Player 2 (Arrows).
        if (p2Ctrls.left.isDown) { // Horizontal movement.
            player2.move(Movement.Left);
        } else if (p2Ctrls.right.isDown) {
            player2.move(Movement.Right);
        } else {
            player2.move(Movement.StopHorizontal);
        }

        if (p2Ctrls.up.isDown) { // Vertical movement.
            player2.move(Movement.Up);
        } else if (p2Ctrls.down.isDown) {
            player2.move(Movement.Down);
        } else {
            player2.move(Movement.StopVertial);
        }

        //Interaction Player 2.
        if(p2Ctrls.interact.isDown){
            player2.interact();
        }
    }

    generatePlane(){
        // Generate a random position at the top or bottom of the map.
        var targetX = 0;
        var targetY = 0;
        switch(this.getRandomInt(2)){
            case 0: // Launch plane from the top of the screen.
                targetY = 0 - 5;
                break;
            case 1: // Launch plane from the bottom of the screen.
                targetY = gameConfig.height + 5;
                break;
        }
        targetX = this.getRandomInt(gameConfig.width);

        new Plane(targetX, targetY);

        setTimeout(this.generatePlane.bind(this), PLANE_GENERATION_INTERVAL_MIN + this.getRandomInt(PLANE_GENERATION_INTERVAL_MAX));
    }

    getRandomInt(max) { // credits: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * max);
    }
}