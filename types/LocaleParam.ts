const data = {
    locale: 'en-US'
}

export default class LocaleConfig {
    private static _localeParam: string = data.locale;

    public static get localeParam(): string {
        return LocaleConfig._localeParam;
    }
}

export const LocaleParam = LocaleConfig.localeParam