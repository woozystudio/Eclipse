import { ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import Eclipse from "../class/Eclipse";
import SubCommand from "../class/SubCommand";

export default class TestSubCommand extends SubCommand {
    constructor(client: Eclipse) {
        super(client, {
            command: "test",
            group: "group",
            name: "testing",
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("Test group")
    }
}