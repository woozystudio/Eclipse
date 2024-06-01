import { ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember, PermissionFlagsBits, Role, User, codeBlock, heading } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import SuccessEmbed from "../../embeds/SuccessEmbed";

export default class UnTimeout extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "untimeout",
            description: "Untimeout a user from the server.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.ModerateMembers,
            options: [
                {
                    name: "target",
                    description: "Select the user you want to untimeout.",
                    required: true,
                    type: ApplicationCommandOptionType.User
                },
                {
                    name: "reason",
                    description: "Write down the reason for this untimeout.",
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

        if (member?.isCommunicationDisabled() === false) return await interaction.reply({ embeds: [new ErrorEmbed(`The user ${target} is not in timeout.`)], ephemeral: false });
        if (!interactionMember?.permissions.has(new UnTimeout(this.client).default_member_permissions)) return await interaction.reply({ embeds: [new ErrorEmbed("You do not have permissions to execute this command.")], ephemeral: false });
        if (!member) return await interaction.reply({ embeds: [new ErrorEmbed("The user mentioned is no longer within the server.")], ephemeral: false });
        if (interaction.user.id === member.id) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot execute the untimeout action on yourself.")], ephemeral: false });
        if (member.permissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply({ embeds: [new ErrorEmbed("I cannot untimeout a user with administrator permissions.")], ephemeral: false });
        if (targetHighestRole.comparePositionTo(botHighestRole) >= 0) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they has a role superior or equal to mine.")], ephemeral: false });
        if (hasHigherPermissions) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they have higher or equal permissions to mine.")], ephemeral: false });

        member.timeout(null, reason);

        await interaction.reply({ embeds: [new SuccessEmbed(`The user ${target} has been untimeout successfully.\n${heading('Reason', 3)} \n${codeBlock(`${reason}`)}`)], ephemeral: false })
    }
}