export class AuthService {

    constructor() {

        this.storageKey = "currentUser";

    }

    login(user) {

        localStorage.setItem(

            this.storageKey,

            JSON.stringify(user)

        );

    }

    logout() {

        localStorage.removeItem(this.storageKey);

    }

    getCurrentUser() {

        const data = localStorage.getItem(this.storageKey);

        if (!data)

            return null;

        return JSON.parse(data);

    }

    isLoggedIn() {

        return this.getCurrentUser() != null;

    }

}