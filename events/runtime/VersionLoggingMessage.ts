import { Events, TextChannel } from "discord.js";
import Eclipse from "../../class/Eclipse";
import Event from "../../class/Event";

export default class VersionLogging extends Event {
    constructor(client: Eclipse) {
        super(client, {
            name: Events.ClientReady,
            description: "VersionLogging Event",
            once: true
        })
    }

    async Execute() {
        const version = this.client.version;
        const channel = await this.client.channels.cache.get(this.client.config.versionLogging) as TextChannel;

        channel.send({ content: `${this.client.development ? "Eclipse Canary" : "Eclipse"} ${this.client.development ? version.canaryStableVersion : version.stableVersion} has been restarted, this time running ${this.client.development ? version.canaryState : version.state} ${this.client.development ? version.canaryVersion : version.version}${version.channel ? ` on the **${this.client.development ? version.canaryChannel : version.channel}** channel.` : "."}` })
    }
}