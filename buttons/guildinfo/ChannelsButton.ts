import { ButtonInteraction, ChannelType, EmbedBuilder, Guild, PermissionFlagsBits, codeBlock } from "discord.js";
import Button from "../../class/Button";
import Eclipse from "../../class/Eclipse";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

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
        .setTitle(`${i18next.t('command.common.channel', { lng: LocaleParam })} (${guild.channels.cache.size})`)
        .setColor(0x2B2D31)
        .addFields(
            { name: `${i18next.t('command.common.channels.announcement_thread', { lng: LocaleParam })}`, value: `${codeBlock(`${guild.channels.cache.filter(channel => channel.type === ChannelType.AnnouncementThread).size}`)}`, inline: false },
            { name: `${i18next.t('command.common.channels.announcement', { lng: LocaleParam })}`, value: `${codeBlock(`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildAnnouncement).size}`)}`, inline: true },
            { name: `${i18next.t('command.common.channels.category', { lng: LocaleParam })}`, value: `${codeBlock(`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size}`)}`, inline: true },
            { name: `${i18next.t('command.common.channels.forum', { lng: LocaleParam })}`, value: `${codeBlock(`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size}`)}`, inline: true },
            { name: `${i18next.t('command.common.channels.media', { lng: LocaleParam })}`, value: `${codeBlock(`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildMedia).size}`)}`, inline: true },
            { name: `${i18next.t('command.common.channels.stage', { lng: LocaleParam })}`, value: `${codeBlock(`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildStageVoice).size}`)}`, inline: true },
            { name: `${i18next.t('command.common.channels.text', { lng: LocaleParam })}`, value: `${codeBlock(`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}`)}`, inline: true },
            { name: `${i18next.t('command.common.channels.voice', { lng: LocaleParam })}`, value: `${codeBlock(`${guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}`)}`, inline: true },
            { name: `${i18next.t('command.common.channels.private_thread', { lng: LocaleParam })}`, value: `${codeBlock(`${guild.channels.cache.filter(channel => channel.type === ChannelType.PrivateThread).size}`)}`, inline: true },
            { name: `${i18next.t('command.common.channels.public_thread', { lng: LocaleParam })}`, value: `${codeBlock(`${guild.channels.cache.filter(channel => channel.type === ChannelType.PublicThread).size}`)}`, inline: true },
        )

        await interaction.reply({ embeds: [ChannelsEmbed], ephemeral: true });
    }
}