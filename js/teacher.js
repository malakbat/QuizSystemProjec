import { AuthService } from "./Services/AuthService.js";

const authService = new AuthService();
const currentUser = authService.getCurrentUser();

// הגנת דף - אם המשתמש לא מורה, נזרוק אותו לדף הבית
if (!currentUser || currentUser.role !== "teacher") {
  alert("גישה חסומה! דף זה מיועד למורים בלבד.");
  window.location.href = "index.html";
}

// הפעלת כפתור ההתנתקות
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    authService.logout();
    window.location.href = "index.html";
  });
}

// טעינת הלוגיקה המקורית של ה-App שבניתם בכיתה לניהול המבחנים
import "./app.js";