import { ActionRowBuilder, ButtonInteraction, ModalBuilder, PermissionFlagsBits, TextInputBuilder, TextInputStyle, inlineCode, time } from "discord.js";
import Button from "../../../class/Button";
import Eclipse from "../../../class/Eclipse";
import Case from "../../../enums/Case";

export default class RenameButton extends Button {
    constructor(client: Eclipse) {
        super(client, {
            customId: "ticketoptions-rename-button",
            userPermissions: PermissionFlagsBits.ManageChannels
        })
    }

    async Execute(interaction: ButtonInteraction) {
        if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `${Case.Error} I don't have sufficient permissions to perform this action. Missing Permissions: ${inlineCode(`ManageChannels`)}`, ephemeral: true });

        const RenameModal = new ModalBuilder()
            .setTitle("Rename Ticket")
            .setCustomId("ticketoptions-rename-modal")

        const TicketName = new ActionRowBuilder<TextInputBuilder>().addComponents(
            new TextInputBuilder()
            .setCustomId('ticket-name-input')
            .setLabel('Ticket name')
            .setPlaceholder('Type the new ticket name...')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        )

        RenameModal.addComponents(TicketName);

        await interaction.showModal(RenameModal);
    }
}