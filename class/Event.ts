import { Events } from "discord.js";
import Eclipse from "../class/Eclipse";
import EventManager from "../types/EventManager";
import EventListener from "../types/EventListener";

export default class Event implements EventListener {
    client: Eclipse;
    name: Events;
    description: string;
    once: boolean;
    
    constructor(client: Eclipse, on: EventManager) {
        this.client = client;
        this.name = on.name;
        this.description = on.description;
        this.once = on.once;
    }

    Execute(...args: any): void {};
}