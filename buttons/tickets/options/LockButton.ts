import { ButtonInteraction, PermissionFlagsBits, TextChannel, inlineCode, time } from "discord.js";
import Button from "../../../class/Button";
import Eclipse from "../../../class/Eclipse";
import Case from "../../../enums/Case";
import TicketDocument from "../../../database/documents/TicketDocument";

export default class LockButton extends Button {
    constructor(client: Eclipse) {
        super(client, {
            customId: "ticketoptions-lock-button",
            userPermissions: PermissionFlagsBits.ManageChannels
        })
    }

    async Execute(interaction: ButtonInteraction) {
        const data = await TicketDocument.findOne({ GuildID: interaction.guild?.id });
        const channel = await interaction.guild?.channels.cache.get(`${data?.ChannelID}`) as TextChannel;

        if (!data) return;
        if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `${Case.Error} I don't have sufficient permissions to perform this action. Missing Permissions: ${inlineCode(`ManageChannels`)}`, ephemeral: true });
        if (data.Locked === true) return interaction.reply({ content: `${Case.Error} This ticket is already locked.`, ephemeral: true });

        await TicketDocument.updateOne({ ChannelID: interaction.channel?.id }, { Locked: true });
        await channel.permissionOverwrites.edit(`${data.Members}`, {
            SendMessages: false,
            AddReactions: false,
            CreatePrivateThreads: false,
            CreatePublicThreads: false,
            SendMessagesInThreads: false
        });
        
        interaction.reply({ content: `${Case.Success} The ticket has been locked.`, ephemeral: true });
    }
}