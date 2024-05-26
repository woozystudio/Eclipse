import { ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import Command from "../class/Command";
import Eclipse from "../class/Eclipse";
import ErrorEmbed from "../embeds/ErrorEmbed";

export default class TestCommand extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "test",
            description: "Test Command",
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [],
            development: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply({ embeds: [new ErrorEmbed("Embed")] })

        setTimeout(async () => {
            await interaction.editReply(ErrorEmbed.message("Message"))
        }, 3000);
    }
}