import { Collection } from "discord.js";
import Configuration from "./Configuration";

export default interface Bot {
    config: Configuration;

    Init(): void;
    AddListeners(): void;
}