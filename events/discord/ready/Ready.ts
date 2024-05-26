import { ActivityType, Events, PresenceUpdateStatus } from "discord.js";
import Eclipse from "../../../class/Eclipse";
import Event from "../../../class/Event";
import 'colors';

export default class Ready extends Event {
    constructor(client: Eclipse) {
        super(client, {
            name: Events.ClientReady,
            description: "ClientReady Event",
            once: true
        })
    }

    async Execute() {
        console.log(`Logged as ${this.client.user?.tag}`.green);
        this.client.user?.setPresence({ activities: [{ name: `${this.client.development ? "Canary v0.0.2" : "Use /help for help!"}`, type: ActivityType.Custom }], status: PresenceUpdateStatus.Idle })
    }
}