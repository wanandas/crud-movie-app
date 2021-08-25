import { Instance, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { MovieStore } from "./movieStore";

export type RootInstance = Instance<typeof RootModel>;

const RootModel = types.model({
  MovieStore: MovieStore,
});

// store init
export const initialState = RootModel.create({
  MovieStore: {
    loaded: false,
  },
});

const RootStoreContext = createContext<null | RootInstance>(null);

// NOTE Provider for useContext
export const Provider = RootStoreContext.Provider;

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
