"use strict";

class Author {
  #nickname;
  #email;
  #avatar;
  constructor(nickname, email, avatar){

    if(nickname === ""){
      throw new EmptyValueException("nickname");
    }
    if(email === ""){
      throw new EmptyValueException("email");
    }
    this.#nickname = nickname;
    this.#email = email;
    this.#avatar = avatar;
  }

  get nickname(){
    return this.#nickname;
  }

  set nickname(nickname){
    this.#nickname = nickname;
  }

  get email(){
    return this.#email;
  }

  set email(email){
    this.#email = email;
  }

  get avatar(){
    if(this.#avatar){
      return this.#avatar;
    }
    return null;
  }

  set avatar(avatar){
    this.#avatar = avatar;
  }
}
Object.defineProperty(Author.prototype, "#nickname", {enumerable: true});
Object.defineProperty(Author.prototype, "#email", {enumerable: true});
Object.defineProperty(Author.prototype, "#avatar", {enumerable: true});
