"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var trip_svc_exports = {};
__export(trip_svc_exports, {
  default: () => trip_svc_default
});
module.exports = __toCommonJS(trip_svc_exports);
var import_mongoose = require("mongoose");
const TripSchema = new import_mongoose.Schema(
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
      default: "planned"
    },
    travelers: [String],
    itinerary: [
      {
        day: Number,
        activities: String,
        location: String
      }
    ],
    budget: Number,
    notes: String
  },
  { collection: "trips" }
);
const TripModel = (0, import_mongoose.model)("Trip", TripSchema);
function index() {
  return TripModel.find();
}
function get(id) {
  return TripModel.find({ id }).then((list) => list[0]).catch((err) => {
    throw `${id} Not Found`;
  });
}
var trip_svc_default = { index, get };
