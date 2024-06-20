import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, PermissionFlagsBits, heading, inlineCode, quote, time } from "discord.js";
import Button from "../../class/Button";
import Eclipse from "../../class/Eclipse";
import Case from "../../enums/Case";
import TicketDocument from "../../database/documents/TicketDocument";

export default class MoreOptionsButton extends Button {
    constructor(client: Eclipse) {
        super(client, {
            customId: "creatticket-moreoptions-button",
            userPermissions: PermissionFlagsBits.ManageChannels
        })
    }

    async Execute(interaction: ButtonInteraction) {
        const data = await TicketDocument.findOne({ GuildID: interaction.guild?.id });

        if (!data) return;
        if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `${Case.Error} I don't have sufficient permissions to perform this action. Missing Permissions: ${inlineCode(`ManageChannels`)}`, ephemeral: true });

        const MoreOptionsTicket = new EmbedBuilder()
        .setColor(0x2B2D31)
        .setDescription(`${heading('🧭 Ticket Options', 2)}\n${quote(`For ticket administrators, with these options they can manage the ticket. Transcribe the ticket, block it, rename it, and more with the buttons below.`)}`)

        const TicketManagerButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
            .setCustomId('ticketoptions-lock-button')
            .setLabel('Lock')
            .setEmoji('🔒')
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId('ticketoptions-unlock-button')
            .setLabel('Unlock')
            .setEmoji('🔓')
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId('ticketoptions-rename-button')
            .setLabel('Rename')
            .setEmoji('✏️')
            .setStyle(ButtonStyle.Secondary)
        )

        interaction.reply({ embeds: [MoreOptionsTicket], components: [TicketManagerButtons] });
    }
}