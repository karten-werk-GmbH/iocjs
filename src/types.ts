export interface Service {
  definition: any;
  dependencies?: string[];
  singleton?: boolean;
}

export interface IRegisterParams extends Service {
  name: string;
}
