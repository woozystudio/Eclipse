import { inlineCode } from 'discord.js';
import EmbedWrapper from './EmbedWrapper.js';

export default class SuccessEmbed extends EmbedWrapper {
    constructor(description: string) {
        super();
        this.setDescription(`${inlineCode("✅")} ${description}`);
        this.setColor(0x43B582);
    }

    /**
     * @return {{embeds: EmbedWrapper[]}}
     */
    static message(description: string) {
        return new this(description).toMessage();
    }
}