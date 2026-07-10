export class User {
    constructor(fullName, idNumber, username, password, role) {

        this.id = crypto.randomUUID();

        this.fullName = fullName;

        this.idNumber = idNumber;

        this.username = username;

        this.password = password;

        // teacher / student
        this.role = role;
    }
}