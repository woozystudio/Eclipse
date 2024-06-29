import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CategoryChannel, ChatInputCommandInteraction, EmbedBuilder, Role, TextChannel, heading, quote } from "discord.js";
import SubCommand from "../../class/SubCommand";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import Case from "../../enums/Case";
import TicketsConfig from "../../database/TicketsConfig";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

export default class TicketsSub extends SubCommand {
    constructor(client: Eclipse) {
        super(client, {
            name: "tickets",
            category: Category.Configuration,
            command: "config",
            group: ""
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.options.getChannel('channel') as TextChannel;
        const category = interaction.options.getChannel('category') as CategoryChannel;
        const description = interaction.options.getString('description') as string || `${heading(i18next.t('command.config.tickets.description.header.what_are', { lng: LocaleParam }), 3)}\n${quote(i18next.t('command.config.tickets.description.what_are', { lng: LocaleParam }))}\n${heading(i18next.t('command.config.tickets.description.header.how_to', { lng: LocaleParam }), 3)}\n${quote(i18next.t('command.config.tickets.description.how_to', { lng: LocaleParam }))}`;

        await TicketsConfig.findOneAndUpdate({ GuildID: interaction.guild?.id }, { ChannelID: channel.id, CategoryID: category.id, Description: description }, { new: true, upsert: true });

        const TicketCreate = new EmbedBuilder()
        .setDescription(description)
        .setColor(0x2B2D31)

        const CreateTicket = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
            .setCustomId('tickets-create-new')
            .setLabel('Create Ticket')
            .setEmoji('📩')
            .setStyle(ButtonStyle.Secondary)
        )

        await channel.send({ embeds: [TicketCreate], components: [CreateTicket] });
        await interaction.reply({ content: `${Case.Success} ${i18next.t('command.config.common.success', { lng: LocaleParam })}`, ephemeral: true });
    }
}