import { ActivityType, Events, PresenceUpdateStatus } from "discord.js";
import Eclipse from "../../class/Eclipse";
import Event from "../../class/Event";
import i18next from "i18next";
import Backend from "i18next-fs-backend";
import 'colors';

export default class i18nextTranslations extends Event {
    constructor(client: Eclipse) {
        super(client, {
            name: Events.ClientReady,
            description: "i18nextTranslations Event",
            once: true
        })
    }

    async Execute() {
        i18next.use(Backend).init({
            backend: {
                loadPath: 'locales/{{lng}}/{{ns}}.json'
            },
            cleanCode: true,
            lng: 'en-US',
            preload: ['en-US', 'es-MX'],
            returnNull: false,
            returnEmptyString: false,
        });
        
        console.log(`Successfully loaded translations with i18next.`.magenta)
    }
}