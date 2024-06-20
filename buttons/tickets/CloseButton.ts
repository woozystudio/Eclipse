import { ButtonInteraction, PermissionFlagsBits, inlineCode, time } from "discord.js";
import Button from "../../class/Button";
import Eclipse from "../../class/Eclipse";
import Case from "../../enums/Case";
import TicketDocument from "../../database/documents/TicketDocument";

export default class CloseButton extends Button {
    constructor(client: Eclipse) {
        super(client, {
            customId: "creatticket-close-button",
            userPermissions: PermissionFlagsBits.ManageChannels
        })
    }

    async Execute(interaction: ButtonInteraction) {
        const data = await TicketDocument.findOne({ GuildID: interaction.guild?.id });

        if (!data) return;
        if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `${Case.Error} I don't have sufficient permissions to perform this action. Missing Permissions: ${inlineCode(`ManageChannels`)}`, ephemeral: true });
        if (data.Closed === true) return interaction.reply({ content: `${Case.Error} This ticket is already getting deleted...`, ephemeral: true });

        await TicketDocument.updateOne({ ChannelID: interaction.channel?.id }, { Closed: true });
        interaction.reply({ content: `${Case.Success} Your ticket will be deleted ${time(Math.floor(Date.now() / 1000) + 10, "R")}.` });

        setTimeout(async () => {
            await interaction.channel?.delete();
            await TicketDocument.deleteOne({ GuildID: interaction.guild?.id }, { ChannelID: interaction.channel?.id });
        }, 10000);
    }
}