import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, Role } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";

export default class RoleInfo extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "roleinfo",
            description: "Displays information about a role.",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [
                {
                    name: "role",
                    description: "Select a role from the server to display their information.",
                    required: true,
                    type: ApplicationCommandOptionType.Role
                }
            ],
            development: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const role = interaction.options.getRole('role') as Role;
        const roles = await interaction.guild?.roles.fetch(role?.id);
        const permissions = roles?.permissions.toArray().map((perm) => `\`${perm}\``);
        
        const RoleInfoEmbed = new EmbedBuilder()
        .setTitle("Role Information")
        .setColor(0x2B2D31)
        .addFields(
            { name: 'Name', value: `\`\`\`${role?.name}\`\`\``, inline: true },
            { name: 'ID', value: `\`\`\`${role?.id}\`\`\``, inline: true },
            { name: 'Color', value: `\`\`\`${roles?.hexColor}\`\`\``, inline: false },
            { name: 'Position', value: `\`\`\`${role?.position}\`\`\``, inline: false },
            { name: 'Permissions', value: `${permissions?.join(' ')}`, inline: false },
            { name: 'Date created', value: `<t:${Math.floor(roles?.createdTimestamp as number / 1000)}>`, inline: false },
        )

        await interaction.reply({ embeds: [RoleInfoEmbed] });
    }
}