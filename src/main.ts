import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//fix to work in stackbliz as its working locally fine but not in stackbliz
import 'zone.js'

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
