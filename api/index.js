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
  res.json({ db: DATABASE_NAME, numUsers: Users.find().count(), numPosts: Posts.find().count() });
});

api.get("/users", async (req, res) => {
  let users = await Users.find().toArray();
  res.json({ users });
});

api.use("/users/:id", async (req, res, next) => {
  let id = req.params.id;
  let user = await Users.findOne({ id });

  if (!user) {
    res.status(404).json({ error: `No user with ID ${id}` });
    return;
  }

  res.locals.user = user;
  next();
});

api.get("/users/:id", (req, res) => {
  let { user } = res.locals;
  delete user._id;
  res.json({ user });
});

export default initApi;
