import { User } from "../models/User.js";

export class UserService {

    constructor() {

        this.storageKey = "users";

    }

    getAllUsers() {

        const data = localStorage.getItem(this.storageKey);

        if (!data) {

            return [];

        }

        const plainUsers = JSON.parse(data);

        return plainUsers.map(userData => {

            const user = new User(

                userData.fullName,

                userData.idNumber,

                userData.username,

                userData.password,

                userData.role

            );

            user.id = userData.id;

            return user;

        });

    }

    saveUser(user) {

        const users = this.getAllUsers();

        users.push(user);

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(users)

        );

    }

    getUser(username, password) {

        const users = this.getAllUsers();

        return users.find(user =>

            user.username === username &&

            user.password === password

        );

    }

}