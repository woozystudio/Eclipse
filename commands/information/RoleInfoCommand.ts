import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, Role, codeBlock, inlineCode, time } from "discord.js";
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
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const role = interaction.options.getRole('role') as Role;
        const roles = await interaction.guild?.roles.fetch(role?.id);
        const permissions = roles?.permissions.toArray().map((perm) => `${inlineCode(perm)}`);
        
        const RoleInfoEmbed = new EmbedBuilder()
        .setTitle("Role Information")
        .setColor(0x2B2D31)
        .addFields(
            { name: 'Name', value: `${codeBlock(`${role?.name}`)}`, inline: true },
            { name: 'Color', value: `${codeBlock(`${roles?.hexColor}`)}`, inline: true },
            { name: 'ID', value: `${codeBlock(`${role?.id}`)}`, inline: false },
            { name: 'Position', value: `${codeBlock(`${role?.position}`)}`, inline: false },
            { name: 'Permissions', value: `${permissions?.join(' ')}`, inline: false },
            { name: 'Date created', value: `${time(Math.floor(roles?.createdTimestamp as number / 1000))}`, inline: false },
        )

        await interaction.reply({ embeds: [RoleInfoEmbed], ephemeral: true });
    }
}