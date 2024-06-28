
import { ModalSubmitInteraction, PermissionFlagsBits, TextChannel, inlineCode } from "discord.js";
import Eclipse from "../../class/Eclipse";
import Case from "../../enums/Case";
import Modal from "../../class/Modal";
import i18next from "i18next";
import { LocaleParam } from "../../types/LocaleParam";

export default class CreateTicketButtonConfigTicketsCommand extends Modal {
    constructor(client: Eclipse) {
        super(client, {
            customId: "ticketoptions-rename-modal",
            userPermissions: PermissionFlagsBits.ManageChannels
        })
    }

    async Execute(interaction: ModalSubmitInteraction) {
        if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `${Case.Error} ${i18next.t('command.common.errors.bot_missing_permissions', { lng: LocaleParam, permissions: `${inlineCode(`ManageChannels`)}` })}`, ephemeral: true });
        
        const TicketName = interaction.fields.getTextInputValue('ticket-name-input');
        const channel = interaction.channel as TextChannel;

        await channel.setName(TicketName);
        await interaction.reply({ content: `${Case.Success} ${i18next.t('command.tickets.rename.success', { lng: LocaleParam })}`, ephemeral: true });
    }
}