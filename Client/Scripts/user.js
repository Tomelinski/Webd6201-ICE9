"use strict";
var core;
(function (core) {
    class User {
        constructor(displayName = "", username = "", emailAddress = "", password = "") {
            this.m_displayName = displayName;
            this.m_username = username;
            this.m_emailAddress = emailAddress;
            this.m_password = password;
        }
        get DisplayName() {
            return this.m_displayName;
        }
        set DisplayName(value) {
            this.m_displayName = value;
        }
        get Username() {
            return this.m_username;
        }
        set Username(value) {
            this.m_username = value;
        }
        get EmailAddress() {
            return this.m_emailAddress;
        }
        set EmailAddress(value) {
            this.m_emailAddress = value;
        }
        get Password() {
            return this.m_password;
        }
        set Password(value) {
            this.m_password = value;
        }
        toString() {
            return `Display Name: ${this.m_displayName} 
  Username: ${this.m_username}
  Email Address: ${this.m_emailAddress}`;
        }
        toJSON() {
            return {
                "DisplayName": this.DisplayName,
                "Username": this.Username,
                "EmailAddress": this.EmailAddress,
            };
        }
        fromJSON(data) {
            this.DisplayName = data.DisplayName;
            this.Username = data.Username;
            this.EmailAddress = data.EmailAddress;
            this.Password = data.Password;
        }
        serialize() {
            if (this.DisplayName !== "" && this.Username !== "" && this.EmailAddress !== "" && this.Password !== "") {
                return `${this.m_displayName},${this.m_username},${this.m_emailAddress}`;
            }
            else {
                console.error("User is empty");
                return null;
            }
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.Username = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
    }
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map