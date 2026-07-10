import { AuthService } from "./Services/AuthService.js";

const authService = new AuthService();

const registerForm = document.getElementById("registerForm");
const alertMsg = document.getElementById("alertMsg");

if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // מניעת רענון הדף

    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value;
    const role = document.getElementById("regRole").value;

    // קריאה לשירות ההרשמה שכתבנו
    const result = authService.register(username, password, role);

    // הצגת הודעה מתאימה למשתמש
    alertMsg.classList.remove("d-none", "alert-success", "alert-danger");
    
    if (result.success) {
      alertMsg.classList.add("alert-success");
      alertMsg.textContent = result.message + " מעביר לדף ההתחברות...";
      registerForm.reset();
      
      // מעבר אוטומטי לדף הלוגין לאחר 2 שניות
      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    } else {
      alertMsg.classList.add("alert-danger");
      alertMsg.textContent = result.message;
    }
  });
}