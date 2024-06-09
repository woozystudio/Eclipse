import { ChatInputCommandInteraction, Events, GuildMember, Role, inlineCode } from "discord.js";
import Event from "../../../class/Event";
import Eclipse from "../../../class/Eclipse";
import JoinRolesConfig from "../../../database/JoinRolesConfig";

export default class GuildMemberAdd extends Event {
    constructor(client: Eclipse) {
        super(client, {
            name: Events.GuildMemberAdd,
            description: "GuildMemberAdd Event",
            once: false
        });
    }

    async Execute(member: GuildMember) {
        const data = await JoinRolesConfig.findOne({ GuildID: member.guild?.id });
        if(!data) return;
        
        data.RoleID.forEach(async role => {
            const roles = member.guild.roles.cache.get(`${role}`) as Role;
            await member.roles.add(roles);
        });
    }
}