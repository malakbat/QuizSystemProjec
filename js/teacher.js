import { AuthService } from "./Services/AuthService.js";

const auth = new AuthService();

const currentUser = auth.getCurrentUser();

if (!currentUser) {

    location.href = "login.html";

}

document
.getElementById("logoutBtn")
.addEventListener("click", () => {

    auth.logout();

    location.href = "index.html";

});