import { types } from "mobx-state-tree";

export const Movie = types.model({
  _id: types.identifier,
  title: types.string,
  yearReleased: types.number,
  rating: types.enumeration(["G", "PG", "M", "MA", "R"]),
});
