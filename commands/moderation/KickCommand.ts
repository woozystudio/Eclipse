import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, Role, User, bold, codeBlock, heading, quote } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import SuccessEmbed from "../../embeds/SuccessEmbed";

export default class Kick extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "kick",
            description: "Kick a user from the server.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.KickMembers,
            options: [
                {
                    name: "target",
                    description: "Select the user you want to kick.",
                    required: true,
                    type: ApplicationCommandOptionType.User
                },
                {
                    name: "reason",
                    description: "Write down the reason for this sanction.",
                    required: false,
                    type: ApplicationCommandOptionType.String
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('target') as User;
        const reason: any = interaction.options.getString('reason') || "No reason provided." as string;
        const member = await interaction.guild?.members.fetch(target.id) as GuildMember;
        const interactionMember = await interaction.guild?.members.fetch(interaction.user.id) as GuildMember;
        const botHighestRole = interaction.guild?.members.me?.roles.highest as Role;
        const targetHighestRole = member.roles.highest;
        const botPermissions = interaction.guild?.members.me?.permissions;
        const targetPermissions = member.permissions;
        const hasHigherPermissions = targetPermissions.has(PermissionFlagsBits.Administrator) || (botPermissions?.has(PermissionFlagsBits.Administrator) && targetPermissions.has(botPermissions.bitfield));

        if (!interactionMember?.permissions.has(new Kick(this.client).default_member_permissions)) return await interaction.reply({ embeds: [new ErrorEmbed("You do not have permissions to execute this command.")], ephemeral: true });
        if (!member) return await interaction.reply({ embeds: [new ErrorEmbed("The user mentioned is no longer within the server.")], ephemeral: true });
        if (interaction.user.id === member.id) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot execute the kick action on yourself.")], ephemeral: true });
        if (member.permissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply({ embeds: [new ErrorEmbed("I cannot kick a user with administrator permissions.")], ephemeral: true });
        if (targetHighestRole.comparePositionTo(botHighestRole) >= 0) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they has a role superior or equal to mine.")], ephemeral: true });
        if (hasHigherPermissions) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they have higher or equal permissions to mine.")], ephemeral: true });

        await member.kick(reason);

        await interaction.reply({ embeds: [new SuccessEmbed(`The user ${target} has been kicked successfully.\n${heading('Reason', 3)} \n${codeBlock(`${reason}`)}`)], ephemeral: false });
    }
}