/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */

import { getDatabase, onValue, ref, set } from "firebase/database";

export function addPlace(
  id: string,
  title: string,
  from: string,
  to: string,
  breeds: string,
  coords: number[]
) {
  const db = getDatabase();
  set(ref(db, "places/" + id), {
    title,
    coords,
    from,
    to,
    breeds,
  });
}

export function getPlaces(callback: (snapshot: any) => void) {
  const db = getDatabase();
  const starCountRef = ref(db, "places/");
  onValue(starCountRef, callback);
}
