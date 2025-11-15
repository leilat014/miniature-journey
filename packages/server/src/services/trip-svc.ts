import { Schema, model } from "mongoose";
import { Trip } from "../models/trip";

const TripSchema = new Schema<Trip>(
  {
    id: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: String,
    status: {
      type: String,
      required: true,
      enum: ["planned", "in-progress", "completed"],
      default: "planned",
    },
    travelers: [String],
    itinerary: [
      {
        day: Number,
        activities: String,
        location: String,
      },
    ],
    budget: Number,
    notes: String,
  },

  { collection: "trips" }
);

const TripModel = model<Trip>("Trip", TripSchema);

function index(): Promise<Trip[]> {
  return TripModel.find();
}

function get(id: String): Promise<Trip> {
  return TripModel.find({ id })
    .then((list) => list[0])
    .catch((err) => {
      throw `${id} Not Found`;
    });
}

export default { index, get };
