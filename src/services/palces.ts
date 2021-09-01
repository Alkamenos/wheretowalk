/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */

import { getDatabase, onValue, ref, set } from "firebase/database";

export function addPlace(id: string, title: string, coords: number[]) {
  const db = getDatabase();
  set(ref(db, "places/" + id), {
    title,
    coords,
  });
}

export function getPlaces(callback: (snapshot: any) => void) {
  const db = getDatabase();
  const starCountRef = ref(db, "places/");
  onValue(starCountRef, callback);
}
