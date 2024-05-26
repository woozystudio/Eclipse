import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import Eclipse from "../class/Eclipse";
import Command from "../class/Command";

export default class TestCommand extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "test",
            description: "test",
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [],
            development: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("testing")
            .setLabel("Button Interaction")
            .setStyle(ButtonStyle.Secondary)
        )

        await interaction.reply({ components: [new ActionRowBuilder<ButtonBuilder>(button)] })
    }
}