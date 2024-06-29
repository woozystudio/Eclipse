import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, User, time } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

export default class BotInfo extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "botinfo",
            description: "Information about the bot.",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const bot = this.client.user as User;

        const BotInfoEmbed = new EmbedBuilder()
        .setThumbnail(bot?.displayAvatarURL({ size: 2048 }))
        .setAuthor({ iconURL: bot?.displayAvatarURL(), name: `${bot?.username}` })
        .setColor(0x2B2D31)
        .setTitle(`${bot.username}`)
        .setDescription(`${i18next.t('command.botinfo.title', { lng: LocaleParam })}`)
        .addFields(
            { name: `${i18next.t('command.common.name', { lng: LocaleParam })}`, value: `${bot.username}`, inline: true },
            { name: `User`, value: `${bot}`, inline: true },
            { name: `${i18next.t('command.botinfo.credits', { lng: LocaleParam })}`, value: `${i18next.t('command.botinfo.credits_details', { lng: LocaleParam })}`, inline: false },
            { name: `${i18next.t('command.botinfo.version', { lng: LocaleParam })}`, value: `${this.client.version.version}`, inline: true },
            { name: `${i18next.t('command.common.date_created', { lng: LocaleParam })}`, value: `${time(Math.floor(bot?.createdTimestamp / 1000))}`, inline: true },
        )

        await interaction.reply({ embeds: [BotInfoEmbed], ephemeral: true });
    }
}