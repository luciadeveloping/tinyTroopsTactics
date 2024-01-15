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
        this.load.audio('dropSound', 'audio/dropSound.mp3');

        // Background
        this.load.image('grid', 'assets/misc/grid.png');

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

        this.load.image('controlP1', 'assets/misc/controlP1.png');
        this.load.image('controlP2', 'assets/misc/controlP2.png');
    
        // CredistScene
        this.load.image("logo", "./assets/ui/logo.png");
        this.load.image("creditsTitle", "./assets/ui/titleCredits.png");
        this.load.image("creditsNames", "./assets/ui/creditsNames.png");

        // SettingsScene
        this.load.image("settingsTitle", "./assets/ui/titleSettings.png")

        // FinalScene
        this.load.image("gameOver", "./assets/misc/gameOver.png");
        this.load.image("winP1", "./assets/misc/winP1.png");
        this.load.image("winP2", "./assets/misc/winP2.png");

        // GameScene
        this.load.image('map', 'assets/map/map_lvl1.png');
        for (let i = 0; i < 10; i++) 
            {this.load.image(`mapZone${i}`, `assets/map/mapZone${i}.png`);}
        this.load.image('node', 'assets/map/node.png');
        this.load.image('plane', 'assets/misc/plane.png');
        this.load.image('tutorial', 'assets/misc/tutorial.png');

        // Skins
        this.load.image('pill', 'assets/skins/pill.png');
        this.load.image('star', 'assets/skins/star.png');
        this.load.image('moon', 'assets/skins/moon.png');
        this.load.image('cloud', 'assets/skins/cloud.png');
        this.load.image('wheel', 'assets/skins/wheel.png');
        this.load.image('square', 'assets/skins/square.png');
        this.load.image('flower', 'assets/skins/flower.png');
        
        // Players Skins
        skinList = [
            
            new Skin('pill', 0x710B0B, 0xF27070, 0xFF3737),
            new Skin('star', 0x20644B, 0x8AE5B4, 0x1DFF85),
            new Skin('moon', 0x6A3384, 0xC996FB, 0x9D3BFF),
            new Skin('cloud', 0x263A80, 0x8DA5F9, 0x373FFF),
            new Skin('wheel', 0x902B8C, 0xF18CE7, 0xFF24E9),
            new Skin('square', 0xC05B11, 0xEEB291, 0xFF6712),
            new Skin('flower', 0xBAA808, 0xFAF1A7, 0xFFEA2B)

        ]

        p1Skin = skinList[4];
        p2Skin = skinList[2];

        function Skin(spriteTag, nodeColor, regionColor, selectionColor){
            this.spriteTag = spriteTag;
            this.nodeColor = nodeColor;
            this.regionColor = regionColor;
            this.selectionColor = selectionColor;
        }

        // WebScoket Connection.
        connection = new WebSocket('ws://192.168.1.43:8080/app');
        
        assignedPlayer;

        // Websocket methods.
        connection.onopen = function(){
            console.log("Conection established.")
        }

        connection.onmessage = function(msg) {
            var message = JSON.parse(msg.data)
            
            switch(message.type){
                case "SessionId":
                    console.log("Id request succesful. My ID = " + message.content)    
                    assignedPlayer = parseInt(message.content);
                break;

                case "InputUpdate":
                    //console.log("Input received: " + message.content);
                    var inputInfo = JSON.parse(message.content);
                    otherInputInfo[0] = inputInfo[0];
                    otherInputInfo[1] = inputInfo[1];
                    otherInputInfo[2] = inputInfo[2];
                    break;

                case "Error":
                    console.log("An error has occurred, error: " + message.content);
                    break;

                default:
                    console.log("The type " + message.type + " is not valid.")
            }
            
            
        }

        /**
         * 
         * @param {String} type InputUpdate
         * @param {String} content 
         */
        function sendMessageToWS(type, content){
            var msg = {
                type : type,
                content : content
            }
            connection.send(JSON.stringify(msg)); // Convert yo JSON and send to WS.
        }
    }
}