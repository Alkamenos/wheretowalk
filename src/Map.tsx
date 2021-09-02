/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import md5 from "md5";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Clusterer,
  GeolocationControl,
  Map,
  Placemark,
  withYMaps,
} from "react-yandex-maps";
import { addPlace, getPlaces } from "./services/palces";

type StoredPlaceData = {
  from: string;
  to: string;
  breed: string;
};
type StoredPlace = {
  [key: string]: StoredPlaceData;
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

// export interface ContentProps extends WithStyles<typeof styles> {
//
// }

// type ContentProps = WithStyles<typeof styles> ;

function MapContent(props: any) {
  const { classes, ymaps } = props;
  const [geolocation, setGeolocation] = useState([55.75, 37.57]); // Moscow
  const [pointDialogState, setPointDialogState]: [any, any] = useState({
    open: false,
    place: {},
  });
  const [places, setPlaces]: [StoredPlace, Dispatch<SetStateAction<{}>>] =
    useState({});
  useEffect(() => {
    navigator?.geolocation?.getCurrentPosition((position) => {
      setGeolocation([position.coords.latitude, position.coords.longitude]);
    });
    getPlaces((snapshot) => {
      setPlaces(snapshot.val());
    });
  }, []);

  useEffect(() => {
    if (ymaps) {
      console.log(ymaps);
    }
  }, [ymaps]);
  const clickOnMap = async (event: any) => {
    const nearbyPalces = await ymaps.geocode(event.get("coords"), {
      kind: "house",
    });
    const street = nearbyPalces.geoObjects.get(0);
    const name = street.properties.get("name");
    addPlace(
      md5(event.get("coords").join("")),
      name,
      "18:00",
      "22:00",
      "Собака кусака",
      event.get("coords")
    );
  };

  const handlePlaceClick = (event: any) => {
    if (event.originalEvent.target.properties._data.id) {
      const id = event.originalEvent.target.properties._data.id as string;
      const place = places[id];
      console.log(place);
      setPointDialogState({ open: true, place });
    }
  };

  const handlePointDialogOpen = () => {
    setPointDialogState({ open: false, place: {} });
  };

  const handlePointDialogClose = () => {
    setPointDialogState({ open: false, place: {} });
  };

  return (
    <div className={classes.contentWrapper}>
      <Map
        className={classes.ymap}
        defaultState={{ center: geolocation, zoom: 18 }}
        onClick={clickOnMap}
      >
        {places && (
          <Clusterer
            options={{
              preset: "islands#invertedVioletClusterIcons",
              groupByCoordinates: false,
            }}
          >
            {Object.entries(places).map(([key, val]: any[]) => (
              <Placemark
                onClick={handlePlaceClick}
                key={key}
                geometry={val.coords}
                properties={{ id: key }}
                options={{ preset: "islands#blueDogIcon" }}
              />
            ))}
          </Clusterer>
        )}
        <Placemark
          geometry={geolocation}
          options={{ preset: "islands#redPersonCircleIcon" }}
        />
        <GeolocationControl options={{ float: "left" }} />
      </Map>
      <Dialog
        open={pointDialogState.open}
        onClose={handlePointDialogClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Место для выгула
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Адрес: {pointDialogState.place.title}</p>
            <p>
              Время: <b>{pointDialogState.place.from}</b>-
              <b>{pointDialogState.place.to}</b>
            </p>
            <p>Замечены породы собак: {pointDialogState.place.breeds}</p>

            <Typography variant="subtitle2" color="secondary">
              Пожалуйста убирайте за своей собакой
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handlePointDialogClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(withYMaps(MapContent, true, ["geocode"]));
