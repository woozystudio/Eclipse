import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, Role, TextChannel, User, codeBlock, heading, inlineCode } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import SuccessEmbed from "../../embeds/SuccessEmbed";

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
                    description: "Select the duration of the timeout.",
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        { name: '60 Seconds', value: '60' },
                        { name: '2 Minutes', value: '120' },
                        { name: '5 Minutes', value: '300' },
                        { name: '10 Minutes', value: '600' },
                        { name: '15 Minutes', value: '900' },
                        { name: '20 Minutes', value: '1200' },
                        { name: '30 Minutes', value: '1800' },
                        { name: '45 Minutes', value: '2700' },
                        { name: '1 Hour', value: '3600' },
                        { name: '2 Hours', value: '7200' },
                        { name: '3 Hours', value: '10800' },
                        { name: '5 Hours', value: '18000' },
                        { name: '10 Hours', value: '36000' },
                        { name: '1 Day', value: '86400' },
                        { name: '2 Day', value: '172800' },
                        { name: '3 Day', value: '259200' },
                        { name: '5 Days', value: '432000' },
                        { name: 'One Week', value: '604800' },
                    ]
                },
                {
                    name: "reason",
                    description: "Write down the reason for this sanction.",
                    required: false,
                    type: ApplicationCommandOptionType.String
                }
            ],
            development: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('target') as User;
        const duration: any = interaction.options.getString('duration');
        const reason: any = interaction.options.getString('reason') || "No reason provided." as string;
        const member = await interaction.guild?.members.fetch(target.id) as GuildMember;
        const interactionMember = await interaction.guild?.members.fetch(interaction.user.id) as GuildMember;
        const channel = await interaction.channel as TextChannel;
        const botHighestRole = interaction.guild?.members.me?.roles.highest as Role;
        const targetHighestRole = member.roles.highest;
        const botPermissions = interaction.guild?.members.me?.permissions;
        const targetPermissions = member.permissions;
        const hasHigherPermissions = targetPermissions.has(PermissionFlagsBits.Administrator) || (botPermissions?.has(PermissionFlagsBits.Administrator) && targetPermissions.has(botPermissions.bitfield));

        if (member?.isCommunicationDisabled() === true) return await interaction.reply({ embeds: [new ErrorEmbed(`The user ${target} is already in timeout.`)], ephemeral: false });
        if (!interactionMember?.permissions.has(new Timeout(this.client).default_member_permissions)) return await interaction.reply({ embeds: [new ErrorEmbed("You do not have permissions to execute this command.")], ephemeral: false });
        if (!member) return await interaction.reply({ embeds: [new ErrorEmbed("The user mentioned is no longer within the server.")], ephemeral: false });
        if (interaction.user.id === member.id) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot execute the timeout action on yourself.")], ephemeral: false });
        if (member.permissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply({ embeds: [new ErrorEmbed("I cannot timeout a user with administrator permissions.")], ephemeral: false });
        if (targetHighestRole.comparePositionTo(botHighestRole) >= 0) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they has a role superior or equal to mine.")], ephemeral: false });
        if (hasHigherPermissions) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they have higher or equal permissions to mine.")], ephemeral: false });

        const durationMs = duration * 1000;
        const timeoutExpiresAt = Math.floor((Date.now() + durationMs) / 1000);

        member.timeout(durationMs, reason);

        const UserDirectMessagesEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setAuthor({ name: `${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() })
        .setDescription(`
            You have been timeout from **${interaction.guild?.name}**

            **Reason:**
            > ${reason}

            **Time:**
            > <t:${timeoutExpiresAt}:R>
        
            You were timeout by ${interaction.user.tag}.
        `)

        await member.send({ embeds: [UserDirectMessagesEmbed] }).catch(err => { return; });
        await interaction.reply({ embeds: [new SuccessEmbed(`The user ${target} has been timeout successfully.\nThe timeout will be cancelled <t:${timeoutExpiresAt}:R>\n${heading('Reason', 3)} \n${codeBlock(`${reason}`)}`)], ephemeral: false })
    }
}