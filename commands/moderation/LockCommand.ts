import { ApplicationCommandOptionType, ChannelType, ChatInputCommandInteraction, PermissionFlagsBits, TextChannel, inlineCode } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";

export default class Lock extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "lock",
            description: "Locks a channel for server users.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.ManageChannels,
            options: [
                {
                    name: "channel",
                    description: "Select a channel to lock.",
                    required: false,
                    type: ApplicationCommandOptionType.Channel,
                    channel_types: [ChannelType.GuildText]
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.options.getChannel('channel') as TextChannel || interaction.channel;
        const bot = interaction.guild?.members.me?.permissions;

        if (!bot?.has(new Lock(this.client).default_member_permissions)) return await interaction.reply({ content: `${inlineCode(`❌`)} I don't have sufficient permissions to perform this action. Missing Permissions: ${inlineCode(`ManageChannels`)}`, ephemeral: false });

        await channel.permissionOverwrites.edit(`${interaction.guild?.roles.everyone.id}`, {
            SendMessages: false,
            AddReactions: false,
            CreatePrivateThreads: false,
            CreatePublicThreads: false,
            SendMessagesInThreads: false
        });

        await interaction.reply({ content: `${inlineCode(`✅`)} The channel ${channel} has been successfully locked!`, ephemeral: true });
    }
}