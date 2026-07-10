import { User } from "./models/User.js";

import { UserService } from "./Services/UserService.js";

const service = new UserService();

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", () => {

    const fullName = document.getElementById("fullName").value;

    const idNumber = document.getElementById("idNumber").value;

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const role = document.getElementById("role").value;

    if (

        fullName == "" ||

        username == "" ||

        password == ""

    ){

        alert("Fill all fields");

        return;

    }

    const user = new User(

        fullName,

        idNumber,

        username,

        password,

        role

    );

    service.saveUser(user);

    alert("Registered Successfully");

    location.href = "login.html";

});