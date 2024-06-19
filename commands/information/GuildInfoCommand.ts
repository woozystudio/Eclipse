import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, codeBlock, time } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";

export default class GuildInfo extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "guildinfo",
            description: "Information about the guild.",
            category: Category.Information,
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const owner = await interaction.guild?.fetchOwner();

        const GuildInfoEmbed = new EmbedBuilder()
        .setAuthor({ iconURL: `${interaction.guild?.iconURL()}`, name: `${interaction.guild?.name}` })
        .setThumbnail(interaction.guild?.iconURL({ size: 2048}) as string)
        .setColor(0x2B2D31)
        .addFields(
            { name: 'Owner', value: `${codeBlock(`${owner?.user.username}`)}`, inline: true },
            { name: 'Members', value: `${codeBlock(`${interaction.guild?.memberCount}`)}`, inline: true },
            { name: 'Boosts', value: `${codeBlock(`${interaction.guild?.premiumSubscriptionCount || "0"}`)}`, inline: true },
            { name: 'Roles', value: `${codeBlock(`${interaction.guild?.roles.cache.size}/250`)}`, inline: true },
            { name: 'Channels', value: `${codeBlock(`${interaction.guild?.channels.cache.filter(channel => channel.type !== ChannelType.GuildCategory).size}/500`)}`, inline: true },
            { name: 'Emojis', value: `${codeBlock(`${interaction.guild?.emojis.cache.size}/250`)}`, inline: true },
            { name: 'Date created', value: `${time(Math.floor(interaction.guild?.createdTimestamp as number / 1000))}`, inline: false },
        )

        const GuildInfoButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
            .setCustomId("guildinfo-command-roles")
            .setLabel("View Roles")
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId("guildinfo-command-channels")
            .setLabel("View Channels")
            .setStyle(ButtonStyle.Secondary)
        )

        await interaction.reply({ embeds: [GuildInfoEmbed], components: [GuildInfoButtons], ephemeral: true });
    }
}