import { ExampleCollectionFunction } from "../types";

export const plugin: ExampleCollectionFunction = () => {
  return { status: "stable", icon: "background", related: ["FdImage"] };
};
