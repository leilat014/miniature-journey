import express, { Request, Response } from "express";
import { Traveler } from "../models/traveler";
import Travelers from "../services/traveler-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Travelers.index()
    .then((list: Traveler[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  Travelers.get(userid)
    .then((traveler: Traveler) => res.json(traveler))
    .catch((err) => res.status(404).send(err));
});

router.post("/", (req: Request, res: Response) => {
  const newTraveler = req.body;

  Travelers.create(newTraveler)
    .then((traveler: Traveler) => res.status(201).json(traveler))
    .catch((err) => res.status(500).send(err));
});

router.put("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;
  const newTraveler = req.body;

  Travelers.update(userid, newTraveler)
    .then((traveler: Traveler) => res.json(traveler))
    .catch((err) => res.status(404).end());
});

router.delete("/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  Travelers.remove(userid)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
