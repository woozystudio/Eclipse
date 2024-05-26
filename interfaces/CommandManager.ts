export default interface CommandManager {
    name: string;
    description: string;
    options: object;
    userPermissions: bigint;
}