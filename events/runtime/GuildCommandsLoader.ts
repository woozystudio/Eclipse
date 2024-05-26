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
        const clientId = this.client.development ? this.client.config.canaryBotId : this.client.config.botId;
        const rest = new REST().setToken(this.client.config.token);

        if(!this.client.development) {
            const globalCommands: any = await rest.put(Routes.applicationCommands(clientId), {
                body: this.GetJson(this.client.commands.filter(command => !command.development))
            });

            console.log(`Successfully loaded ${globalCommands.length} global application commands.`.yellow)
        }

        const devCommands: any = await rest.put(Routes.applicationGuildCommands(clientId, this.client.config.guildId), {
            body: this.GetJson(this.client.commands.filter(command => command.development))
        });

        console.log(`Successfully loaded ${devCommands.length} development application commands.`.red)
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