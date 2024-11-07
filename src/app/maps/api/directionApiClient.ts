import { HttpClient, HttpHandler } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DirectionApiClient extends HttpClient {

  public baseUrl: string = 'https://api.mapbox.com/directions/v5/mapbox/driving';

  constructor( handler: HttpHandler) {
    // nos permite usar las peticiones http para injectarlas
    super(handler);
  }
  // override = sobreescribir
  public override get<T>(url: string) {
    url = this.baseUrl + url;

    return super.get<T>( url, {
      params: {
        alternatives: false,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        steps: false,
        access_token: environment.apiKey,
      }
    });
  }

}


