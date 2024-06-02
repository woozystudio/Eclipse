import { ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember, PermissionFlagsBits, Role, User } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import SuccessEmbed from "../../embeds/SuccessEmbed";

export default class RemoveRole extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "removerole",
            description: "Remove a role to a user on the server.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.ManageRoles,
            options: [
                {
                    name: "role",
                    description: "Select the role you want to remove.",
                    required: true,
                    type: ApplicationCommandOptionType.Role
                },
                {
                    name: "target",
                    description: "Select the user you want to remove the role to.",
                    required: true,
                    type: ApplicationCommandOptionType.User
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('target') as User;
        const role = interaction.options.getRole('role') as Role;
        const member = await interaction.guild?.members.fetch(target.id) as GuildMember;
        const interactionMember = await interaction.guild?.members.fetch(interaction.user.id) as GuildMember;
        const botHighestRole = interaction.guild?.members.me?.roles.highest as Role;
        const targetHighestRole = member.roles.highest;
        const botPermissions = interaction.guild?.members.me?.permissions;
        const targetPermissions = member.permissions;
        const hasHigherPermissions = targetPermissions.has(PermissionFlagsBits.Administrator) || (botPermissions?.has(PermissionFlagsBits.Administrator) && targetPermissions.has(botPermissions.bitfield));

        if (!interactionMember?.permissions.has(new RemoveRole(this.client).default_member_permissions)) return await interaction.reply({ embeds: [new ErrorEmbed("You do not have permissions to execute this command.")], ephemeral: true });
        if (!member) return await interaction.reply({ embeds: [new ErrorEmbed("The user mentioned is no longer within the server.")], ephemeral: true });
        if (!role) return await interaction.reply({ embeds: [new ErrorEmbed("The role you mentioned does not exist or was not found.")], ephemeral: true });
        if (targetHighestRole.comparePositionTo(botHighestRole) >= 0) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they has a role superior or equal to mine.")], ephemeral: true });
        if (role.comparePositionTo(botHighestRole) >= 0) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select a higher role than mine.")], ephemeral: true });
        if (hasHigherPermissions) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they have higher or equal permissions to mine.")], ephemeral: true });
        if (!member.roles.cache.has(role.id)) return await interaction.reply({ embeds: [new ErrorEmbed(`The user ${target} does not has the role ${role}.`)], ephemeral: true }); 
            
        try {
            await member.roles.remove(role.id);
            await interaction.reply({ embeds: [new SuccessEmbed(`The role ${role} has been correctly removed from ${target}.`)], ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ embeds: [new ErrorEmbed(`An error occurred removing the role ${role} to the user ${target}.`)], ephemeral: true });
        }
    }
}