
//contact class
namespace core{


  export class Contact {

    //instance variavles
    private m_fullName:string;
    private m_contactNumber:string;
    private m_emailAddress:string;

    //getters and setters
    get FullName():string {
      return this.m_fullName;
    }
    set FullName(value:string) {
      this.m_fullName = value;
    }
    get ContactNumber():string {
      return this.m_contactNumber;
    }
    set ContactNumber(value:string) {
      this.m_contactNumber = value;
    }
    get EmailAddress():string {
      return this.m_emailAddress;
    }
    set EmailAddress(value:string) {
      this.m_emailAddress = value;
    }
    
    /**
     * contact class
     * 
     * Creates an instance of Contact.
     * @param {string} [fullName=""]
     * @param {string} [contactNumber=""]
     * @param {string} [emailAddress=""]
     * @memberof Contact
     */
    constructor(fullName ="", contactNumber="", emailAddress="") {
      this.m_fullName = fullName;
      this.m_contactNumber = contactNumber;
      this.m_emailAddress = emailAddress;
    }
  
    /**
     *overrides the built in toString method
     *
     * @return {*} 
     * @memberof Contact
     */
    public toString():string {
      return `Full Name: ${this.m_fullName} 
  Contact Number: ${this.m_contactNumber}
  Email Address: ${this.m_emailAddress}`;
    }

    /**
     *this method takes a json object and assigns them to contact info
     *
     * @param {object} data
     * @memberof Contact
     * @returns {JSON}
     */
    public toJSON():object{
        return{
            "FirstName":this.FullName,
            "ContactNumber":this.ContactNumber,
            "Email":this.EmailAddress,
        }
    }

    /**
     *this method takes a json object and assigns them to contact info
     *
     * @param {object} data
     * @returns {void}
     */
    public fromJSON(data:any):void{
      this.FullName = data.FullName;
      this.ContactNumber = data.ContactNumber;
      this.EmailAddress = data.Email;
    }

    /**
     *this method converts the contacts into a comma-seperate string
     *
     * @return {string} 
     * @memberof Contact
     */
    public serialize() :string{
        if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== ""){
            return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
        } else {
            console.error("contact is empty");
            return null;
        }
    }

    /**
     * this method takes a comma-seperate data string and assigns values to the contact class
     *
     * @param {string} data
     * @return {void}
     */
    public deserialize(data:string): void{
        let propertyArray:string[] = data.split(",");
        this.FullName = propertyArray[0];
        this.ContactNumber = propertyArray[1];
        this.EmailAddress = propertyArray[2];
    }
  }

}