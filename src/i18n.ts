import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./localization/en.json";
import uk from "./localization/uk.json";
import de from "./localization/de.json";
import fr from "./localization/fr.json";
import es from "./localization/es.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            uk: { translation: uk },
            de: { translation: de },
            fr: { translation: fr },
            es: { translation: es },
        },
        lng: "en", // мова за замовчуванням
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });

export default i18n;
