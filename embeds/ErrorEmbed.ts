import EmbedWrapper from './EmbedWrapper.js';

export default class ErrorEmbed extends EmbedWrapper {
    constructor(description: string) {
        super();
        this.setDescription(description);
        this.setColor("Red");
    }

    /**
     * @return {{embeds: EmbedWrapper[]}}
     */
    static message(description: string) {
        return new this(description).toMessage();
    }
}