import { ChatInputCommandInteraction, DiscordAPIError, Events, ShardEventTypes, ShardEvents, TextChannel, heading } from "discord.js";
import Eclipse from "../../class/Eclipse";
import Event from "../../class/Event";

export default class ErrorLogging extends Event {
    constructor(client: Eclipse) {
        super(client, {
            name: Events.Error,
            description: "ErrorLogging Event",
            once: true
        })
    }

    async Execute() {
        const channel = await this.client.channels.cache.get(this.client.config.errorLogging) as TextChannel;
        
        this.client.on('error', error => {
            channel.send({ content: `${heading(`${error.name}: ${error.message}`, 3)} \n${error.stack}` });
        });
        
    }
}