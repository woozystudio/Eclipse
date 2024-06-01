import { inlineCode } from 'discord.js';
import EmbedWrapper from './EmbedWrapper.js';

export default class ErrorEmbed extends EmbedWrapper {
    constructor(description: string) {
        super();
        this.setDescription(`${inlineCode("❌")} ${description}`);
        this.setColor(0xF04A47);
    }

    /**
     * @return {{embeds: EmbedWrapper[]}}
     */
    static message(description: string) {
        return new this(description).toMessage();
    }
}