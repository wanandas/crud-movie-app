import { types } from "mobx-state-tree";

export const Movie = types.model({
  poster_path: types.string,
  adult: types.boolean,
  overview: types.string,
  release_date: types.string,
  genre_ids: types.array(types.number),
  id: types.number,
  original_title: types.string,
  original_language: types.string,
  title: types.string,
  backdrop_path: types.string,
  popularity: types.number,
  vote_count: types.number,
  video: types.boolean,
  vote_average: types.number,
});

// export const Movie = types.model({
//   id: types.identifier,
//   title: types.string,
//   yearReleased: types.number,
//   rating: types.enumeration(["G", "PG", "M", "MA", "R"]),
// });
