const { readdirSync, statSync } = require("fs");
const path = require("path");
const { Collection } = require("discord.js");
const { useMainPlayer } = require("discord-player");

client.commands = new Collection();
const commandsArray = [];
const player = useMainPlayer();

const { Translate, GetTranslationModule } = require("./process_tools");

const discordEvents = readdirSync("./events/Discord/").filter((file) =>
  file.endsWith(".js")
);
const playerEvents = readdirSync("./events/Player/").filter((file) =>
  file.endsWith(".js")
);

GetTranslationModule().then(() => {
  console.log("| Translation Module Loaded |");

  for (const file of discordEvents) {
    const DiscordEvent = require(`./events/Discord/${file}`);
    const txtEvent = `< -> > [Loaded Discord Event] <${file.split(".")[0]}>`;
    parseLog(txtEvent);
    client.on(file.split(".")[0], DiscordEvent.bind(null, client));
    delete require.cache[require.resolve(`./events/Discord/${file}`)];
  }

  for (const file of playerEvents) {
    const PlayerEvent = require(`./events/Player/${file}`);
    const txtEvent = `< -> > [Loaded Player Event] <${file.split(".")[0]}>`;
    parseLog(txtEvent);
    player.events.on(file.split(".")[0], PlayerEvent.bind(null));
    delete require.cache[require.resolve(`./events/Player/${file}`)];
  }

  readdirSync("./commands").forEach((entry) => {
    const entryPath = `./commands/${entry}`;
    const fullPath = path.resolve(entryPath);
    const isDirectory = statSync(fullPath).isDirectory();

    if (isDirectory) {
      const commands = readdirSync(entryPath).filter(f => f.endsWith(".js"));
      for (const file of commands) {
        loadCommand(`${entryPath}/${file}`);
      }
    } else if (entry.endsWith(".js")) {
      loadCommand(entryPath);
    }
  });

  function loadCommand(filePath) {
    const command = require(filePath);
    if (command.name && command.description) {
      commandsArray.push(command);
      const txtEvent = `< -> > [Loaded Command] <${command.name.toLowerCase()}>`;
      parseLog(txtEvent);
      client.commands.set(command.name.toLowerCase(), command);
    } else {
      const txtEvent = `< -> > [Failed Command] <${filePath}>`;
      parseLog(txtEvent);
    }
    delete require.cache[require.resolve(filePath)];
  }

  client.on("ready", (client) => {
    if (client.config.app.global)
      client.application.commands.set(commandsArray);
    else
      client.guilds.cache
        .get(client.config.app.guild)
        .commands.set(commandsArray);
  });

  async function parseLog(txtEvent) {
    console.log(await Translate(txtEvent, null));
  }
});
