import { Trip, Traveler } from "server/models";

export type Msg =
  | [
      "profile/save",
      {
        userid: string;
        profile: Traveler;
      },
      {
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]
  | ["profile/load", { userid: string; profile: Traveler }]
  | ["profile/request", { userid: string }]
  | ["profile/load", { profile: Traveler }]
  | ["journey/request", { journeyid: string }]
  | ["journey/load", { journey: Trip }]
  | Cmd;
type Cmd = ["profile/load", { userid: string; profile: Traveler }];
