import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { defaultLocale, locales, type Locale } from './config';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value as Locale | undefined;
  
  if (localeCookie && locales.includes(localeCookie)) {
    return {
      locale: localeCookie,
      messages: (await import(`./locales/${localeCookie}.json`)).default,
    };
  }

  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().substring(0, 2))
      .find((lang) => locales.includes(lang as Locale)) as Locale | undefined;
    
    if (preferredLocale) {
      return {
        locale: preferredLocale,
        messages: (await import(`./locales/${preferredLocale}.json`)).default,
      };
    }
  }

  return {
    locale: defaultLocale,
    messages: (await import(`./locales/${defaultLocale}.json`)).default,
  };
});
