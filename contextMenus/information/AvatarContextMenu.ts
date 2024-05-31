import { ApplicationCommandType, EmbedBuilder, PermissionFlagsBits, UserContextMenuCommandInteraction } from "discord.js";
import ContextMenu from "../../class/ContextMenu";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";

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
        .setTitle(`@${target?.username}'s avatar`)
        .setImage(`${target?.displayAvatarURL({ size: 4096 })}`)
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })

        await interaction.reply({ embeds: [AvatarEmbed] });
    }
}