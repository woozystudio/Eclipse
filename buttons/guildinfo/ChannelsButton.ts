import { ButtonInteraction, CacheType, ChannelType, EmbedBuilder, Guild, PermissionFlagsBits } from "discord.js";
import Button from "../../class/Button";
import Eclipse from "../../class/Eclipse";
import { channel } from "diagnostics_channel";

export default class ChannelsButtonGuildInfoCommand extends Button {
    constructor(client: Eclipse) {
        super(client, {
            customId: "guildinfo-command-channels",
            userPermissions: PermissionFlagsBits.UseApplicationCommands
        })
    }
    
    async Execute(interaction: ButtonInteraction) {
        const guild = interaction.guild as Guild;

        const ChannelsEmbed = new EmbedBuilder()
        .setAuthor({ iconURL: `${interaction.guild?.iconURL()}`, name: `${interaction.guild?.name}` })
        .setThumbnail(interaction.guild?.iconURL({ size: 2048}) as string)
        .setTitle(`Channels (${guild.channels.cache.size})`)
        .setColor(0x2B2D31)
        .addFields(
            { name: `Announcement Threads`, value: `\`\`\`${guild.channels.cache.filter(channel => channel.type === ChannelType.AnnouncementThread).size}\`\`\``, inline: false },
            { name: `Announcements`, value: `\`\`\`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildAnnouncement).size}\`\`\``, inline: true },
            { name: `Categories`, value: `\`\`\`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size}\`\`\``, inline: true },
            { name: `Forum`, value: `\`\`\`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size}\`\`\``, inline: true },
            { name: `Media`, value: `\`\`\`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildMedia).size}\`\`\``, inline: true },
            { name: `Stage`, value: `\`\`\`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildStageVoice).size}\`\`\``, inline: true },
            { name: `Text`, value: `\`\`\`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}\`\`\``, inline: true },
            { name: `Voice`, value: `\`\`\`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}\`\`\``, inline: true },
            { name: `Private Threads`, value: `\`\`\`${guild.channels.cache.filter(channel => channel.type === ChannelType.PrivateThread).size}\`\`\``, inline: true },
            { name: `Public Threads`, value: `\`\`\`${guild.channels.cache.filter(channel => channel.type === ChannelType.PublicThread).size}\`\`\``, inline: true },
        )

        await interaction.reply({ embeds: [ChannelsEmbed], ephemeral: true });
    }
}