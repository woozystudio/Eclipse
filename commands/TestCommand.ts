import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import Eclipse from "../class/Eclipse";
import Command from "../class/Command";
import TestSubCommand from "../subCommands/SubCommand";

export default class TestCommand extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "test",
            description: "test",
            userPermissions: PermissionFlagsBits.UseApplicationCommands,
            options: [
                {
                    name: new TestSubCommand(client).group,
                    description: "test",
                    type: ApplicationCommandOptionType.SubcommandGroup,
                    options: [
                        {
                            name: new TestSubCommand(client).name,
                            description: "test",
                            type: ApplicationCommandOptionType.Subcommand,
                        }
                    ]
                }
            ],
            development: true
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {}
}