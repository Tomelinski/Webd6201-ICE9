

namespace core {

  let linkData:string;

    function testFullName():void{
      let messageArea = $("#messageArea").hide();
  
      let fullNamePattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  
      $("#fullName").on("blur", function(){
  
        if (!fullNamePattern.test($(this).val().toString())) {
          //$(this).trigger("focus").trigger("select");
  
          messageArea.show().addClass("alert alert-danger").text("Please enter a valid full name");
        } else {
          messageArea.removeAttr("class").hide();
        }
      });

    }

    function textContactNumber():void{
      let messageArea = $("#messageArea").hide();
  
      let contactNumberPattern = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
  
      $("#contactNumber").on("blur", function(){
  
        if (!contactNumberPattern.test($(this).val().toString())) {
          //$(this).trigger("focus").trigger("select");
  
          messageArea.show().addClass("alert alert-danger").text("Please enter a valid contact number");
        } else {
          messageArea.removeAttr("class").hide();
        }
      });
    }

    function textEmailAddress(){
      let messageArea = $("#messageArea").hide();
  
      let emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
      $("#email").on("blur", function(){
  
        if (!emailAddressPattern.test($(this).val().toString())) {
          //$(this).trigger("focus").trigger("select");
  
          messageArea.show().addClass("alert alert-danger").text("Please enter a valid email address");
        } else {
          messageArea.removeAttr("class").hide();
        }
      });
    }

    function formValidation(){
      testFullName();
      textContactNumber();
      textEmailAddress();

    }

    function displayContact():void{
      formValidation();

      $("#sendButton").on("click", (event)=>{


        let subscribeCheckbox = $("#subsribeCheckBox")[0] as HTMLInputElement;
        let fullName = $("#fullName")[0] as HTMLInputElement;
        let contactNumber = $("#contactNumber")[0] as HTMLInputElement;
        let email = $("#email")[0] as HTMLInputElement;
        if(subscribeCheckbox.checked){

          let contact = new core.Contact(
            fullName.value,
            contactNumber.value,
            email.value
          );
            
            
            if (contact.serialize()) {
              let key = contact.FullName.substring(0,1) + Date.now();
              localStorage.setItem(
                key,
                contact.serialize()
              );
            }
          }
          location.href = "/contact";
      });
    }

    function displayContactList():void {

      authGuard();

      if (localStorage.length > 0) {
        let contactList = document.getElementById("contactList");

        let data:string;

        let keys = Object.keys(localStorage);

        let index = 0;

        for (const key of keys) {
          let contactData = localStorage.getItem(key);
          let contact = new core.Contact();

          contact.deserialize(contactData);

          data += `<tr>
            <th scope="row">${index}</th>
            <td>${contact.FullName}</td>
            <td>${contact.ContactNumber}</td>
            <td>${contact.EmailAddress}</td>
            <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
            <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
          </tr>`;

          index ++;
        }
        
        contactList.innerHTML = data;
        
        $("button.edit").on("click", function(){
          location.href = "/edit/" + $(this).val().toString();
        });
        //fix list when deleting
        $("button.delete").on("click", function(){
          if(confirm("Are you sure?")){
            localStorage.removeItem($(this).val().toString());
          }
          //loadLink("contact-list");
          location.href = "/contact-list";
        });
      }

      $("#addButton").on("click", function(){
        location.href = "/edit"
      });
    }

    function displayEdit():void{
      
      let key = $("body")[0].dataset.contactid;

      let contact = new core.Contact();

      if (key == undefined && key != ""){
        contact.deserialize(localStorage.getItem(key));
        
        $("#fullName").val(contact.FullName);
        $("#contactNumber").val(contact.ContactNumber);
        $("#email").val(contact.EmailAddress);
      }
      else
      {
        $("main>div>h1").text("Add Contact");
        $("#editButton").html(`<i class="fas fa-plus fa-lg"></i> Add`);
      }

      formValidation();

      $("#editButton").on("click", function(){
        //if(document.forms[0].checkValidity()){
          //create new key if emtpy
          if(key == ""){
            key = contact.FullName.substring(0,1) + Date.now();
          }
          
          //copy contact info into form to contact object
          contact.FullName = $("#fullName").val().toString();
          contact.ContactNumber = $("#contactNumber").val().toString();
          contact.EmailAddress = $("#email").val().toString();
          if (contact.serialize()){
            //add to local storage
            localStorage.setItem(key, contact.serialize());
          }
          linkData = "";
          location.href = "/contact-list";
        //}
      });

      $("#cancelButton").on("click", function(){
        location.href = "/contact-list";
      });
    }

    function displayLogin():void{


      let messageArea = $("#messageArea").hide();

      $("#loginButton").on("click", function(){
        let username = $("#username");
        let password = $("#password");
        let success = false;
        let newUser = new core.User()

        $.get("./Data/users.json", function(data){
          for (const user of data.users) {
            if (username.val() == user.Username && password.val() == user.Password) {
              newUser.fromJSON(user);
              success = true;
              break;
            }
          }

          if (success) {
            sessionStorage.setItem("user", newUser.serialize());
            
            messageArea.removeAttr("class").hide();
            location.href = "contact-list";
          }
          else
          {
            username.trigger("focus").trigger("select");
            messageArea.show().addClass("alert alert-danger").text("Error: Invalid login information");
          }
        });
      });


      $("#cancelButton").on("click", function(){

        document.forms[0].reset();
        location.href = "/home";
      });
    }

    function authGuard():void{
      if (!sessionStorage.getItem("user")) {
        //redirect to login page
        location.href = "/login";
      }
    }

    function PerformLogout():void{
      sessionStorage.clear();
      location.href = "/login";
    }

/**
 * this function associates a related callback to a route
 *
 * @param {string} activeLink
 * @return {function}  {Function}
 */

    function Start():void {
      console.log("App started...");

      let pageId = $("body")[0].getAttribute("id");
      switch (pageId) {
        case 'contact':
          displayContact();
          break;
        case 'contact-list':
          displayContactList();
          break;
        case 'edit':
          displayEdit();
          break;
        case 'login':
          displayLogin();
          break;
        case 'logout':
          PerformLogout();
          break;
      
        
      }
  }

  window.addEventListener("load", Start);

}
