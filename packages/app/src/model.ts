import { Trip, Traveler } from "server/models";

export interface Model {
  journey?: Trip;
  profile?: Traveler;
}

export const init: Model = {};