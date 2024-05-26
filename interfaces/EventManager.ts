import { Events } from "discord.js";

export default interface EventManager {
    name: Events;
    description: string;
    once: boolean;
}