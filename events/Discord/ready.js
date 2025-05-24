const { Translate } = require('../../process_tools');

module.exports = async (client) => {
    console.log(await Translate(`Logged to the client <${client.user.username}>.`));
    console.log(await Translate("Jarvis is ready to serve you! <🚀>"));
    
    client.user.setActivity(client.config.app.playing);
}