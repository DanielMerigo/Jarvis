# Jarvis BOT 🤖

To run this bot you will need a .env file, I have provided a .env.example

### ⚡ Configuration
```js
const process = require('process');
module.exports = {
    app: {
        token: process.env.DISCORD_TOKEN || 'xxx',
        playing: 'by Jarvis 🤖',
        global: true,
        guild: process.env.GUILD_ID || 'xxx',
        extraMessages: false,
        loopMessage: false,
        lang: 'en',
        enableEmojis: false,
    },

    emojis:{
        'back': '⏪',
        'skip': '⏩',
        'ResumePause': '⏯️',
        'savetrack': '💾',
        'volumeUp': '🔊',
        'volumeDown': '🔉',
        'loop': '🔁',
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        Translate_Timeout: 10000,
        maxVol: 100,
        spotifyBridge: true,
        volume: 75,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 30000,
        leaveOnEnd: true,
        leaveOnEndCooldown: 30000,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 29
            }
        }
    }
};
```

### 📑 Installation
To use the project correctly you will need some tools.

WARNING: You MUST use Node.js version `v18.20.2`, otherwise, you will encounter major compatibility issues.

[FFmpeg](https://www.ffmpeg.org) to process audio ( make sure to download the latest version availble )

[Node JS](https://nodejs.org/en/) (`v18.20.2`) for environment

Now in your terminal run the following commands assuming you are in the same directory as the project.

`npm install`

`node .` (or `node index.js`)

and Done, Jarvis in now ready to serve you!
