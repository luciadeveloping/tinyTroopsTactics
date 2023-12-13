/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// LOADS EVERY RESOURCE AND THEN CERTAIN SCENE ////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class Bootloader extends Phaser.Scene {
    constructor(){
        super({key: "Bootloader"});
    }

    preload(){

        // Starts startScene when everything is loaded
        this.load.on("complete", () => {
            this.scene.start("StartScene");
        })

        // Sounds
        this.load.audio('clickSound', 'audio/click.mp3');
        this.load.audio('mainMenuMusic', 'audio/mainMenuMusic.mp3');
        this.load.audio('secondaryMusic', 'audio/secondaryMusic.wav');
        this.load.audio('gameplayMusic', 'audio/gameplayMusic.mp3');
        //Victory sound
        //Loss sound
        //Conquest sound (one for each player)

        // Buttons
        this.load.image('startLocked', 'assets/ui/startLocked.png');
        this.load.image('startDefault', 'assets/ui/startDefault.png');
        this.load.image('creditsDefault', 'assets/ui/creditsDefault.png');
        this.load.image('settingsDefault', 'assets/ui/settingsDefault.png');
        this.load.image('exitDefault', 'assets/ui/exitDefault.png');
        this.load.image('musicEnabledDefault', 'assets/ui/musicEnabledDefault.png');
        this.load.image('effectsEnabledDefault', 'assets/ui/effectsEnabledDefault.png');
        this.load.image('musicDisabledDefault', 'assets/ui/musicDisabledDefault.png');
        this.load.image('effectsDisabledDefault', 'assets/ui/effectsDisabledDefault.png');

        this.load.image('startHover', 'assets/ui/startHover.png');
        this.load.image('creditsHover', 'assets/ui/creditsHover.png');
        this.load.image('settingsHover', 'assets/ui/settingsHover.png');
        this.load.image('exitHover', 'assets/ui/exitHover.png');
        this.load.image('musicEnabledHover', 'assets/ui/musicEnabledHover.png');
        this.load.image('effectsEnabledHover', 'assets/ui/effectsEnabledHover.png');
        this.load.image('musicDisabledHover', 'assets/ui/musicDisabledHover.png');
        this.load.image('effectsDisabledHover', 'assets/ui/effectsDisabledHover.png');

        // StartScene
        this.load.image('mapStart', 'assets/map/mapa_1.png');
        this.load.image('title', 'assets/ui/title.png');
        this.load.image('player1', 'assets/player1.png');
        this.load.image('player2', 'assets/player2.png');
    
        // CredistScene
        this.load.image("logo", "./assets/misc/logo.png");
        this.load.image("creditsTitle", "./assets/ui/titleCredits.png");

        // SettingsScene
        this.load.image("settingsTitle", "./assets/ui/titleSettings.png")

        // GameScene
        this.load.image('map', 'assets/map/map_lvl1.png');
        for (let i = 0; i < 10; i++) 
            {this.load.image(`mapZone${i}`, `assets/map/mapZone${i}.png`);}
        this.load.image('node', 'assets/map/node.png');
        this.load.image('player1', 'assets/player1.png');
        this.load.image('player2', 'assets/player2.png');

        
        // Players Skins
        skinList = [
            new Skin('player1', 0x4E8FA8, 0x75D9FF, 0x3794B7),
            new Skin('player2', 0xA865A2, 0xFFB2F8, 0xCF41C2)
        ]

        p1Skin = skinList[0];
        p2Skin = skinList[1];

        function Skin(spriteTag, nodeColor, regionColor, selectionColor){
            this.spriteTag = spriteTag;
            this.nodeColor = nodeColor;
            this.regionColor = regionColor;
            this.selectionColor = selectionColor;
        }
    }
}