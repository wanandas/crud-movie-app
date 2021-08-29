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
        const res = yield axios.get(`${process.env.REACT_APP_API}/movies`, {
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

    return {
      fetchMovie,
    };
  });
