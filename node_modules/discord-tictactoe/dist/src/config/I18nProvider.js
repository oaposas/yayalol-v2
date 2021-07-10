"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nProvider = void 0;
const i18n_1 = require("i18n");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class I18nProvider {
    constructor() {
        const localesPath = path_1.default.join(__dirname, '..', '..', '..', 'config', 'locales');
        const files = fs_1.default.readdirSync(localesPath);
        this.instance = new i18n_1.I18n();
        this.instance.configure({
            locales: files.map(file => path_1.default.basename(file, '.json')),
            defaultLocale: 'en',
            directory: localesPath,
            objectNotation: true,
            updateFiles: false
        });
    }
    setLanguage(locale) {
        this.instance.setLocale(locale);
    }
    __(id, replacements) {
        return this.translate(id, replacements);
    }
    getLanguage() {
        return this.instance.getLocale();
    }
    translate(id, replacements) {
        return this.instance.__mf(id, replacements);
    }
}
exports.I18nProvider = I18nProvider;
