import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CategoryChannel, ChatInputCommandInteraction, EmbedBuilder, Role, TextChannel, heading, quote } from "discord.js";
import SubCommand from "../../class/SubCommand";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import Case from "../../enums/Case";
import TicketsConfig from "../../database/TicketsConfig";

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
        const description = interaction.options.getString('description') as string || `${heading('<:Quest:1244053364950696018> What are tickets?', 3)}\n${quote('Tickets are a quick and easy way to get support from the Staff Team, you can ask questions, discuss problems and request information of all kinds')}\n${heading('<:Moderation:1253009192852263144> How to create a ticket?', 3)}\n${quote('To create a ticket, click on the \"Create ticket\" button and go to the channel specified when creating the ticket. On behalf of the team, we ask that when you create your ticket, you write down your situation or question, to expedite the process.')}`;

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
        await interaction.reply({ content: `${Case.Success} The ticketing plugin has been successfully configured.`, ephemeral: false });
    }
}