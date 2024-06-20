
import { ModalSubmitInteraction, PermissionFlagsBits, TextChannel, inlineCode } from "discord.js";
import Eclipse from "../../class/Eclipse";
import Case from "../../enums/Case";
import Modal from "../../class/Modal";

export default class CreateTicketButtonConfigTicketsCommand extends Modal {
    constructor(client: Eclipse) {
        super(client, {
            customId: "ticketoptions-rename-modal",
            userPermissions: PermissionFlagsBits.ManageChannels
        })
    }

    async Execute(interaction: ModalSubmitInteraction) {
        if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `${Case.Error} I don't have sufficient permissions to perform this action. Missing Permissions: ${inlineCode(`ManageChannels`)}`, ephemeral: true });
        
        const TicketName = interaction.fields.getTextInputValue('ticket-name-input');
        const channel = interaction.channel as TextChannel;

        await channel.setName(TicketName);
        await interaction.reply({ content: `${Case.Success} The ticket has been renamed correctly.`, ephemeral: true });
    }
}