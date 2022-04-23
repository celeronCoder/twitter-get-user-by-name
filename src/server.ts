import express, { Application, Response } from "express";
import bodyParser from "body-parser";
import { HttpLogger } from "./middlewares";
import { PORT } from "./constants";
import { router } from "./api";

const server: Application = express();

server.use(HttpLogger);
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());

server.use("/api/v1", router);

server.get(["/", "/api"], (_, res: Response) => res.redirect("/api/v1"));

server.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
