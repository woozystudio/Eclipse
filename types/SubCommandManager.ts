import Category from "../enums/Category";

export default interface SubCommandManager {
    command: string;
    group: string;
    name: string;
    category: Category;
}