import axios from "axios";
import { applySnapshot, flow, Instance, types } from "mobx-state-tree";
import { Movie } from "./movie";

interface movieStoreProps extends Instance<typeof MovieStore> {}

export const MovieStore = types
  .model("MovieStore", {
    loaded: types.boolean,
    endpoint: "https://api.themoviedb.org/3",
    movies: types.optional(types.array(Movie), []),
  })
  .views((self) => {
    return {
      get totalMovies() {
        return self.movies.length;
      },
    };
  })
  .actions((self) => {
    const fetchMovie = flow(function* fetchMovie() {
      return yield axios
        .get(
          `${self.endpoint}/search/movie?api_key=1d0e0b022289a6699e950679a97ee686&query=a&page=1`
        )
        .then((res) => {
          applySnapshot(self.movies, res.data.results);
        });
    });

    return {
      fetchMovie,
      afterCreate() {
        fetchMovie();
      },
    };
  });
