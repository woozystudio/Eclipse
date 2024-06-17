import { ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember, PermissionFlagsBits, Role, User } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import SuccessEmbed from "../../embeds/SuccessEmbed";
import MuteConfig from "../../database/MuteConfig";
import Case from "../../enums/Case";

export default class Unmute extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "unmute",
            description: "unute a user from the server.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.ModerateMembers | PermissionFlagsBits.ManageRoles,
            options: [
                {
                    name: "target",
                    description: "Select the user you want to unmute.",
                    required: true,
                    type: ApplicationCommandOptionType.User
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('target') as User;
        const member = await interaction.guild?.members.fetch(target.id) as GuildMember;
        const botHighestRole = interaction.guild?.members.me?.roles.highest as Role;
        const targetHighestRole = member.roles.highest;
        const botPermissions = interaction.guild?.members.me?.permissions;
        const targetPermissions = member.permissions;
        const hasHigherPermissions = targetPermissions.has(PermissionFlagsBits.Administrator) || (botPermissions?.has(PermissionFlagsBits.Administrator) && targetPermissions.has(botPermissions.bitfield));
        const data = await MuteConfig.findOne({ GuildID: interaction.guild?.id });
        
        if (!data) return interaction.reply({ content: `${Case.Error} Apparently, you have not configured the mute plugin. Try configuring the plugin.`, ephemeral: true });
        if (!member) return await interaction.reply({ embeds: [new ErrorEmbed("The user mentioned is no longer within the server.")], ephemeral: true });
        if (targetHighestRole.comparePositionTo(botHighestRole) >= 0) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they has a role superior or equal to mine.")], ephemeral: true });
        if (hasHigherPermissions) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they have higher or equal permissions to mine.")], ephemeral: true });
        if (!member.roles.cache.has(`${data.RoleID}`)) return await interaction.reply({ embeds: [new ErrorEmbed(`The user ${target} is not muted.`)], ephemeral: true }); 
            
        try {
            await member.roles.remove(`${data.RoleID}`);
            await interaction.reply({ embeds: [new SuccessEmbed(`The user ${target} has been successfully unmuted on the server.`)], ephemeral: false });
        } catch (error) {
            console.error(error);
            await interaction.reply({ embeds: [new ErrorEmbed(`An error occurred while trying to unmute the user ${target}.`)], ephemeral: true });
        }
    }
}