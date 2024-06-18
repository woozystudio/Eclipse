import { ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember, PermissionFlagsBits, codeBlock, heading, userMention } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import SuccessEmbed from "../../embeds/SuccessEmbed";
import { LocaleParam } from "../../types/LocaleParam";

export default class Unban extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "unban",
            description: "Unban a user from the server.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.BanMembers,
            options: [
                {
                    name: "id",
                    description: "Write down the user id you want to unban.",
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
        const target = interaction.options.getString('id') as string;
        const reason: any = interaction.options.getString('reason') || "No reason provided." as string;
        const interactionMember = await interaction.guild?.members.fetch(interaction.user.id) as GuildMember;

        if (!interactionMember?.permissions.has(new Unban(this.client).default_member_permissions)) return await interaction.reply({ embeds: [new ErrorEmbed("You do not have permissions to execute this command.")], ephemeral: true });

        try {
            await interaction.guild?.bans.fetch(target);
            await interaction.guild?.members.unban(target, reason);
            await interaction.reply({ embeds: [new SuccessEmbed(`The user ${userMention(target)} has been unbanned successfully.\n${heading('Reason', 3)} \n${codeBlock(`${reason}`)}`)], ephemeral: true });
        } catch (err: any) {
            if(err.code === 10013 || 10007) {
                await interaction.reply({ embeds: [new ErrorEmbed(`The ID you provided is invalid or does not exist, try using another one.`)], ephemeral: true });
            } else if (err.code === 10026) {
                await interaction.reply({ embeds: [new ErrorEmbed(`No ban has been found related to the ID you provided, try using another ID.`)], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [new ErrorEmbed(`An error occurred while trying to unban the user, try again later.`)], ephemeral: true });
                console.log(err);
            }
        }
    }
}