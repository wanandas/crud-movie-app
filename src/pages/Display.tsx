import React from "react";
import { Observer } from "mobx-react-lite";
import { useMst } from "../models/Root";

function Display() {
  const { MovieStore } = useMst();

  return (
    <Observer>
      {() => (
        <>
          {MovieStore.movies.map((x) => {
            return <h1 key={x.id}>{x.title}</h1>;
          })}
        </>
      )}
    </Observer>
  );
}

export default Display;
