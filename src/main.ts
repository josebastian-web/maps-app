import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import Mapboxgl from 'mapbox-gl';

Mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZS1sYWdvcyIsImEiOiJjbTJ1bnhpZzEwM2JqMmtxNnRxdWxjbnl3In0.hlE8_txW9hUHtvlt_JovqQ';


// Evitamos renderizar la aplicación si no tiene geolocation
if ( !navigator.geolocation ) {
  alert('Navegador no soporta Geolocation');
  throw new Error('Navegador no soporta Geolocation');
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
