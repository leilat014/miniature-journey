import { Auth, ThenUpdate } from "@calpoly/mustang";
import type { Msg } from "./messages";
import type { Model } from "./model";
import { Traveler, Trip } from "server/models";

export default function update(
  msg: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  const [type, payload] = msg;

  switch (type) {

    case "profile/request": {
      const { userid } = payload;

      return [
        { ...model, profile: undefined }, 
        requestProfile(userid, user).then((profile) => [
          "profile/load",
          { profile },
        ]),
      ];
    }

    case "profile/load": {
      return {
        ...model,
        profile: payload.profile,
      };
    }

    case "journey/request": {
      const { journeyid } = payload;

      return [
        model,
        requestJourney(journeyid, user).then((journey) => [
          "journey/load",
          { journey },
        ]),
      ];
    }

    case "journey/load": {
      return {
        ...model,
        journey: payload.journey,
      };
    }

    default:
      return model;
  }
}

function requestProfile(userid: string, user: Auth.User): Promise<Traveler> {
  return fetch(`/api/travelers${userid}`, {
    headers: Auth.headers(user),
  })
    .then(r => r.json())
    .then(json => json as Traveler);
}

function requestJourney(journeyid: string, user: Auth.User): Promise<Trip> {
  return fetch(`/api/journey/${journeyid}`, {
    headers: Auth.headers(user),
  })
    .then(r => r.json())
    .then(json => json as Trip);
}

