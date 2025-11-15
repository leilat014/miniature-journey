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

export default { index, get};