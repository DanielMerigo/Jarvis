const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Translate } = require('../../process_tools');

module.exports = {
  name: 'info',
    description:('Get information about Jarvis'),
    voiceChannel: false,
  async execute(interaction) {
    const uptime = process.uptime();
    const uptimeStr = `${Math.floor(uptime / 60)}m ${Math.floor(uptime % 60)}s`;

    const totalUsers = interaction.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

    const embed = new EmbedBuilder()
      .setColor('#00b0f4')
      .setTitle('🤖 Jarvis Bot Info')
      .setDescription(await Translate('This bot is maintained with ❤️ by Daniel Merigo.'))
      .addFields(
        { name: await Translate('🧠 Name'), value: interaction.client.user.username, inline: true },
        { name: await Translate('🆔 ID'), value: interaction.client.user.id, inline: true },
        { name: await Translate('⏱️ Uptime'), value: uptimeStr, inline: true },
        { name: await Translate('🖥️ Servers'), value: `${interaction.client.guilds.cache.size}`, inline: true },
        { name: await Translate('👥 Users (approx)'), value: `${totalUsers}`, inline: true },
        { name: await Translate('💾 Platform'), value: `${os.type()} ${os.arch()}`, inline: true },
        { name: await Translate('📦 Node.js'), value: process.version, inline: true }
      )
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setFooter({ text: await Translate('Built with 💙 by Jarvis'), iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
