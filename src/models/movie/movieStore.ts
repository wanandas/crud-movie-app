import axios from "axios";
import {
  applySnapshot,
  flow,
  getParent,
  Instance,
  types,
} from "mobx-state-tree";
import { Movie } from "./movie";

interface movieStoreProps extends Instance<typeof MovieStore> {}

export const MovieStore = types
  .model("MovieStore", {
    loaded: types.boolean,
    movies: types.optional(types.array(Movie), []),
  })
  .actions((self) => {
    const fetchMovie = flow(function* fetchMovie() {
      try {
        self.loaded = true;
        const res = yield axios.get(`/movies`, {
          headers: {
            "x-access-token": getParent<any>(self).User.authToken,
          },
        });
        self.loaded = false;
        applySnapshot(self.movies, res.data.movies);
      } catch (err) {
        console.error(err);
      }
    });

    const deleteMovie = flow(function* deleteMovie({
      movieId,
      role,
    }: {
      movieId: string;
      role: string;
    }) {
      try {
        yield axios.delete(`/movie/${movieId}`, {
          headers: {
            "x-access-token": getParent<any>(self).User.authToken,
          },
        });
      } catch (err) {
        console.error(err);
      }
    });

    return {
      fetchMovie,
      deleteMovie,
    };
  });
