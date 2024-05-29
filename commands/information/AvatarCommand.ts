import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, User } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";

export default class Avatar extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "avatar",
            description: "Displays a user's profile picture.",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [
                {
                    name: "target",
                    description: "Select a user from the server to display their avatar.",
                    required: true,
                    type: ApplicationCommandOptionType.User
                }
            ],
            development: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('target') as User;

        const AvatarEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setTitle(`@${target?.username}'s avatar`)
        .setImage(`${target?.displayAvatarURL({ size: 4096 })}`)
        .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })

        await interaction.reply({ embeds: [AvatarEmbed] });
    }
}