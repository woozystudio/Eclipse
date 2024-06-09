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
        const role1 = interaction.options.getRole('role-1') as Role;
        const role2 = interaction.options.getRole('role-2') as Role;
        const role3 = interaction.options.getRole('role-3') as Role;
        const role4 = interaction.options.getRole('role-4') as Role;
        const role5 = interaction.options.getRole('role-5') as Role;
        
        await JoinRolesConfig.findOneAndUpdate({ GuildID: interaction.guild?.id }, { RoleID: [role1.id, role2.id, role3.id, role4.id, role5.id], }, { new: true, upsert: true });

        await interaction.reply({ content: `${inlineCode('✅')} The join-roles plugin has been successfully configured.` });
    }
}