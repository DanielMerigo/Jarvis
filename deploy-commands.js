const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const commands = [];

const commandsPath = path.join(__dirname, 'commands/music');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
console.log(`🔍 Encontrados ${commandFiles.length} arquivos de comando.`);

for (const file of commandFiles) {
  const command = require(path.join(commandsPath, file));
  if (command.data || command.name) {
    commands.push(
      command.data?.toJSON?.() ??
      new SlashCommandBuilder().setName(command.name).setDescription(command.description).addStringOption(opt => opt.setName('song').setDescription('Song to play').setRequired(true)).toJSON()
    );
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('🔄 Starting to register commands...');
    await rest.put(
      // Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), // dev
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );
    console.log('✅ Comandos registrados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao registrar comandos:', error);
  }
})();
