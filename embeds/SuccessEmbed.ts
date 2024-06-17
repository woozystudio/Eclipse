import { inlineCode } from 'discord.js';
import EmbedWrapper from './EmbedWrapper.js';
import Case from '../enums/Case.js';

export default class SuccessEmbed extends EmbedWrapper {
    constructor(description: string) {
        super();
        this.setDescription(`${Case.Success} ${description}`);
        this.setColor(0x43B582);
    }

    /**
     * @return {{embeds: EmbedWrapper[]}}
     */
    static message(description: string) {
        return new this(description).toMessage();
    }
}