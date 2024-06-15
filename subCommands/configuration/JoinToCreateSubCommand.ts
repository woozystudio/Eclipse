import { CategoryChannel, ChatInputCommandInteraction, TextChannel, inlineCode } from "discord.js";
import SubCommand from "../../class/SubCommand";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import JoinToCreateConfig from "../../database/JoinToCreateConfig";

export default class JoinToCreate extends SubCommand {
    constructor(client: Eclipse) {
        super(client, {
            name: "join-to-create",
            category: Category.Configuration,
            command: "config",
            group: ""
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const channel = interaction.options.getChannel('channel') as TextChannel;
        const category = interaction.options.getChannel('category') as CategoryChannel;
        
        await JoinToCreateConfig.findOneAndUpdate({ GuildID: interaction.guild?.id }, { ChannelID: channel.id, ParentID: category.id }, { new: true, upsert: true });

        await interaction.reply({ content: `${inlineCode('✔️')} The join to create plugin has been successfully configured.`, ephemeral: true });
    }
}