import Handler from "../types/Handler";
import path from "path";
import { glob } from "glob";
import Eclipse from "./Eclipse";
import Event from "./Event";
import Command from "./Command";
import SubCommand from "./SubCommand";
import Button from "./Button";
import ContextMenu from "./ContextMenu";
import SelectMenu from "./SelectMenu";

export default class Listeners implements Handler {
    client: Eclipse;
    constructor(client: Eclipse) {
        this.client = client;
    }

    async createEventsListener() {
        const files = (await glob(`build/events/**/*.js`)).map(filePath => path.resolve(filePath));

        files.map(async (file: string) => {
            const event: Event = new(await import(file)).default(this.client);

            if(!event.name)
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have name`);

            const execute = (...args: any) => event.Execute(...args);


            //@ts-ignore
            if(event.once) this.client.once(event.name, execute);
            //@ts-ignore
            else this.client.on(event.name, execute);

            return delete require.cache[require.resolve(file)];
        });
    }

    async createCommandsListener() {
        const files = (await glob(`build/commands/**/*.js`)).map(filePath => path.resolve(filePath));

        files.map(async (file: string) => {
            const command: Command | SubCommand = new(await import(file)).default(this.client);

            if(!command.name)
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have a valid name.`);

            if(command instanceof SubCommand)
                return this.client.subCommands.set(command.name, command);
            
            this.client.commands.set(command.name, command as Command);

            return delete require.cache[require.resolve(file)]
        });
    }

    async createSubCommandsListener() {
        const files = (await glob(`build/subCommands/**/*.js`)).map(filePath => path.resolve(filePath));

        files.map(async (file: string) => {
            const command: SubCommand = new(await import(file)).default(this.client);

            if(!command.name && !command.command)
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have a valid name.`);

            if(!command.group)
                this.client.subCommands.set(command.command + "." + command.name, command as SubCommand);

            else this.client.subCommands.set(command.command + "." + command.group + "." + command.name, command as SubCommand);

            return delete require.cache[require.resolve(file)]
        });
    }

    async createButtonInteractions() {
        const files = (await glob(`build/buttons/**/*.js`)).map(filePath => path.resolve(filePath));

        files.map(async (file: string) => {
            const button: Button = new(await import(file)).default(this.client);

            if(!button.custom_id)
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have a valid id.`);

            this.client.buttons.set(button.custom_id, button as Button);

            return delete require.cache[require.resolve(file)]
        });
    }
    
    async createSelectMenuInteractions() {
        const files = (await glob(`build/selectMenus/**/*.js`)).map(filePath => path.resolve(filePath));

        files.map(async (file: string) => {
            const selectMenu: SelectMenu = new(await import(file)).default(this.client);

            if(!selectMenu.custom_id)
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have a valid id.`);

            this.client.selectMenus.set(selectMenu.custom_id, selectMenu as SelectMenu);

            return delete require.cache[require.resolve(file)]
        });
    }

    async createContextMenuCommandsInteractions() {
        const files = (await glob(`build/contextMenus/**/*.js`)).map(filePath => path.resolve(filePath));

        files.map(async (file: string) => {
            const contextMenu: ContextMenu = new(await import(file)).default(this.client);

            if(!contextMenu.name)
                return delete require.cache[require.resolve(file)] && console.log(`${file.split("/").pop()} does not have a valid name.`);
            
            this.client.contextMenus.set(contextMenu.name, contextMenu as ContextMenu);

            return delete require.cache[require.resolve(file)]
        });
    }
}