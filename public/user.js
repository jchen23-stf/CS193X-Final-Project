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

  /* Returns an Object containing only the public instances variables (i.e. the ones sent to the API). */
  toJSON() {
    return {
      'id': this.id,
      'name': this.name,
      'avatarURL': this.avatarURL
    };
  }

  /* Save the current state (name and avatar URL) of the user to the server. */
  async save() {
    let payload = this.toJSON();
    let result = await apiRequest("PATCH", `/users/${this.id}`, payload);
  }

  /* Returns an Array of Post objects. Includes the user's own posts as well as those of users they are following. */
  async getFeed() {
    let result = await apiRequest("GET", `/feed`);
    let posts = result.posts;
    let ret = [];
    for (let post of posts) {
      ret.push(new Post(post));
    }
    return ret;
  }

  /* Create a new post with the given text. */
  async makePost(id, text, url) {
    let body = {
      "id" : id,
      "text": text,
      "url": url
    };
    let result = await apiRequest("POST", `/users/${id}/posts`, body);
    console.log(result)
  }

  /* Start following the specified user id. Throws an HTTPError if the specified user ID does not exist. */
  async addFollow(id) {
    let result = await apiRequest("POST", `/users/${this.id}/follow?target=${id}`);
  }

  /* Stop following the specified user id. Throws an HTTPError if the user isn't following them. */
  async deleteFollow(id) {
    let result = await apiRequest("DELETE", `/users/${this.id}/follow?target=${id}`);
  }
}