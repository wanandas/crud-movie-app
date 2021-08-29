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
    const fetchMovies = flow(function* fetchMovie() {
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

    const getMovie = flow(function* getMovie(id: string) {
      try {
        const res = yield axios.get(`/movie/${id}`, {
          headers: {
            "x-access-token": getParent<any>(self).User.authToken,
          },
        });
        return res.data.movie;
      } catch (err) {
        console.error(err);
      }
    });

    const editMovie = flow(function* editMovie({
      id,
      title,
      yearReleased,
      rating,
    }: {
      id: string;
      title: string;
      yearReleased: string;
      rating: string;
    }) {
      try {
        yield axios.patch(
          `/movie/${id}`,
          { title, yearReleased: parseInt(yearReleased), rating },
          {
            headers: {
              "x-access-token": getParent<any>(self).User.authToken,
            },
          }
        );
      } catch (err) {
        console.error(err);
      }
    });

    const createMovie = flow(function* createMovie({
      title,
      yearReleased,
      rating,
    }: {
      title: string;
      yearReleased: string;
      rating: string;
    }) {
      try {
        yield axios.post(
          `/movies`,
          { title, yearReleased: parseInt(yearReleased), rating },
          {
            headers: {
              "x-access-token": getParent<any>(self).User.authToken,
            },
          }
        );
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
      if (role === "MANAGER") {
        try {
          yield axios.delete(`/movie/${movieId}`, {
            headers: {
              "x-access-token": getParent<any>(self).User.authToken,
            },
          });
        } catch (err) {
          console.error(err);
        }
      } else {
        alert("for manager only");
      }
    });

    return {
      fetchMovies,
      deleteMovie,
      getMovie,
      editMovie,
      createMovie,
    };
  });
