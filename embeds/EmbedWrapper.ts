import { EmbedBuilder } from 'discord.js';

export default class EmbedWrapper extends EmbedBuilder {
    toMessage() {
        return { embeds: [this] };
    }
}