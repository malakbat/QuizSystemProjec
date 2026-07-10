import { UserService } from "./Services/UserService.js";
import { AuthService } from "./Services/AuthService.js";

const userService = new UserService();
const authService = new AuthService();

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    const user = userService.getUser(username, password);

    if (!user) {

        alert("Wrong username or password");

        return;

    }

    authService.login(user);

    if (user.role === "teacher") {

window.location.href="teacherDashboard.html";
    }

    else {

        window.location.href = "student.html";

    }

});