/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import md5 from "md5";
import React, { useEffect, useState } from "react";
import { GeolocationControl, Map, Placemark, YMaps } from "react-yandex-maps";
import { addPlace, getPlaces } from "./services/palces";

type StoredPlace = {
  coords: number[];
  name: string;
};
const styles = (theme: Theme) =>
  createStyles({
    contentWrapper: {
      width: "100%",
      height: "100%",
    },
    ymap: {
      width: "100%",
      height: "100%",
    },
  });

export interface ContentProps extends WithStyles<typeof styles> {}

function MapContent(props: ContentProps) {
  const { classes } = props;
  const [geolocation, setGeolocation] = useState([55.75, 37.57]); // Moscow
  const [places, setPlaces] = useState({});
  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition((position) => {
      setGeolocation([position.coords.latitude, position.coords.longitude]);
    });
    getPlaces((snapshot) => {
      setPlaces(snapshot.val());
    });
  }, []);
  const clickOnMap = (event: any) => {
    addPlace(md5(event.get("coords").join("")), "test", event.get("coords"));
  };
  return (
    <div className={classes.contentWrapper}>
      <YMaps className={classes.ymap}>
        <Map
          className={classes.ymap}
          defaultState={{ center: geolocation, zoom: 18 }}
          onClick={clickOnMap}
        >
          {Object.entries(places).map(([key, val]: any[]) => (
            <Placemark
              key={key}
              geometry={val.coords}
              options={{ preset: "islands#blueDogIcon" }}
            />
          ))}
          <Placemark
            geometry={geolocation}
            options={{ preset: "islands#redPersonCircleIcon" }}
          />
          <GeolocationControl options={{ float: "left" }} />
        </Map>
      </YMaps>
    </div>
  );
}

export default withStyles(styles)(MapContent);
