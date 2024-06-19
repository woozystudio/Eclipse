import Category from "../enums/Category";

export default interface CommandManager {
    name: string;
    description: string;
    category: Category;
    options: object;
    userPermissions: bigint;
    development: boolean;
}