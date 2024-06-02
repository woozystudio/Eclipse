import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, GuildMember, PermissionFlagsBits, Role, TextChannel, User, bold, codeBlock, heading, quote } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import SuccessEmbed from "../../embeds/SuccessEmbed";

export default class Clear extends Command {
    constructor(client: Eclipse) {
        super(client, {
            name: "clear",
            description: "Deletes a number of messages in a channel from the server.",
            category: Category.Moderation,
            userPermissions: PermissionFlagsBits.ManageMessages,
            options: [
                {
                    name: "amount",
                    description: "Type the number of messages you want to delete.",
                    required: true,
                    type: ApplicationCommandOptionType.Integer
                }
            ],
            development: false
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const amount = interaction.options.getInteger('amount') as number;
        const botPermissions = interaction.guild?.members.me?.permissions;

        if (!botPermissions?.has(new Clear(this.client).default_member_permissions)) return await interaction.reply({ embeds: [new ErrorEmbed("I don't have the necessary permissions to perform this action.")], ephemeral: true });
        
        const channel = interaction.channel as TextChannel;

        await channel.bulkDelete(amount, true).then(messages => {
            interaction.reply({ embeds: [new SuccessEmbed(`Successfully deleted ${bold(`${messages.size}`)} messages from the channel.`)], ephemeral: false });
        });

        setTimeout(async () => {
            if (interaction.channel) {
                const channel = interaction.channel as TextChannel;
                await channel.bulkDelete(1, true)
            }
        }, 2000);
    }
}