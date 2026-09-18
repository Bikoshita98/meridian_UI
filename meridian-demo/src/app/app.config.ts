import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideMeridianIcons } from '@meridian/ui/icon';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideMeridianIcons()],
};
