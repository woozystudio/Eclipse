import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChannelType, EmbedBuilder, PermissionFlagsBits, heading, inlineCode, quote } from "discord.js";
import Button from "../../class/Button";
import Eclipse from "../../class/Eclipse";
import TicketsConfig from "../../database/TicketsConfig";
import Case from "../../enums/Case";
import TicketDocument from "../../database/documents/TicketDocument";

export default class CreateTicketButton extends Button {
    constructor(client: Eclipse) {
        super(client, {
            customId: "tickets-create-new",
            userPermissions: PermissionFlagsBits.UseApplicationCommands
        })
    }

    async Execute(interaction: ButtonInteraction) {
        const data = await TicketsConfig.findOne({ GuildID: interaction.guild?.id });
        const ticketId = Math.floor(Math.random() * 9000) + 10000;

        if (!data) return;
        if (!interaction.guild?.members.me?.permissions.has(PermissionFlagsBits.ManageChannels)) return interaction.reply({ content: `${Case.Error} I don't have sufficient permissions to perform this action. Missing Permissions: ${inlineCode(`ManageChannels`)}`, ephemeral: false });

        try {
            await interaction.guild.channels.create({
                name: `${interaction.member?.user.username}-ticket${ticketId}`,
                type: ChannelType.GuildText,
                parent: data.CategoryID,
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone.id,
                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
                    }
                ]
            }).then(async (channel) => {
                const newTicketSchema = await TicketDocument.create({
                    GuildID: interaction.guild?.id,
                    Members: interaction.member?.user.id,
                    TicketID: ticketId,
                    ChannelID: channel.id,
                    Closed: false,
                    Locked: false,
                    Claimed: false
                });

                const NewTicketEmbed = new EmbedBuilder()
                .setColor(0x2B2D31)
                .setDescription(`${heading('🌿 New Ticket', 2)}\n${quote(`Welcome to your ticket ${interaction.user}, a staff member will contact you soon. For now, we ask you to describe your situation, question or complaint, so we can work better.`)}`)

                const TicketManagerButtons = new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder()
                    .setCustomId('creatticket-close-button')
                    .setLabel('Close')
                    .setEmoji('🔒')
                    .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
                    .setCustomId('creatticket-claim-button')
                    .setLabel('Claim')
                    .setEmoji('📌')
                    .setStyle(ButtonStyle.Secondary),

                    new ButtonBuilder()
                    .setCustomId('creatticket-moreoptions-button')
                    .setLabel('More Options')
                    .setEmoji('🧭')
                    .setStyle(ButtonStyle.Secondary)
                )

                channel.send({ embeds: [NewTicketEmbed], components: [TicketManagerButtons] });
                interaction.reply({ content: `${Case.Success} Your ticket has been successfully created in <#${channel.id}>.`, ephemeral: true });

            });
        } catch (err) {
            console.error(err)
        }
    }
}