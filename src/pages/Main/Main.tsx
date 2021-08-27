import React from "react";
import { Map, YMaps } from "react-yandex-maps";

const Main = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <YMaps>
        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
      </YMaps>
    </div>
  );
};

export default Main;
