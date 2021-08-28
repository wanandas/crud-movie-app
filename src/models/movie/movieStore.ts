import axios from "axios";
import { applySnapshot, flow, Instance, types } from "mobx-state-tree";
import { Movie } from "./movie";

interface movieStoreProps extends Instance<typeof MovieStore> {}

export const MovieStore = types
  .model("MovieStore", {
    loaded: types.boolean,
    endpoint: "http://localhost:5000/api",
    movies: types.optional(types.array(Movie), []),
  })
  .actions((self) => {
    const fetchMovie = flow(function* fetchMovie() {
      return yield axios.get(`${self.endpoint}/movies`).then((res) => {
        applySnapshot(self.movies, res.data.movies);
      });
    });

    return {
      fetchMovie,
    };
  });
