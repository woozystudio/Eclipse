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
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "role-1",
                            description: "Select the role you want to automate.",
                            required: true,
                            type: ApplicationCommandOptionType.Role,
                        },
                        {
                            name: "role-2",
                            description: "Select the role you want to automate.",
                            required: false,
                            type: ApplicationCommandOptionType.Role,
                        },
                        {
                            name: "role-3",
                            description: "Select the role you want to automate.",
                            required: false,
                            type: ApplicationCommandOptionType.Role,
                        },
                        {
                            name: "role-4",
                            description: "Select the role you want to automate.",
                            required: false,
                            type: ApplicationCommandOptionType.Role,
                        },
                        {
                            name: "role-5",
                            description: "Select the role you want to automate.",
                            required: false,
                            type: ApplicationCommandOptionType.Role,
                        }
                    ]
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {}
}