import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, User, inlineCode, time } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

export default class UserInfo extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "userinfo",
            description: "Displays information about a server user.",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [
                {
                    name: "target",
                    description: "Select a user from the server to display their information.",
                    required: true,
                    type: ApplicationCommandOptionType.User
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('target') as User;
        const member = await interaction.guild?.members.fetch(target?.id) as GuildMember;
        const roles = member?.roles.cache.map((role) => role);
        const permissions = member?.permissions.toArray().map((perm) => `${inlineCode(perm)}`);

        const UserInfoEmbed = new EmbedBuilder()
        .setThumbnail(target?.displayAvatarURL({ size: 2048 }))
        .setAuthor({ iconURL: target?.displayAvatarURL(), name: `${target?.username}` })
        .setColor(0x2B2D31)
        .addFields(
            { name: `${i18next.t('command.common.date_created', { lng: LocaleParam })}`, value: `${time(Math.floor(target?.createdTimestamp / 1000))}` },
            { name: `${i18next.t('command.common.date_joined', { lng: LocaleParam })}`, value: `${time(Math.floor(member?.joinedTimestamp as number / 1000))}` },
            { name: 'Roles', value: `${roles?.join(' ')}` },
            { name: `${i18next.t('command.common.permissions', { lng: LocaleParam })}`, value: `${permissions?.join(' ')}` },
        )

        await interaction.reply({ embeds: [UserInfoEmbed], ephemeral: true });
    }
}