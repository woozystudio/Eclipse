import { ApplicationCommandOptionType, ChatInputCommandInteraction, DefaultUserAgent, EmbedBuilder, GuildMember, PermissionFlagsBits, Role, User, bold, codeBlock, heading, inlineCode, quote, time } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import SuccessEmbed from "../../embeds/SuccessEmbed";
import ms from "@naval-base/ms";
import { LocaleParam } from "../../types/LocaleParam";

export default class TempBan extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "tempban",
            description: "Temporarily ban a user from the server.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.BanMembers,
            options: [
                {
                    name: "target",
                    description: "Select the user you want to ban.",
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
            development: false,
            locale: LocaleParam
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('target') as User;
        const reason: any = interaction.options.getString('reason') || "No reason provided." as string;
        const duration: any = interaction.options.getString('duration') as string;
        const member = await interaction.guild?.members.fetch(target.id) as GuildMember;
        const botHighestRole = interaction.guild?.members.me?.roles.highest as Role;
        const targetHighestRole = member.roles.highest;
        const botPermissions = interaction.guild?.members.me?.permissions;
        const targetPermissions = member.permissions;
        const hasHigherPermissions = targetPermissions.has(PermissionFlagsBits.Administrator) || (botPermissions?.has(PermissionFlagsBits.Administrator) && targetPermissions.has(botPermissions.bitfield));

        if (!botPermissions?.has(new TempBan(this.client).default_member_permissions)) return await interaction.reply({ content: `${inlineCode(`❌`)} I don't have sufficient permissions to perform this action. Missing Permissions: ${inlineCode(`BanMembers`)}`, ephemeral: false });
        if (!member) return await interaction.reply({ embeds: [new ErrorEmbed("The user mentioned is no longer within the server.")], ephemeral: true });
        if (interaction.user.id === member.id) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot execute the tempban action on yourself.")], ephemeral: true });
        if (member.permissions.has(PermissionFlagsBits.Administrator)) return await interaction.reply({ embeds: [new ErrorEmbed("I cannot tempban a user with administrator permissions.")], ephemeral: true });
        if (targetHighestRole.comparePositionTo(botHighestRole) >= 0) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they has a role superior or equal to mine.")], ephemeral: true });
        if (hasHigherPermissions) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they have higher or equal permissions to mine.")], ephemeral: true });

        const durationMs = ms(duration);
        const banExpiresAt = Math.floor((Date.now() + durationMs) / 1000);
        
        const UserDirectMessagesEmbed = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setAuthor({ name: `${interaction.user.tag} (${interaction.user.id})`, iconURL: interaction.user.displayAvatarURL() })
        .setDescription(`
            You have been banned from ${bold(`${interaction.guild?.name}`)}
    
            ${bold('Duration:')}
            ${quote(time(banExpiresAt, "R"))}

            ${bold('Reason:')}
            ${quote(reason)}
            
            You were banned by ${interaction.user.tag}.
            `)
            
        await member.send({ embeds: [UserDirectMessagesEmbed] }).catch(err => { console.log(err) });
        await member.ban({ reason: reason });
        await interaction.reply({ embeds: [new SuccessEmbed(`The user ${target} has been temporarily banned successfully. The ban will be cancelled in ${time(banExpiresAt, "R")}\n${heading('Reason', 3)} \n${codeBlock(`${reason}`)}`)], ephemeral: true });

        setTimeout(async () => {
            await interaction.guild?.members.unban(target.id);
        }, durationMs);
    }
}