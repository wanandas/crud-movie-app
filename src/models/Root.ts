import { Instance, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { MovieStore } from "./movie/movieStore";
import { User } from "./user/user";

export type RootInstance = Instance<typeof RootModel>;

export const RootModel = types
  .model({
    MovieStore: MovieStore,
    User: User,
  })
  .actions((self) => {
    return {
      afterCreate() {
        if (localStorage.getItem("currentUser") !== null) {
          self.User = JSON.parse(localStorage.getItem("currentUser") as string);
        }
        if (self.User.authToken) {
          self.MovieStore.fetchMovie();
        }
      },
    };
  });

// store init
export const initialState = RootModel.create({
  MovieStore: {
    loaded: false,
  },
  User: {},
});

const RootStoreContext = createContext<null | RootInstance>(null);

// NOTE Provider for useContext
export const Provider = RootStoreContext.Provider;

export function useStore() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
