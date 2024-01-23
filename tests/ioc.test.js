import IocContainer from "../src/IocContainer";
import { it, expect, beforeEach } from "vitest";

let container = null;
class Dummy {
  constructor() {
    this.value = 1;
  }
}
beforeEach(() => {
  container = new IocContainer();
});

it("should create a class instance.", () => {
  container.register({ name: "dummy", definition: Dummy });
  const dummyInstance = container.get("dummy");

  expect(dummyInstance.value).toBe(1);
});

it("should create a transient.", () => {
  container.register({ name: "dummy", definition: Dummy });
  const dummy1 = container.get("dummy");
  const dummy2 = container.get("dummy");

  dummy1.value = 2;
  const areEqual = dummy1 === dummy2;

  expect(areEqual).toBe(false);
  expect(dummy1.value).toBe(2);
  expect(dummy2.value).toBe(1);
});

it("should resolve a transient with dependencies.", () => {
  const configObj = { test: "config test" };
  class ConfigClass {
    constructor(configObj) {
      this.configObj = configObj;
    }
  }
  container.register({ name: "configObj", definition: configObj });
  container.register({
    name: "configClass",
    definition: ConfigClass,
    dependencies: ["configObj"],
  });
  const configInstance = container.get("configClass");

  expect(configInstance.configObj.test).toBe("config test");
});

it("should resolve a singleton.", () => {
  container.register({ name: "dummy", definition: Dummy, singleton: true });
  const instance1 = container.get("dummy");

  expect(instance1.value).toBe(1);

  instance1.value = 2;
  const instance2 = container.get("dummy");
  const areEqual = instance1 === instance2;

  expect(instance2.value).toBe(2);
  expect(areEqual).toBe(true);
});

it("should resolve a transient with a singleton dependency.", () => {
  class Singleton {
    constructor() {
      this.value = 1;
    }
  }
  class SingletonDependency {
    constructor(singleton) {
      this.singleton = singleton;
    }
  }
  container.register({
    name: "singleton",
    definition: Singleton,
    singleton: true,
  });
  container.register({
    name: "singletonDependency",
    definition: SingletonDependency,
    dependencies: ["singleton"],
  });

  const singletonDepInstance1 = container.get("singletonDependency");

  expect(singletonDepInstance1.singleton.value).toBe(1);

  singletonDepInstance1.singleton.value = 2;

  expect(singletonDepInstance1.singleton.value).toBe(2);

  const singletonDepInstance2 = container.get("singletonDependency");

  expect(singletonDepInstance2.singleton.value).toBe(2);

  const areEqual =
    singletonDepInstance1.singleton === singletonDepInstance2.singleton;

  expect(areEqual).toBe(true);
});
