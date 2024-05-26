import { Collection } from "discord.js";
import Configuration from "./Configuration";
import Command from "../class/Command";
import SubCommand from "../class/SubCommand";

export default interface Bot {
    config: Configuration;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;

    Init(): void;
    AddListeners(): void;
}