import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, User, bold } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

export default class GitHub extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "github",
            description: "Visit the Eclispe repository on GitHub!",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const bot = this.client.user as User;

        const GitHubEmbed = new EmbedBuilder()
        .setThumbnail(bot?.displayAvatarURL({ size: 2048 }))
        .setAuthor({ iconURL: bot?.displayAvatarURL(), name: `${bot?.username} ${this.client.version.version}` })
        .setColor(0x2B2D31)
        .setTitle(`${i18next.t('command.github.title', { lng: LocaleParam })}`)
        .setDescription(`${i18next.t('command.github.description', { lng: LocaleParam })}`)

        const Buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
            .setLabel(`${i18next.t('command.github.button', { lng: LocaleParam })}`)
            .setStyle(ButtonStyle.Link)
            .setEmoji("<:GitHub:1246192509005332511>")
            .setURL("https://github.com/woozystudio/Eclipse")
        )

        await interaction.reply({ embeds: [GitHubEmbed], components: [Buttons], ephemeral: true });
    }
}