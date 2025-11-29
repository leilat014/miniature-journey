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
var traveler_svc_exports = {};
__export(traveler_svc_exports, {
  default: () => traveler_svc_default
});
module.exports = __toCommonJS(traveler_svc_exports);
var import_mongoose = require("mongoose");
const TravelerSchema = new import_mongoose.Schema(
  {
    userid: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    home: { type: String, required: true, trim: true },
    plannedTrips: { type: Number, required: true },
    bio: { type: String, required: false, trim: true }
  },
  { collection: "travelers" }
);
const TravelerModel = (0, import_mongoose.model)(
  "Profile",
  TravelerSchema
);
function index() {
  return TravelerModel.find();
}
function get(userid) {
  return TravelerModel.find({ userid }).then((list) => list[0]).catch((err) => {
    throw `${userid} Not Found`;
  });
}
function create(json) {
  const t = new TravelerModel(json);
  return t.save();
}
function update(userid, traveler) {
  return TravelerModel.findOneAndUpdate({ userid }, traveler, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${userid} not updated`;
    else return updated;
  });
}
function remove(userid) {
  return TravelerModel.findOneAndDelete({ userid }).then(
    (deleted) => {
      if (!deleted) throw `${userid} not deleted`;
    }
  );
}
var traveler_svc_default = { index, get, create, update, remove };
