import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, User, time } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";

export default class BotInfo extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "botinfo",
            description: "Information about the bot.",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const bot = this.client.user as User;

        const BotInfoEmbed = new EmbedBuilder()
        .setThumbnail(bot?.displayAvatarURL({ size: 2048 }))
        .setAuthor({ iconURL: bot?.displayAvatarURL(), name: `${bot?.username}` })
        .setColor(0x2B2D31)
        .setTitle(`${bot.username}`)
        .setDescription("Bot Information")
        .addFields(
            { name: 'Nickname', value: `${bot.username}`, inline: true },
            { name: 'User', value: `${bot}`, inline: true },
            { name: 'Credits', value: `Architecture & Development: woozystudio`, inline: false },
            { name: 'Version', value: `${this.client.version.version}`, inline: true },
            { name: 'Date Created', value: `${time(Math.floor(bot?.createdTimestamp / 1000))}`, inline: true },
        )

        await interaction.reply({ embeds: [BotInfoEmbed] });
    }
}