import { Auth, ThenUpdate } from "@calpoly/mustang";
import type { Msg } from "./messages";
import type { Model } from "./model";
import { Traveler, Trip } from "server/models";

export default function update(
  msg: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  const [type, payload, callbacks] = msg;

  switch (type) {
case "profile/save": {
  const { userid } = payload;
  return [
    model,
    saveProfile(payload, user, callbacks || {})
      .then((profile) => ["profile/load", { userid, profile }] as Msg)
  ];
}
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
    .then((r) => r.json())
    .then((json) => json as Traveler);
}

function requestJourney(journeyid: string, user: Auth.User): Promise<Trip> {
  return fetch(`/api/journey/${journeyid}`, {
    headers: Auth.headers(user),
  })
    .then((r) => r.json())
    .then((json) => json as Trip);
}

function saveProfile(
  msg: {
    userid: string;
    profile: Traveler;
  },
  user: Auth.User,
  callbacks: { onSuccess?: () => void; onFailure?: (err: Error) => void }
): Promise<Traveler> {
  return fetch(`/api/travelers/${msg.userid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.profile)
  })
    .then((response: Response) => {
      if (response.status === 200) return response.json();
      throw new Error(`Failed to save profile for ${msg.userid}`);
    })
    .then((json: unknown) => {
      if (json) {
        if (callbacks.onSuccess) callbacks.onSuccess();
        return json as Traveler;
      }
      throw new Error(`No JSON in API response`);
    })
    .catch((err) => {
      if (callbacks.onFailure) callbacks.onFailure(err);
      throw err;
    });
}
