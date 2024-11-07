export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:                   string;
  type:                 string;
  place_type:           string[];
  relevance:            number;
  properties:           Properties;
  text_es:              string;
  language_es?:         Language;
  place_name_es:        string;
  text:                 string;
  language?:            Language;
  place_name:           string;
  bbox?:                number[];
  center:               number[];
  geometry:             Geometry;
  context:              Context[];
  matching_text?:       string;
  matching_place_name?: string;
}

export interface Context {
  id:           ID;
  mapbox_id:    MapboxID;
  wikidata?:    Wikidata;
  short_code?:  ShortCode;
  text_es:      string;
  language_es?: Language;
  text:         string;
  language?:    Language;
}

export enum ID {
  Country8751 = "country.8751",
  Locality9824815 = "locality.9824815",
  Place1894447 = "place.1894447",
  Postcode1797679 = "postcode.1797679",
  Region82991 = "region.82991",
}

export enum Language {
  Es = "es",
}

export enum MapboxID {
  DXJuOm1IeHBsYzpBVVF2 = "dXJuOm1ieHBsYzpBVVF2",
  DXJuOm1IeHBsYzpHMjR2 = "dXJuOm1ieHBsYzpHMjR2",
  DXJuOm1IeHBsYzpIT2D2 = "dXJuOm1ieHBsYzpIT2d2",
  DXJuOm1IeHBsYzpJaTg = "dXJuOm1ieHBsYzpJaTg",
  DXJuOm1IeHBsYzpsZW92 = "dXJuOm1ieHBsYzpsZW92",
}

export enum ShortCode {
  Cl = "cl",
  ClAr = "CL-AR",
}

export enum Wikidata {
  Q2176 = "Q2176",
  Q298 = "Q298",
  Q51590 = "Q51590",
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  mapbox_id?:  MapboxID;
  wikidata?:   Wikidata;
  foursquare?: string;
  landmark?:   boolean;
  address?:    string;
  category?:   string;
  maki?:       string;
  accuracy?:   string;
}
