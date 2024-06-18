import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, Role, User, bold, codeBlock, heading, inlineCode, quote, time } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import SuccessEmbed from "../../embeds/SuccessEmbed";
import ms from "@naval-base/ms";
import { LocaleParam } from "../../types/LocaleParam";

export default class TempRole extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "temprole",
            description: "Temporarily adds a role to a user from the server.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.ManageRoles,
            options: [
                {
                    name: "role",
                    description: "Select the role you want to add.",
                    required: true,
                    type: ApplicationCommandOptionType.Role
                },
                {
                    name: "target",
                    description: "Select the user you want to add the role to.",
                    required: true,
                    type: ApplicationCommandOptionType.User
                },
                {
                    name: "duration",
                    description: "Write the duration with the format: 1s, 1m, 1h, 1d, 1w and 1y",
                    required: true,
                    type: ApplicationCommandOptionType.String
                }
            ],
            development: false,
            locale: LocaleParam
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('target') as User;
        const role = interaction.options.getRole('role') as Role;
        const duration: any = interaction.options.getString('duration') as string;
        const member = await interaction.guild?.members.fetch(target.id) as GuildMember;
        const botHighestRole = interaction.guild?.members.me?.roles.highest as Role;
        const targetHighestRole = member.roles.highest;
        const botPermissions = interaction.guild?.members.me?.permissions;
        const targetPermissions = member.permissions;
        const hasHigherPermissions = targetPermissions.has(PermissionFlagsBits.Administrator) || (botPermissions?.has(PermissionFlagsBits.Administrator) && targetPermissions.has(botPermissions.bitfield));

        if (!botPermissions?.has(new TempRole(this.client).default_member_permissions)) return await interaction.reply({ content: `${inlineCode(`❌`)} I don't have sufficient permissions to perform this action. Missing Permissions: ${inlineCode(`ManageRoles`)}`, ephemeral: false });
        if (!member) return await interaction.reply({ embeds: [new ErrorEmbed("The user mentioned is no longer within the server.")], ephemeral: true });
        if (!role) return await interaction.reply({ embeds: [new ErrorEmbed("The role you mentioned does not exist or was not found.")], ephemeral: true });
        if (targetHighestRole.comparePositionTo(botHighestRole) >= 0) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they has a role superior or equal to mine.")], ephemeral: true });
        if (role.comparePositionTo(botHighestRole) >= 0) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select a higher role than mine.")], ephemeral: true });
        if (hasHigherPermissions) return await interaction.reply({ embeds: [new ErrorEmbed("You cannot select this user as they have higher or equal permissions to mine.")], ephemeral: true });
        if (member.roles.cache.has(role.id)) return await interaction.reply({ embeds: [new ErrorEmbed(`The user ${target} already has the role ${role}.`)], ephemeral: true }); 

        const durationMs = ms(duration);
        const roleExpiresAt = Math.floor((Date.now() + durationMs) / 1000);
        
        await member.roles.add(role.id);
        await interaction.reply({ embeds: [new SuccessEmbed(`User ${target} has the role ${role} temporarily. The role will be removed in: ${time(roleExpiresAt, "R")}`)], ephemeral: false });

        setTimeout(async () => {
            await member.roles.remove(role.id);
        }, durationMs);
    }
}