import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Travelers from "./services/traveler-svc";
import travelers from "./routes/travelers";
import auth, { authenticateUser } from "./routes/auth";
import path from "path";

connect("miniature-journey");

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));
app.use(express.json());

app.use("/api/travelers", authenticateUser, travelers);

app.use("/auth", auth);

app.use(express.static(path.resolve(__dirname, "../../proto")));

app.get("/travelers/:userid", (req: Request, res: Response) => {
  const { userid } = req.params;

  Travelers.get(userid).then((data: any) => {
    if (data)
      res.set("Content-Type", "application/json").send(JSON.stringify(data));
    else res.status(404).send();
  });
});
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
