import { Collection, Events, REST, Routes } from "discord.js";
import Eclipse from "../../class/Eclipse";
import Event from "../../class/Event";
import 'colors';
import Command from "../../class/Command";

export default class Ready extends Event {
    constructor(client: Eclipse) {
        super(client, {
            name: Events.ClientReady,
            description: "ClientReady Event",
            once: true
        })
    }

    async Execute() {
        const clientId = this.client.config.botId;
        const guildId = this.client.config.guildId;
        const rest = new REST().setToken(this.client.config.token);

        const guildCommands: any = await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: this.GetJson(this.client.commands.filter(command => command))
        });

        console.log(`Successfully loaded ${guildCommands.length} guild application commands.`.red)
    }

    private GetJson(commands: Collection<string, Command>): object[] {
        const data: object[] = [];

        commands.forEach(command => {
            data.push({
                name: command.name,
                description: command.description,
                options: command.options,
                default_member_permissions: command.default_member_permissions.toString()
            })
        });

        return data;
    }
}