import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, Role, User, bold, codeBlock, heading, quote, time } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import SuccessEmbed from "../../embeds/SuccessEmbed";
import ms from "@naval-base/ms";

export default class Timeout extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "timeout",
            description: "Timeout a user from the server.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.ModerateMembers,
            options: [
                {
                    name: "target",
                    description: "Select the user you want to timeout.",
                    required: true,
                    type: ApplicationCommandOptionType.User
                },
                {
                    name: "duration",
                    description: "Write the duration with the format: 1s, 1m, 1h, 1d, 1w and 1y",
                    required: true,
                    type: ApplicationCommandOptionType.String
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
        const duration: any = interaction.options.getString('duration');
        const reason: any = interaction.options.getString('reason') || "No reason provided." as string;
        const member = await interaction.guild?.members.fetch(target.id) as GuildMember;
        const interactionMember = await interaction.guild?.members.fetch(interaction.user.id) as GuildMember;
        const botHighestRole = interaction.guild?.members.me?.roles.highest as Role;
        const targetHighestRole = member.roles.highest;
        const botPermissions = interaction.guild?.members.me?.permissions;
        const targetPermissions = member.permissions;
        const hasHigherPermissions = targetPermissions.has(PermissionFlagsBits.Administrator) || (botPermissions?.has(PermissionFlagsBits.Administrator) && targetPermissions.has(botPermissions.bitfield));

        if (member?.isCommunicationDisabled() === true) return await interaction.reply({ embeds: [new ErrorEmbed(`The user ${target} is already in timeout.`)], ephemeral: true });
        if (!interactionMember?.permissions.has(new Timeout(this.client).default_member_permissions)) return await interaction.reply({ embeds: [new ErrorEmbed("You do not have permissions to execute this command.")], ephemeral: true });
        if (!member) return await interaction.reply({ embeds: [new ErrorEmbed("The user mentioned is no longer within the server.")], ephemeral: true });
        if (interaction.user.id === member.id) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot execute the timeout action on yourself.")], ephemeral: true });
        if (member.permissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply({ embeds: [new ErrorEmbed("I cannot timeout a user with administrator permissions.")], ephemeral: true });
        if (targetHighestRole.comparePositionTo(botHighestRole) >= 0) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they has a role superior or equal to mine.")], ephemeral: true });
        if (hasHigherPermissions) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they have higher or equal permissions to mine.")], ephemeral: true });

        const durationMs = ms(duration);
        const timeoutExpiresAt = Math.floor((Date.now() + durationMs) / 1000);

        member.timeout(durationMs, reason);

        const UserDirectMessagesEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setAuthor({ name: `${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() })
        .setDescription(`
            You have been timeout from ${bold(`${interaction.guild?.name}`)}

            ${bold('Reason:')}
            ${quote(reason)}

            ${bold('Time:')}
            ${quote(time(timeoutExpiresAt, "R"))}
        
            You were timeout by ${interaction.user.tag}.
        `)

        await member.send({ embeds: [UserDirectMessagesEmbed] }).catch(err => { return; });
        await interaction.reply({ embeds: [new SuccessEmbed(`The user ${target} has been timeout successfully.\nThe timeout will be cancelled ${time(timeoutExpiresAt, "R")}\n${heading('Reason', 3)} \n${codeBlock(`${reason}`)}`)], ephemeral: false })
    }
}