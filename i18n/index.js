import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

import ptBR from './locales/pt-BR';

i18n.fallbacks = true;
i18n.defaultLocale = 'pt-BR';
i18n.translations = {
  'pt-BR': ptBR,
};
i18n.locale = Localization.locale;

export default i18n;
