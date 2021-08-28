import i18n from "i18next";
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { LanguagePacks } from "./locales/";
import { Languages } from "./constants/configuration.constants";
// import { Languages } from "./constants/configuration.constants";

i18n
    .use(Backend)
    .use(initReactI18next)
    .init({
        react: {
            useSuspense: false
        },
        keySeparator: "::",
        interpolation: {
            // React already does escaping
            escapeValue: false,
        },
        lng: Languages.Turkish,
        fallbackLng: Languages.Turkish,
        resources: {
            [Languages.English]: {
                translation: LanguagePacks[Languages.English]
            },
            [Languages.Turkish]: {
                translation: LanguagePacks[Languages.Turkish]
            },
        },
    })

export default i18n