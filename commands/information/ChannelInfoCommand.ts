import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, TextChannel, codeBlock, time } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

export default class ChannelInfo extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "channelinfo",
            description: "Displays information about a channel.",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [
                {
                    name: "channel",
                    description: "Select a channel from the server to display their information.",
                    required: true,
                    type: ApplicationCommandOptionType.Channel
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.options.getChannel('channel');
        const channels = await interaction.guild?.channels.fetch(channel?.id as string);
        
        let type;
        let topic = (channel as TextChannel).topic;

        switch (channel?.type) {
            case 0:
                type = `${i18next.t('command.common.channels.text', { lng: LocaleParam })}`
                break;
            case 2:
                type = `${i18next.t('command.common.channels.voice', { lng: LocaleParam })}`
                break;
            case 5:
                type = `${i18next.t('command.common.channels.announcement', { lng: LocaleParam })}`
                break;
            case 13:
                type = `${i18next.t('command.common.channels.stage', { lng: LocaleParam })}`
                break;
            case 15:
                type = `${i18next.t('command.common.channels.forum', { lng: LocaleParam })}`
                topic = `${i18next.t('command.channelinfo.errors.no_support', { lng: LocaleParam })}`
                break;
            case 16:
                type = `${i18next.t('command.common.channels.media', { lng: LocaleParam })}`
                topic = `${i18next.t('command.channelinfo.errors.no_support', { lng: LocaleParam })}`
                break;
            case 12:
                type = `${i18next.t('command.common.channels.private_thread', { lng: LocaleParam })}`
                break;
            case 11:
                type = `${i18next.t('command.common.channels.public_thread', { lng: LocaleParam })}`
                break;
        }

        const ChannelInfoEmbed = new EmbedBuilder()
        .setTitle(`${i18next.t('command.channelinfo.title', { lng: LocaleParam })}`)
        .setColor(0x2B2D31)
        .addFields(
            { name: `${i18next.t('command.common.name', { lng: LocaleParam })}`, value: `${codeBlock(`${channel?.name}`)}`, inline: true },
            { name: 'ID', value: `${codeBlock(`${channel?.id}`)}`, inline: true },
            { name: `${i18next.t('command.channelinfo.topic', { lng: LocaleParam })}`, value: `${codeBlock(`${topic || `${i18next.t('command.channelinfo.errors.no_topic', { lng: LocaleParam })}` }`)}`, inline: false },
            { name: `${i18next.t('command.common.type', { lng: LocaleParam })}`, value: `${codeBlock(`${type}`)}`, inline: true },
            { name: `${i18next.t('command.channelinfo.parent', { lng: LocaleParam })}`, value: `${codeBlock(`${channels?.parent?.name}`)}`, inline: true },
            { name: `${i18next.t('command.common.date_created', { lng: LocaleParam })}`, value: `${time(Math.floor(channels?.createdTimestamp as number / 1000))}`, inline: false },
        )

        await interaction.reply({ embeds: [ChannelInfoEmbed], ephemeral: true });
    }
}