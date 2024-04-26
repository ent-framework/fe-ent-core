export interface WebType {
  framework: string;
  name: string;
  version: string;
  'js-types-syntax': string;
  contributions: Contributions;
}

export interface Contributions {
  html: Html;
}

export interface Html {
  'vue-components': Component[];
}

export interface Component {
  name: string;
  description?: string;
  'doc-url'?: string;
  source: Source;
  slots: Slot[];
  attributes: any[];
  props: Prop[];
  js: Js;
}

export interface Source {
  symbol: string;
}

export interface Slot {
  name: string;
  'doc-url': string;
  description: string;
  type?: string;
  'description-sections'?: DescriptionSections;
}

export interface DescriptionSections {
  since: string;
}

export interface Prop {
  name: string;
  'doc-url'?: string;
  type?: string;
  description?: string;
  default?: string;
  'description-sections'?: DescriptionSections;
}

export interface Js {
  events: Event[];
}

export interface Event {
  name: string;
  'doc-url': string;
  type?: string;
  description?: string;
  default?: string;
  'description-sections'?: DescriptionSections;
}
