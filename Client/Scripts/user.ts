"use strict";
//User class
namespace core{


  export class User {

    private m_displayName:string;
    private m_username:string;
    private m_emailAddress:string;
    private m_password:string;

    //getters and setters
    get DisplayName():string {
      return this.m_displayName;
    }
    set DisplayName(value:string) {
      this.m_displayName = value;
    }
    get Username():string {
      return this.m_username;
    }
    set Username(value:string) {
      this.m_username = value;
    }
    get EmailAddress():string {
      return this.m_emailAddress;
    }
    set EmailAddress(value:string) {
      this.m_emailAddress = value;
    }
    get Password():string {
      return this.m_password;
    }
    set Password(value:string) {
      this.m_password = value;
    }
    
    /**
     * 
     * @param {*} displayName 
     * @param {*} username 
     * @param {*} emailAddress 
     * @param {*} password 
     */
    constructor(displayName ="", username="", emailAddress="", password="") {
      this.m_displayName= displayName;
      this.m_username = username;
      this.m_emailAddress = emailAddress;
      this.m_password = password;
    }
  
    
    public toString():string {
      return `Display Name: ${this.m_displayName} 
  Username: ${this.m_username}
  Email Address: ${this.m_emailAddress}`;
    }

    /**
     *this method takes a json object and assigns them to User info
     *
     * @param {object} data
     * @memberof User
     */
    public toJSON():object{
        return{
            "DisplayName":this.DisplayName,
            "Username":this.Username,
            "EmailAddress":this.EmailAddress,
        }
    }
/**
 *
 *
 * @param {*} data
 * @return {void}
 */
public fromJSON(data:any):void{
      this.DisplayName = data.DisplayName;
      this.Username = data.Username;
      this.EmailAddress = data.EmailAddress;
      this.Password = data.Password;
    }

    /**
     *this method converts the User into a comma-seperate string
     *
     * @return {string} 
     * @memberof User
     */
    public serialize() :string{
        if(this.DisplayName !== "" && this.Username !== "" && this.EmailAddress !== "" && this.Password !== ""){
            return `${this.m_displayName},${this.m_username},${this.m_emailAddress}`;
        } else {
            console.error("User is empty");
            return null;
        }
    }

    /**
     * this method takes a comma-seperate data string and assigns values to the User class
     *
     * @param {string} data
     * @return {void}
     */
    public deserialize(data:string):void{
        let propertyArray = data.split(",");
        this.DisplayName = propertyArray[0];
        this.Username = propertyArray[1];
        this.EmailAddress = propertyArray[2];
    }
  }

}