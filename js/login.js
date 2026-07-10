import { AuthService } from "./Services/AuthService.js";
const authService = new AuthService();

const loginForm = document.getElementById("loginForm");
const alertMsg = document.getElementById("alertMsg");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;

    // קריאה לשירות האימות
    const result = authService.login(username, password);

    alertMsg.classList.remove("d-none", "alert-success", "alert-danger");

    if (result.success) {
      alertMsg.classList.add("alert-success");
      alertMsg.textContent = "התחברות הצליחה! מנתב לעמוד המתאים...";
      
      // בדיקת תפקיד והפניה לעמוד המתאים לפי דרישות המרצה
      setTimeout(() => {
        if (result.user.role === "teacher") {
          window.location.href = "teacher.html";
        } else {
          window.location.href = "student.html";
        }
      }, 1500);
    } else {
      alertMsg.classList.add("alert-danger");
      alertMsg.textContent = result.message;
    }
  });
}