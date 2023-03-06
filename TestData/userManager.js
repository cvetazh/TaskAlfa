import usersJson from './user.json';

class User {
  constructor(login, password) {
    this.login = login;
    this.password = password;
  }
}

export const user1 = new User(usersJson.users.user1.login, usersJson.users.user1.password);
