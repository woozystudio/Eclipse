import { ApplicationCommandType, EmbedBuilder, PermissionFlagsBits, UserContextMenuCommandInteraction } from "discord.js";
import ContextMenu from "../../class/ContextMenu";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

export default class AvatarMenu extends ContextMenu {
    constructor(client: Eclipse) {
        super(client, {
            name: "Avatar",
            type: ApplicationCommandType.User,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            category: Category.Information,
            development: false
        });
    }

    async Execute(interaction: UserContextMenuCommandInteraction) {
        const target = interaction.targetUser;

        const AvatarEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setTitle(`${i18next.t('command.avatar.title', { lng: LocaleParam, username: target.username })}`)
        .setImage(`${target?.displayAvatarURL({ size: 4096 })}`)
        .setFooter({ text: `${i18next.t('command.avatar.requested', { lng: LocaleParam, username: interaction.user.username })}`, iconURL: interaction.user.displayAvatarURL() })

        await interaction.reply({ embeds: [AvatarEmbed] });
    }
}