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
                },
                {
                    name: "join-to-create",
                    description: "Configure the automatic join to create plugin",
                    type: ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "channel",
                            description: "Select the channel that will function as the channel for creating rooms.",
                            required: true,
                            type: ApplicationCommandOptionType.Channel,
                            channel_types: [ChannelType.GuildVoice]
                        },
                        {
                            name: "category",
                            description: "Select the category where the channels will be created.",
                            required: true,
                            type: ApplicationCommandOptionType.Channel,
                            channel_types: [ChannelType.GuildCategory]
                        }
                    ]
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {}
}