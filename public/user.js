import apiRequest from "./api.js";

/* A small class to represent a Post */
export class Post {
  /* data is the post data from the API. */
  constructor(data) {
    this.time = new Date(data.time);
    this.id = data.id
    this.text = data.text;
    this.url = data.url;
  }
}

/* A data model representing a user of the app. */
export default class User {
  /* Returns an array of user IDs */
  static async listUsers() {
    let data = await apiRequest("GET", "/users");
    return data.users;
  }

  /* Returns a User object, creating the user if necessary. */
  static async loadOrCreate(id) {
    let user_ids = await this.listUsers();
    if (!user_ids.includes(id)) {
      let body = {
        "id": id
      };
      let post_res = await apiRequest("POST", "/users", body);
    }
    let get_res = await apiRequest("GET", `/users/${id}`);
    let new_user = new User(get_res);
    return new_user;
  }

  constructor(data) {
    Object.assign(this, data);
  }

  /* Returns an Array of Post objects. Includes the user's own posts as well as those of users they are following. */
  static async getFeed() {
    let result = await apiRequest("GET", `/feed`);
    let posts = result.posts;
    let ret = [];
    for (let post of posts) {
      ret.push(new Post(post));
    }
    return ret;
  }

  /* Create a new post with the given text. */
  static async makePost(id, text, url) {
    let body = {
      "id" : id,
      "text": text,
      "url": url
    };
    let result = await apiRequest("POST", `/users/${id}/posts`, body);
  }
}