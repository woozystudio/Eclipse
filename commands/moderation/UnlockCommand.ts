import { ApplicationCommandOptionType, ChannelType, ChatInputCommandInteraction, PermissionFlagsBits, TextChannel, inlineCode } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import { LocaleParam } from "../../types/LocaleParam";

export default class Unlock extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "unlock",
            description: "Unlocks a channel for server users.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.ManageChannels,
            options: [
                {
                    name: "channel",
                    description: "Select a channel to unlock.",
                    required: false,
                    type: ApplicationCommandOptionType.Channel,
                    channel_types: [ChannelType.GuildText]
                }
            ],
            development: false,
            locale: LocaleParam
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.options.getChannel('channel') as TextChannel || interaction.channel;
        const bot = interaction.guild?.members.me?.permissions;

        if (!bot?.has(new Unlock(this.client).default_member_permissions)) return await interaction.reply({ content: `${inlineCode(`❌`)} I don't have sufficient permissions to perform this action. Missing Permissions: ${inlineCode(`ManageChannels`)}`, ephemeral: false });

        await channel.permissionOverwrites.edit(`${interaction.guild?.roles.everyone.id}`, {
            SendMessages: null,
            AddReactions: null,
            CreatePrivateThreads: null,
            CreatePublicThreads: null,
            SendMessagesInThreads: null
        });

        await interaction.reply({ content: `${inlineCode(`✔️`)} The channel ${channel} has been successfully unlocked!`, ephemeral: true });
    }
}