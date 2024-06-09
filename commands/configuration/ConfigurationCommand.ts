import { ApplicationCommandOptionType, ChannelType, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";

export default class Configuration extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "config",
            description: "Configure all bot plugins with this command.",
            category: Category.Configuration,
            userPermissions: PermissionFlagsBits.ManageGuild,
            options: [
                {
                    name: "reports",
                    description: "Configure the reporting plugin.",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "channel",
                            description: "Select the channel where the reports will be sent.",
                            required: true,
                            type: ApplicationCommandOptionType.Channel,
                            channel_types: [ChannelType.GuildText]
                        }
                    ]
                },
                {
                    name: "join-roles",
                    description: "Configure the automatic join roles plugin",
                    type: ApplicationCommandOptionType.Subcommand
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {}
}