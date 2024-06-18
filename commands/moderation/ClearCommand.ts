import { ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember, PermissionFlagsBits, TextChannel, User, bold } from "discord.js";
import Command from "../../class/Command";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import ErrorEmbed from "../../embeds/ErrorEmbed";
import SuccessEmbed from "../../embeds/SuccessEmbed";
import { LocaleParam } from "../../types/LocaleParam";

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
                },
                {
                    name: "target",
                    description: "Select a user to delete their messages specifically.",
                    required: false,
                    type: ApplicationCommandOptionType.User
                }
            ],
            development: false,
            locale: LocaleParam
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const amount = interaction.options.getInteger('amount') as number;
        const target = interaction.options.getUser('target') as User;
        const channel = interaction.channel as TextChannel;
        
        const messages = await channel.messages.fetch({ limit: amount + 80 });
        
        if(target) {
            const member = await interaction.guild?.members.fetch(target.id) as GuildMember;
            if (!member) return await interaction.reply({ embeds: [new ErrorEmbed("The user mentioned is no longer within the server.")], ephemeral: true });

            let i = 0;
            const filtered: any = [];

            messages.filter((msg) => {
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered, true).then(messages => {
                interaction.reply({ embeds: [new SuccessEmbed(`Successfully deleted ${bold(`${messages.size}`)} messages from ${target}.`)], ephemeral: false });
            });
            
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                interaction.reply({ embeds: [new SuccessEmbed(`Successfully deleted ${bold(`${messages.size}`)} messages from the channel.`)], ephemeral: true });
            });
        }
    }
}