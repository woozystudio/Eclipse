import { ButtonInteraction, EmbedBuilder, PermissionFlagsBits, inlineCode, quote, time, userMention } from "discord.js";
import Button from "../../class/Button";
import Eclipse from "../../class/Eclipse";
import Case from "../../enums/Case";
import TicketDocument from "../../database/documents/TicketDocument";

export default class ClaimButton extends Button {
    constructor(client: Eclipse) {
        super(client, {
            customId: "creatticket-claim-button",
            userPermissions: PermissionFlagsBits.ManageChannels
        })
    }

    async Execute(interaction: ButtonInteraction) {
        const data = await TicketDocument.findOne({ GuildID: interaction.guild?.id });

        if (!data) return;
        if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `${Case.Error} I don't have sufficient permissions to perform this action. Missing Permissions: ${inlineCode(`ManageChannels`)}`, ephemeral: true });
        if (data.Claimed === true) return interaction.reply({ content: `${Case.Error} This ticket is already claimed by ${userMention(`${data.Moderator}`)}`, ephemeral: true });

        await TicketDocument.updateOne({ ChannelID: interaction.channel?.id }, { Claimed: true, Moderator: interaction.user.id });

        const ClaimedEmbed = new EmbedBuilder()
        .setDescription(`📌 From now on, ${interaction.user} will be in charge of this ticket.`)
        .setColor(0x43B582)

        interaction.reply({ embeds: [ClaimedEmbed] });
    }
}