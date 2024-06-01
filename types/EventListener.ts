import { Events } from "discord.js";
import Eclipse from "../class/Eclipse";

export default interface EventListener {
    client: Eclipse;
    name: Events;
    description: string;
    once: boolean;
}