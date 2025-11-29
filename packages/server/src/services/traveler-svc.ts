import { Schema, model } from "mongoose";
import { Traveler } from "../models/traveler";

const TravelerSchema = new Schema<Traveler> (
    {
        userid: { type: String, required: true, trim: true},
        name: { type: String, required: true, trim: true},
        home: { type: String, required: true, trim: true},
        plannedTrips: { type: Number, required: true},
        bio: { type: String, required: false, trim: true}
    },
    { collection: "travelers"}
);

const TravelerModel = model<Traveler> (
    "Profile",
    TravelerSchema
);

function index(): Promise<Traveler[]> {
    return TravelerModel.find();
}

function get(userid: String): Promise<Traveler> {
    return TravelerModel.find({ userid })
     .then((list) => list[0])
     .catch((err) => {
        throw `${userid} Not Found`;
     });
}

function create(json: Traveler): Promise<Traveler> {
    const t = new TravelerModel(json);
    return t.save();
}

function update(
  userid: String,
  traveler: Traveler
): Promise<Traveler> {
  return TravelerModel.findOneAndUpdate({ userid }, traveler, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${userid} not updated`;
    else return updated as Traveler;
  });
}

function remove(userid: String): Promise<void> {
  return TravelerModel.findOneAndDelete({ userid }).then(
    (deleted) => {
      if (!deleted) throw `${userid} not deleted`;
    }
  );
}

export default { index, get, create, update, remove};
