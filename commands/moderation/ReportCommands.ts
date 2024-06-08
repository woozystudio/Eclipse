import { ApplicationCommandOptionType, ChannelType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, TextChannel, bold, codeBlock, inlineCode } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ReportsConfig from "../../database/ReportsConfig";

export default class Report extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "report",
            description: "Reports to a user on the server.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [
                {
                    name: "target",
                    description: "Select the user you want to report.",
                    required: true,
                    type: ApplicationCommandOptionType.User
                },
                {
                    name: "reason",
                    description: "Write the reason for the report.",
                    required: true,
                    type: ApplicationCommandOptionType.String
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reason');

        const ReportEmbed = new EmbedBuilder()
        .setAuthor({ iconURL: interaction.user.displayAvatarURL(), name: `${interaction.user.username} (${interaction.user.id})` })
        .setColor("Red")
        .setDescription(`
            ${bold('Member:')} ${inlineCode(`${target?.username}`)} (${target?.id})
            ${bold('Action:')} Report
            ${bold('Reason:')} ${reason}
        `)
        .setTimestamp()

        const data = await ReportsConfig.findOne({ GuildID: interaction.guild?.id });
        if(!data) return interaction.reply({ content: `${inlineCode('❌')} Apparently, you have not configured the report plugin. Try configuring the plugin.`, ephemeral: true });
        
        const guildChannel = interaction.guild?.channels.cache.get(`${data.ChannelID}`) as TextChannel;

        await guildChannel.send({ embeds: [ReportEmbed] });
        await interaction.reply({ content: `${inlineCode('✅')} Your report has been sent successfully.`, ephemeral: true })
    }
}