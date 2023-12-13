/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////// MAIN MENU /////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    create() {
    // SOUNDS
        this.music = this.sound.add('mainMenuMusic', musicConfig);
        this.clickSound = this.sound.add('clickSound');

        if (musicEnabled){
            this.music.play();
        }

    // IMAGES
        map = this.add.image(centerX, centerY+80, 'mapStart');
        map.setScale(1.4);

        this.title = this.add.image(centerX, 140, 'title');
        this.title.setScale(0.7);

    // BUTTONS
        // Start
        this.startButton = this.add.image(420, centerY+70, 'startDefault')

        // Starts locked
        this.startLocked1 = this.add.image(600, centerY-80, 'startLocked');
        this.startLocked1.setScale(0.8);
        this.startLocked2 = this.add.image(680, centerY+190, 'startLocked');
        this.startLocked2.setScale(0.8);

        //Settings
        this.settingsButton = this.add.image(gameConfig.width - 150, gameConfig.height - 150, 'settingsDefault')

        //Credits
        this.creditsButton = this.add.image(150, gameConfig.height - 150, 'creditsDefault')

        /*
        ///////////////////////////////////////////////////////////////////////////////////////////
        // INTERACTIVITY
        this.startButton.setInteractive();
        this.startButton.on('pointerover', () => this.startButton.setTexture(`${this.startButton.texture.key.replace('Default', 'Hover')}`));
        this.startButton.on('pointerout', () => this.startButton.setTexture(`${this.startButton.texture.key.replace('Hover', 'Default')}`));
        this.startButton.on('pointerdown', () => {
            //Play click sound
            if (effectsEnabled){
                this.clickSound.play();
            }

            //Stops music
            this.music.stop();

            this.scene.start('GameScene');
        });

        this.settingsButton.setInteractive();
        this.settingsButton.on('pointerover', () => this.settingsButton.setTexture(`${this.settingsButton.texture.key.replace('Default', 'Hover')}`));
        this.settingsButton.on('pointerout', () => this.settingsButton.setTexture(`${this.settingsButton.texture.key.replace('Hover', 'Default')}`));
        this.settingsButton.on('pointerdown', () => {
            //Play click sound
            if (effectsEnabled){
                this.clickSound.play();
            }

            //Stops music
            this.music.stop();

            this.scene.start('SetingsScene');
        });

        this.creditsButton.setInteractive();
        this.creditsButton.on('pointerover', () => this.creditsButton.setTexture(`${this.creditsButton.texture.key.replace('Default', 'Hover')}`));
        this.creditsButton.on('pointerout', () => this.creditsButton.setTexture(`${this.creditsButton.texture.key.replace('Hover', 'Default')}`));
        this.creditsButton.on('pointerdown', () => {
            //Play click sound
            if (effectsEnabled){
                this.clickSound.play();
            }

            //Stops music
            this.music.stop();

            this.scene.start('CreditsScene');
        });
        ///////////////////////////////////////////////////////////////////////////////////////////
        */

    // PLAYERS CREATION
        player1 = this.physics.add.image(centerX-50, centerY+20, 'wheel');//.setInteractive();
        player2 = this.physics.add.image(centerX+160, centerY+130, 'moon');//.setInteractive();

        // Collision with world bounds
        player1.setCollideWorldBounds(true);
        player2.setCollideWorldBounds(true);

    // CONTROLS OF PLAYERS
        // PLayer 1 is controlled with WASD and interacts with SPACE
        p1Ctrls = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'interact': Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        // Player 2 is controlled with arrow keys and interacts with ENTER
        p2Ctrls = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN,
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'interact': Phaser.Input.Keyboard.KeyCodes.ENTER
        });

        // To avoid player 1 automatic movement after returning to this scene 
        // (because it uses WASD)
        this.p1ctrlsReset();
    }

    update() {

        // Assigns p1ctrls as controls for player1
        this.handlePlayerMovement(player1, p1Ctrls);
        // Assigns p2ctrls as controls for player2
        this.handlePlayerMovement(player2, p2Ctrls);

        // Interaction with Start button
        this.handleButtonInteraction(this.startButton, 'GameScene', p1Ctrls.interact);
        this.handleButtonInteraction(this.startButton, 'GameScene', p2Ctrls.interact);

        //Interaction with Settings button
        this.handleButtonInteraction(this.settingsButton, 'SettingsScene', p1Ctrls.interact);
        this.handleButtonInteraction(this.settingsButton, 'SettingsScene', p2Ctrls.interact);

        //Interaction with Credits button
        this.handleButtonInteraction(this.creditsButton, 'CreditsScene', p1Ctrls.interact);
        this.handleButtonInteraction(this.creditsButton, 'CreditsScene', p2Ctrls.interact);
    }
    
    // Resets controls of player 1
    p1ctrlsReset() {
        p1Ctrls.up.reset();
        p1Ctrls.down.reset();
        p1Ctrls.left.reset();
        p1Ctrls.right.reset();
        p1Ctrls.interact.reset();
    }

    // Detects if key in input is pressed to move player
    handlePlayerMovement(player, input) {
        if (input.left.isDown) {
            player.setVelocityX(-PLAYER_SPEED);
        } else if (input.right.isDown) {
            player.setVelocityX(PLAYER_SPEED);
        } else {
            player.setVelocityX(0);
        }

        if (input.up.isDown) {
            player.setVelocityY(-PLAYER_SPEED);
        } else if (input.down.isDown) {
            player.setVelocityY(PLAYER_SPEED);
        } else {
            player.setVelocityY(0);
        }

    }

    
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
                //Play click sound
                if (effectsEnabled){
                    this.clickSound.play();
                }

                this.sceneChange(targetScene);
            }
        } else {
            //Maintains normal texture of button
            button.setTexture(button.texture.key.replace('Hover', 'Default'));
        }
    }

    // Starts another scene
    sceneChange(targetScene) {
        //Stops music
        this.music.stop();

        this.scene.start(targetScene);
    }

    getNextSkin(currentSkin){ // Given a certain skin return the nextSkin in skinList.
        if(skinList.length == 0){
            console.log("Skin list empty.");
            return false;
        }
        
        let currentSkinIndex = skinList.indexOf(currentSkin);

        if(currentSkin == skinList.length - 1){ // Last index.
            return skinList[0]; // Go back to the begining: Return first element.
        }else{
            return skinList[currentSkinIndex+1]; // Return next element.
        }
    }

    updateSkin(player, newSkin){ 
        
    }
}