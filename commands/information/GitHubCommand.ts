import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, User, bold } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";

export default class GitHub extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "github",
            description: "Visit the Eclispe repository on GitHub!",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const bot = this.client.user as User;

        const GitHubEmbed = new EmbedBuilder()
        .setThumbnail(bot?.displayAvatarURL({ size: 2048 }))
        .setAuthor({ iconURL: bot?.displayAvatarURL(), name: `${bot?.username} ${this.client.version.version}` })
        .setColor(0x2B2D31)
        .setTitle(`Open Source Information`)
        .setDescription(`
            This ${bold("wonderful")} bot is made so that anyone can use it, this bot is a product of a lot of dedication and love. It is for this reason that it is now an opensource bot! 
            
            > If you have knowledge in the development of Discord bots, don't hesitate to collaborate in it! Go to the official Eclipse server for more information about the GitHub repository!
        `)

        const Buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
            .setLabel("Open Source")
            .setStyle(ButtonStyle.Link)
            .setEmoji("<:GitHub:1246192509005332511>")
            .setURL("https://github.com/woozystudio/Eclipse")
        )

        await interaction.reply({ embeds: [GitHubEmbed], components: [Buttons] });
    }
}