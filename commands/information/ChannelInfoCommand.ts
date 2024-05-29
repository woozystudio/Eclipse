import { ApplicationCommandOptionType, ChannelType, ChatInputCommandInteraction, EmbedBuilder, ForumChannel, PermissionFlagsBits, TextChannel } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";

export default class ChannelInfo extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "channelinfo",
            description: "Displays information about a channel.",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [
                {
                    name: "channel",
                    description: "Select a channel from the server to display their information.",
                    required: true,
                    type: ApplicationCommandOptionType.Channel
                }
            ],
            development: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.options.getChannel('channel');
        const channels = await interaction.guild?.channels.fetch(channel?.id as string);
        
        let type;
        let topic = (channel as TextChannel).topic;

        switch (channel?.type) {
            case 0:
                type = "Text Channel";
                break;
            case 2:
                type = "Voice Channel"
                break;
            case 5:
                type = "Announcement Channel"
                break;
            case 13:
                type = "Stage Channel"
                break;
            case 15:
                type = "Forum Channel"
                topic = "No support for forum channels"
                break;
            case 16:
                type = "Media Channel"
                topic = "No support for forum channels"
                break;
            case 12:
                type = "Private Thread Channel"
                break;
            case 11:
                type = "Public Thread Channel"
                break;
        }

        const ChannelInfoEmbed = new EmbedBuilder()
        .setTitle("Channel Information")
        .setColor(0x2B2D31)
        .addFields(
            { name: 'Name', value: `\`\`\`${channel?.name}\`\`\``, inline: true },
            { name: 'ID', value: `\`\`\`${channel?.id}\`\`\``, inline: true },
            { name: 'Topic', value: `\`\`\`${topic}\`\`\``, inline: false },
            { name: 'Type', value: `\`\`\`${type}\`\`\``, inline: true },
            { name: 'Parent', value: `\`\`\`${channels?.parent?.name}\`\`\``, inline: true },
            { name: 'Date created', value: `<t:${Math.floor(channels?.createdTimestamp as number / 1000)}>`, inline: false },
        )

        await interaction.reply({ embeds: [ChannelInfoEmbed] });
    }
}