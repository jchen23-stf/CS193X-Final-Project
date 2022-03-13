import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { MongoClient } from "mongodb";

let DATABASE_NAME = "final_project";

const api = express.Router();
let conn = null;
let db = null;
let Users = null;
let Posts = null;

const initApi = async app => {
  app.set("json spaces", 2);
  app.use("/api", api);
  conn = await MongoClient.connect("mongodb://localhost");
  db = conn.db(DATABASE_NAME);
  Users = db.collection("user");
  Posts = db.collection("post");
};

api.use(bodyParser.json());
api.use(cors());

api.get("/", (req, res) => {
  res.json({ db: DATABASE_NAME });
});

export default initApi;
