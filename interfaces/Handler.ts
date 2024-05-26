export default interface Handler {
    createEventsListener(): void;
    createCommandsListener(): void;
}