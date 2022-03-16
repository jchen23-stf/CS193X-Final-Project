import User, {Post} from "./user.js";

class App {
    constructor() {
        this.app = null;
        this._user = null;
        this._posts = null;
        this._displayPost = this._displayPost.bind(this);
        this._onSignUp = this._onSignUp.bind(this);
        this._onPost = this._onPost.bind(this);
        this._onSubmitPost = this._onSubmitPost.bind(this);
        this._onClosePost = this._onClosePost.bind(this);
        this._onCloseSignup = this._onCloseSignup.bind(this);
        this._onSubmitSignup = this._onSubmitSignup.bind(this);
    }
    async setup() {
        // add listeners to the buttons 
        let post_button = document.querySelector(".post_btn");
        post_button.addEventListener("click", this._onPost);
        let close_post_button = document.querySelector(".post_close_btn");
        close_post_button.addEventListener("click", this._onClosePost);
        let post_submit_button = document.querySelector(".post_submit_btn");
        post_submit_button.addEventListener("click", this._onSubmitPost);
    
        let signup_button = document.querySelector(".signup_btn");
        signup_button.addEventListener("click", this._onSignUp);
        let close_signup_button = document.querySelector(".signup_close_btn");
        close_signup_button.addEventListener("click", this._onCloseSignup);
        let submit_signup_button = document.querySelector(".signup_submit_btn");
        submit_signup_button.addEventListener("click", this._onSubmitSignup);
    }

    async load() {
        document.querySelector("#feed").textContent = "";
        this._posts = await User.getFeed();
        console.log(this._posts)
        for (let post of this._posts) {
            this._displayPost(post);
        }
        document.querySelector(".form-popup").style.display = "none";
    }

    _displayPost(post) {
        let elem = document.querySelector(".templatePost").cloneNode(true);
        elem.querySelector(".title").textContent = post.text;
        elem.querySelector(".title").setAttribute('href', post.url);
        elem.querySelector(".name").textContent = post.id;
        elem.querySelector(".time").textContent = post.time.toLocaleString();
        elem.classList.add("post");
        elem.classList.remove("templatePost");
        document.querySelector("#feed").append(elem);
    }

    _onPost() {
        document.querySelector("#signup_form").style.display = "none";
        document.querySelector("#post_form").style.display = "flex";
    }

    _onSignUp(){
        document.querySelector("#post_form").style.display = "none";
        document.querySelector("#signup_form").style.display = "flex";
    }

    async _onSubmitPost(event) {
        event.preventDefault();
        let form = document.querySelector("#post_form");
        let id = form.querySelector("#input_id").value;
        let headline = form.querySelector("#input_headline").value;
        let article_url = form.querySelector("#input_url").value;
        let result = await User.makePost(id, headline, article_url);
        console.log(result)
        this.load()
    }

    _onClosePost() {
        document.querySelector("#post_form").style.display = "none";
    }

    _onCloseSignup(){
        document.querySelector("#signup_form").style.display = "none";
    }

    async _onSubmitSignup(event){
        event.preventDefault();
        let form = document.querySelector("#signup_form");
        let id = form.querySelector("#input_id").value;
        let email = form.querySelector("#input_email").value;
        this._user = await User.loadOrCreate(id);
    }
}

let app = new App();
app.setup()
app.load()