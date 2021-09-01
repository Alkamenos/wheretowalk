/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */
import React, { useEffect, useState } from "react";
import { Map, YMaps } from "react-yandex-maps";

const Main = () => {
  const [geolocation, setGeolocation] = useState([55.75, 37.57]); // Moscow
  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition((position) => {
      setGeolocation([position.coords.latitude, position.coords.longitude]);
    });
  });
  return (
    <div>
      <YMaps>
        <Map defaultState={{ center: geolocation, zoom: 14 }} />
      </YMaps>
    </div>
  );
};

export default Main;
