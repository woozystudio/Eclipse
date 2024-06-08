import { ChatInputCommandInteraction, Role, TextChannel, inlineCode } from "discord.js";
import SubCommand from "../../class/SubCommand";
import Eclipse from "../../class/Eclipse";
import Category from "../../enums/Category";
import JoinRolesConfig from "../../database/JoinRolesConfig";

export default class JoinRoles extends SubCommand {
    constructor(client: Eclipse) {
        super(client, {
            name: "join-roles",
            category: Category.Configuration,
            command: "config",
            group: ""
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const role = interaction.options.getRole('role') as Role;
        
        await JoinRolesConfig.findOneAndUpdate({ GuildID: interaction.guild?.id }, { RoleID: role.id, }, { new: true, upsert: true });

        await interaction.reply({ content: `${inlineCode('✅')} The join-roles plugin has been successfully configured.` });
    }
}