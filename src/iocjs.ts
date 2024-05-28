import { IRegisterParams, Service } from "./types";
class IocContainer {
  #services: Map<string, Service>;
  #singletonInstances: Map<string, Service>;

  constructor() {
    // services is a map of service name to service definition.
    this.#services = new Map();

    // singletons is a map of service name to singleton service instances.
    this.#singletonInstances = new Map();
  }

  /*
   * Register a service with the container.
   * @param params - The function parameter object.
   * @param name - The name of the service.
   * @param definition - The service definition.
   * @param dependencies - The list of dependencies for the service.
   * @param singleton - Whether the service is a singleton.
   * @returns void
   */
  register(params: IRegisterParams) {
    const service = {
      definition: params.definition,
      dependencies: params.dependencies || [],
      singleton: params.singleton || false,
    };
    this.#services.set(params.name, service);
  }

  /*
   * Get a service instance from the container.
   * @param name - The name of the service.
   * @returns The service instance.
   */
  get(name: string) {
    const service = this.#services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }
    if (this.#isClass(service.definition)) {
      if (service.singleton) {
        const existingInstance = this.#singletonInstances.get(name);
        if (existingInstance) {
          return existingInstance;
        } else {
          const newInstance = this.#createInstance(service);
          this.#singletonInstances.set(name, newInstance);
          return newInstance;
        }
      }
      return this.#createInstance(service);
    } else {
      return service.definition;
    }
  }

  /*
   * Get the dependencies for a service.
   * @param service - The service.
   * @returns {array} dependency instances.
   */
  #getResolvedDependencies(service: Service) {
    const dependencies: object[] = [];
    if (service.dependencies) {
      service.dependencies.forEach((dependency) => {
        if (typeof dependency !== "string") {
          throw new Error(
            `Invalid dependency ${dependency} for service ${service}`
          );
        }
        dependencies.push(this.get(dependency));
      });
    }
    return dependencies;
  }

  /*
   * Check if a service definition is a class.
   * @param definition - The service definition.
   * @returns {boolean}
   */
  #isClass(definition: Service["definition"]) {
    return typeof definition === "function";
  }

  /*
   * Create an instance of a service.
   * @param service - The service.
   * @returns The service instance.
   */
  #createInstance(service: Service) {
    if (this.#isClass(service.definition)) {
      return new service.definition(...this.#getResolvedDependencies(service));
    } else {
      throw new Error(`Cannot create instance of non-class service ${service}`);
    }
  }
}

export default IocContainer;
