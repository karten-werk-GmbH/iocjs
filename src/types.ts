export interface Service {
  definition: any;
  dependencies?: string[];
  singleton?: boolean;
}
