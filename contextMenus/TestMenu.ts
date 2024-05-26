import { ApplicationCommandType, ContextMenuCommandInteraction } from "discord.js";
import Eclipse from "../class/Eclipse";
import ContextMenu from "../class/ContextMenu";

export default class TestCommand extends ContextMenu {
    constructor(client: Eclipse) {
        super(client, {
            name: "test2",
            type: ApplicationCommandType.User,
            development: true
        });
    }

    async Execute(interaction: ContextMenuCommandInteraction) {
        await interaction.reply({ content: "Test ContextMenu Command" })
    }
}