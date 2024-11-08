import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionApiClient } from '../api';
import { DirectionResponse, Route } from '../interfaces/direction';

@Injectable({
  providedIn: 'root'
})
export class MapService {


  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  constructor(
    private directionApi: DirectionApiClient,
  ) {}

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords:LngLatLike) {
    if ( !this.isMapReady) throw Error('El mapa no está inicializado');

    this.map?.flyTo({
      zoom: 14,
      center: coords,
    })
  }

  createMarkersFromPlaces( places: Feature[], userLocation: [number, number] ) {

    if ( !this.map ) throw Error('Mapa no inicializado');

    this.markers.forEach( marker => marker.remove() );
    const newMarkers = [];

    for (const place of places) {
      const [ lng , lat ] = place.center;
      const popup = new Popup()
      .setHTML(`
        <h6>${ place.text }</h6>
        <span>${ place.place_name }</span>
      `);
      const newMarger = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo( this.map );

      newMarkers.push( newMarger );
    }
    this.markers = newMarkers;

    if ( places.length === 0 ) return;

    // Limites del mapa
    const bounds = new LngLatBounds();

    newMarkers.forEach( marker => bounds.extend(marker.getLngLat() ));

    bounds.extend(userLocation);

    this.map.fitBounds(bounds, {
      padding: 200
    })

  }

  getRouteBetweenPoints( star: [number, number], end: [number, number]) {

    this.directionApi.get<DirectionResponse>(`/${ star.join(',')};${ end.join(',') }`)
      .subscribe( resp => this.drawPolyline( resp.routes[0] ) );

  }

  private drawPolyline(route: Route) {
    console.log({ kms: route.distance / 1000, duration: route.duration / 60 });

    if ( !this.map ) throw Error('Mapa no inicializado');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();

    coords.forEach( ([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map?.fitBounds( bounds, {
      padding: 200,
    });

    // Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            }
          }
        ]
      }
    };

    // Limpiamos la linea
    if ( this.map.getLayer('RouteString') ) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    // RouteString es el id
    this.map.addSource('RouteString', sourceData);

    this.map.addLayer({
      // No es necesariamente el mismo que el de addSource
      // Este es el id del layer
      id: 'RouteString',
      type: 'line',
      // Este RouteString si tiene que ver con el de addSource
      source: 'RouteString',
      layout: {
        // las '' van donde las prop van con -
        // por que va en contra las definiciones de objetos liretales de javascript
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 3
      },
    });


  }


}
