///////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////
let nodeList; //Array of regions
let tutorialSeen = false;

const PLAYER_STARTING_SOLDIERS = 5;
const PLAYER_RANGE = 200;
const PLAYER_DRAFTING_RANGE = 30;
const SOLDIER_DISPLAY_VERTICAL_ANCHOR = -20

const SOLDIER_OBJECT_SPEED = 100;

const PLANE_SPEED = 100;
const BOMBARDMENT_DAMAGE = 5;
const INITIAL_PLANE_GENERATION_DELAY = 10000; // Starting delay until planes start appearing;
const PLANE_GENERATION_INTERVAL_MAX = 20000;
const PLANE_GENERATION_INTERVAL_MIN = 10000; // Minimum time for a plane to appear.

const NODE_STARTING_SOLDIERS = 10;
const SOLDIER_GENERATION_INTERVAL = 2000;// Milliseconds
const NODE_MAXIMUN_SOLDIER_CAPACITY = 30;

const PLAYER_INTERACTION_COOLDOWN = 200; // Milliseconds

var planeGeneratorTimer;

var synchronizationTimer;
const SYNCRHONIZE_GAME_STATE_RATE = 10000;

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
    set x(newX){
        this.phaserGO.x = newX;
    }
    set y(newY){
        this.phaserGO.y = newY;
    }

    getBounds(){
        return this.phaserGO.getBounds();
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

    setOrientationTo(target){
        // var angle = Phaser.Math.Angle.Between(this.phaserGO.x, this.phaserGO.y, target.x, target.y);
        // var angleInDegrees = Phaser.Math.RadToDeg(angle);
        // this.phaserGO.setAngle(angleInDegrees);

        var dx = target.x - this.x;
        var dy = target.y - this.y;

        // Calcular el ángulo de rotación en radianes
        var angle = Math.atan2(dy, dx);

        // Convertir el ángulo a grados y aplicar la rotación al objeto
        var degrees = angle * (180 / Math.PI);
        this.phaserGO.setAngle(degrees)
    }

    destroy(){
        this.phaserGO.destroy();
        delete this;
    }
}

class Player extends SceneObject {
    constructor(xPos, yPos, sprite, faction) {
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

        this.soldierAsset = sprite;
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
        this.updatePlayer();

    }

    updatePlayer(){
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

    //Mechanics:
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

    countRegions(){ // Returns the number of regions this player has.
        var numRegions = 0;
        nodeList.forEach(node => {
            if(node.faction == this.faction){
                numRegions++;
            }
        });
        return numRegions;
    }

    // Node interaction:
    interact(){ // Tries to interact with the scene selected object, cooldown is applied.

        // Cooldown implementation.
        var time = new Date();
        var timeElapsed = (time.getMinutes() * 60000 + time.getSeconds() * 1000 + time.getMilliseconds()) - this.initTimeDraft;
        //console.log(" te = " + timeElapsed + ", initTime = " + this.initTimeDraft + " interacting:");

        if(timeElapsed >= PLAYER_INTERACTION_COOLDOWN){
            this.interactWithSelectedNode();
            this.initTimeDraft = time.getMinutes() * 60000 + time.getSeconds() * 1000 + time.getMilliseconds();
        }
    }

    interactWithSelectedNode(){
        if(this.selectedNode == undefined) { return false; }
        
        if(this.isInDraftingRange(this.selectedNode) && this.selectedNode.faction == this.faction){
            this.draftSoldierFromSelectedNode();
        }else{
            this.sendSoldierToSelectedNode();
        }
        return true;
    }

    draftSoldierFromSelectedNode(){
        if(this.selectedNode != undefined){ // If a node is selected.

            if(this.selectedNode.draftSoldier()){ // If there are enough soldiers in selected node draft them.
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


        // Graphics objects for circumferences.
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
        const bigRadius = 23;

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
        graphics.lineStyle(8, color, 1);
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

        console.log()
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
                this.phaserGO.clearTint();
                this.stopSoldierGeneratio()
                break;
            case Faction.One:
                this.region.phaserGO.setTint(p1Skin.regionColor); // Orange tint for player 1
                this.phaserGO.setTint(p1Skin.nodeColor);
                this.startSoldierGeneration();
                break;
            case Faction.Two:
                this.region.phaserGO.setTint(p2Skin.regionColor); // Purple tint for player 2
                this.phaserGO.setTint(p2Skin.nodeColor);
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

        // initialize dropSound
        this.dropSound = game.sound.add('dropSound');

        //this.setUpTint();
        this.setUpAppearance();
        this.setUpCollisions();

        // smaller scale for soldiers
        this.phaserGO.setScale(0.5);

        this.setTrayectory(destination, SOLDIER_OBJECT_SPEED);
        this.setOrientationTo(destination);
    }

    // Initialization.
    /*setUpTint(){
        switch(this.faction){
            case Faction.One:

                break;
            case Faction.Two:

                break;
            default:
                break;
        }
    }*/
    setUpAppearance() {
        switch (this.faction) {
            case Faction.One:
                this.phaserGO.setTint(p1Skin.nodeColor);
                break;
            case Faction.Two:
                this.phaserGO.setTint(p2Skin.nodeColor);
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
            if (effectsEnabled){
                this.dropSound.play();
            }
        }else{
            node.takeDamage(1, this.faction);
            if (effectsEnabled){
                this.dropSound.play();
            }
        }
        this.destroy();
    }

}

class Plane extends SceneObject{
    constructor(xPos, yPos){
        super(xPos, yPos, 'node');
        this.phaserGO.setDepth(3);
        this.phaserGO.setCollideWorldBounds(false);
        this.phaserGO.setScale(0.7);

        this.hasBombed = false;
        this.targetNode = this.chooseTarget();
        this.setTrayectory(this.targetNode, PLANE_SPEED);
        this.setOrientationTo(this.targetNode);

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////// GAME ////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        currentScene = this;
        game = this; // Store "game" object for SceneObject class.

    // SOUNDS
        this.music = this.sound.add('gameplayMusic', musicConfig);
        this.clickSound = this.sound.add('clickSound');

        if (musicEnabled){
            this.music.play();
        }

    // IMAGES
        this.grid = this.add.image(centerX, centerY, 'grid');

        map = this.add.image(600+40, 300+100, 'map');
        map.setScale(1.4);

    // BUTTONS
        // Exit
        this.exitButton = this.add.image(100, 100, 'exitDefault');

    // PLAYERS CREATION
        player1 = new Player(350, 250, p1Skin.spriteTag , Faction.One, 'player1');
        player2 = new Player(700, 850, p2Skin.spriteTag, Faction.Two, 'player2');

        //Array of regions
        nodeList = [
            new Node(456, 138, 'mapZone0', Faction.One),
            new Node(628, 108, 'mapZone1'),
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

        // To avoid player 1 automatic movement after returning to this scene 
        //(because it uses WASD)
        this.p1ctrlsReset();

        /*
        planeGeneratorTimer = setTimeout( // Start plane generation.
            this.generatePlane.bind(this), 
            INITIAL_PLANE_GENERATION_DELAY + PLANE_GENERATION_INTERVAL_MIN + this.getRandomInt(PLANE_GENERATION_INTERVAL_MAX));
        */
    
        if(!tutorialSeen){
            this.tutorial = this.add.image(centerX, centerY, 'tutorial');
            this.tutorial.setDepth(5);

            this.input.keyboard.on('keydown', () => { 

                tutorialSeen = true;
                this.tutorial.setVisible(false);
            });
        }

        if(assignedPlayer == 1){
            synchronizationTimer = setInterval(this.sendGameState, SYNCRHONIZE_GAME_STATE_RATE);
        }

        
    }

    update() {

        if(assignedPlayer == 1){
            this.movementHandler(player1, player2);
            handleButtonInteraction(this.exitButton, 'StartScene', player1, player2);
        }else if( assignedPlayer == 2){
            this.movementHandler(player2, player1);
            handleButtonInteraction(this.exitButton, 'StartScene', player2, player1);
        }

        if(assignedPlayer == 2){
            this.checkForGameStateUpdate();
        }

        this.checkWinner();

    
        /*
        this.handlePlayerControls(player1, p1Ctrls);
        this.handlePlayerControls(player2, p2Ctrls);

        

        this.handleButtonInteraction(this.exitButton, 'StartScene', p1Ctrls.interact);
        this.handleButtonInteraction(this.exitButton, 'StartScene', p2Ctrls.interact);
        */

    }

    shutdown(){
        this.music.stop();
        clearInterval(planeGeneratorTimer);
        clearInterval(synchronizationTimer);
    }

    movementHandler(thisPlayer, otherPlayer){
        this.handlePlayerMovement(thisPlayer, p1Ctrls);
        updateInfoToWS(thisPlayer, p1Ctrls);

        updateOtherPlayerPos(otherPlayer, otherInfo[0], otherInfo[1]);
        this.handleOtherPlayerMovement(otherPlayer);
        //console.log("Other player info = " + otherInfo);
        
    }

    
    seeTutorial(){
        this.input.keyboard.on('keydown', () => { 

            tutorialSeen =! tutorialSeen

            this.tutorial.setVisible(false);
        });
    }

    handleOtherPlayerMovement(otherPlayer){
        otherPlayer.updatePlayer();
        if(otherInfo[2] == 1){
            otherPlayer.interact();
        }
    }

    handlePlayerMovement(player, playerControls){
        if (playerControls.left.isDown) { // Horizontal movement.
            player.move(Movement.Left);
        } else if (playerControls.right.isDown) {
            player.move(Movement.Right);
        } else {
            player.move(Movement.StopHorizontal);
        }

        if (playerControls.up.isDown) { // Vertical movement.
            player.move(Movement.Up);
        } else if (playerControls.down.isDown) {
            player.move(Movement.Down);
        } else {
            player.move(Movement.StopVertial);
        }

        if(playerControls.interact.isDown){
            player.interact();
        }
    }

    checkWinner(){

        let p1Regions = player1.countRegions();
        let p2Regions = player2.countRegions();

        //console.log("Total regions:" +totalRegions+ ", player1 has " +p1Regions+ ", player2 has " +p2Regions);
        if(p1Regions == 0 && p2Regions == 0){ // Player 1 wins.
            this.endGameScene('none');
        }else if(p1Regions == 0){ // Player 2 wins.
            this.endGameScene('player2')
        }else if(p2Regions == 0){ // Tie.
            this.endGameScene('player1')
        }
    }

    endGameScene(result){
        winner = result;

        this.shutdown();
        this.scene.start('FinalScene');
    }

    handleButtonInteraction(button, targetScene, thisPlayer, otherPlayer){
        var thisPlayerBounds = thisPlayer.getBounds();
        var otherPlayerBounds = otherPlayer.getBounds();
        var buttonBounds = button.getBounds();
    
        if(Phaser.Geom.Intersects.RectangleToRectangle(thisPlayerBounds, buttonBounds) || Phaser.Geom.Intersects.RectangleToRectangle(otherPlayerBounds, buttonBounds)){
            button.setTexture(`${button.texture.key.replace('Default', 'Hover')}`);
        }else {
            button.setTexture(button.texture.key.replace('Hover', 'Default'));
        }
    
        if( Phaser.Geom.Intersects.RectangleToRectangle(thisPlayerBounds, buttonBounds) && p1Ctrls.interact.isDown) {
            this.sceneChange(targetScene);
    
        } else if (Phaser.Geom.Intersects.RectangleToRectangle(otherPlayerBounds, buttonBounds) && otherInfo[2] == 1){
            this.sceneChange(targetScene);
        }
    }


    /*
    // Detects if player interacts with the button to start another scene
    handleButtonInteraction(button, targetScene, interactKey) {
        p1Bounds = player1.getBounds();
        p2Bounds = player2.getBounds();
        buttonBounds = button.getBounds();

        //If bounds of any player and the button intersect
        if (Phaser.Geom.Intersects.RectangleToRectangle(p1Bounds, buttonBounds) ||
            Phaser.Geom.Intersects.RectangleToRectangle(p2Bounds, buttonBounds)) {
            
            //Changes button texture to hover
            button.setTexture(`${button.texture.key.replace('Default', 'Hover')}`);
                
            //Changes scene if key down and plays sound
            if (interactKey.isDown) {
                //Check cooldown of player of this interact key
                if (interactKey = p1Ctrls.interact)
                {
                    //Cooldown time of player 1 passsed
                    if(checkCooldown(player1)){
                        this.sceneChange(targetScene);
                    }
                }else if (interactKey = p2Ctrls.interact)
                {
                    //Cooldown time of player 2 passed
                    if(checkCooldown(player2)){
                        this.sceneChange(targetScene);
                    }
                }
            }
        } else {
            //Maintains normal texture of button
            button.setTexture(button.texture.key.replace('Hover', 'Default'));
        }
    }*/

    // Starts another scene
    sceneChange(targetScene) {
        //Stops music
        this.music.stop();

        this.scene.start(targetScene);
    }

    // Resets controls of player 1
    p1ctrlsReset() {
        p1Ctrls.up.reset();
        p1Ctrls.down.reset();
        p1Ctrls.left.reset();
        p1Ctrls.right.reset();
        p1Ctrls.interact.reset();
    }

    sendGameState(){
        var gameState = [ // [p1solddier, p2soliders, node1soldiers, node2soliders...]
            player1.soldiers,
            player2.soldiers
        ]

        nodeList.forEach(node => {
            gameState.push(node.soldiers);
        });

        sendMessageToWS("GameState", gameState);
        console.log("Synchronizing game state...");
    }

    updateGameState(){
        player1.soldiers = gameState.shift();
        player2.soldiers = gameState.shift();

        for(var i = 0; i < gameState.length; i++){
            nodeList[i].soldiers = gameState[i];
            nodeList[i].updateSoldiersDisplay();
        }
        console.log("Game state recieved. Synchronizing game state...");
    }

    checkForGameStateUpdate(){
        if(gameStateDirty){
            this.updateGameState();
            gameStateDirty = false;
        }
    }

    //////////////////////////////////////////////////// PLANE ////////////////////////////////////////////////////
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

        planeGeneratorTimer = setTimeout(this.generatePlane.bind(this), PLANE_GENERATION_INTERVAL_MIN + this.getRandomInt(PLANE_GENERATION_INTERVAL_MAX));
    }

    getRandomInt(max) { // credits: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        return Math.floor(Math.random() * max);
    }
}