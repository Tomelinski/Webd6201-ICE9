

namespace core {
  

  function addLinkEvents(){
    $("ul>li>a").off("click");
    $("ul>li>a").off("mouseover");

    $("ul>li>a").on("click", function(){
      sessionStorage.clear();

      loadLink($(this).attr("id"));
    });

    $("ul>li>a").on("mouseover", function(){
        $(this).css('cursor', 'pointer');
    });
  }

  /**
   * highlight the active link in the navbar
   * 
   * @param link 
   * @param data 
   */
  function highlightActiveLink(link:string):void{
    //remove old highlighted link
    $(`#${router.ActiveLink}`).removeClass("active");
    
    if (link == "logout") {
      sessionStorage.clear();
      router.ActiveLink = "login";
    }else{
      router.ActiveLink = link;
    }
    //highlight new active link
    $(`#${router.ActiveLink}`).addClass("active");
  }
  
  /**
   * this method switches page content relative to the link that is passed into the function
   * optionally, link data can also be passed
   *
   * @param {string} link
   * @param {string} [data=""]
   */
  function loadLink(link:string, data:string = ""):void{
    
    
    highlightActiveLink(link);
    router.LinkData = data;
    
    loadContent(router.ActiveLink, CallBack(router.ActiveLink));
    
    history.pushState({}, "", router.ActiveLink);
  }
  
  /**
 * inject nav bar into header element and highlight active link
 *
 * @param {string} pageName
 */
function loadHeader(pageName:string):void{
  //inject header
  $.get("./components/header.html", function(data){
    $("header").html(data);

    $(`#${pageName}`).addClass("active");

    addLinkEvents();
  });

}

/**
 *inject page into content section
 *
 * @param {string} pageName
 * @param {function} callback
 */
function loadContent(pageName:string, callback:Function):void{
  $.get(`./content/${pageName}.html`, function(data){
    $("main").html(data);
    displayLogout();
    callback();
  });

}
/**
 *this function loads the page footer
 *
 */
function loadFooter():void{
      //inject footer
      $.get("./components/footer.html", function(data){
        $("footer").html(data);
      });

    }

    function displayHome():void {
      router.ActiveLink = "home";

      

    }

    function displayAbout():void{
        
    }

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
          loadLink("contact");
      });
    }

    function displayServices():void{
        
    }

    function displayProjects():void{
        
    }

    function displayContactList():void {

      authGuard();


      //$("#contactListLink").attr("class", "nav-link");

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
          loadLink("edit", $(this).val().toString());
        });
        //fix list when deleting
        $("button.delete").on("click", function(){
          if(confirm("Are you sure?")){
            localStorage.removeItem($(this).val().toString());
          }
          loadLink("contact-list");
        });
      }

      $("#addButton").on("click", function(){
        loadLink("edit");
      });
    }

    function displayEdit():void{
      let key = router.LinkData;

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
          loadLink("contact-list");
        //}
      });

      $("#cancelButton").on("click", function(){
        loadLink("contact-list");
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

            loadLink("contact-list");
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
        loadLink("home");
      });
    }

    function displayRegister():void{

    }

    function displayLogout():void{
      let contactListLink = $("#contactListLink")[0];

      //logged in?
      if (sessionStorage.getItem("user")) {
        $("#loginListItem").html(
          `<a id="logout" class="nav-link" aria-current="page" href="#"><i class="fas fa-sign-out-alt fa-lg"></i> Logout</a>`
        );

        
        //add contact link if does not exist
        if(!contactListLink){
          $(`<li id="contactListLink" class="nav-item">
          <a id="contact-list" class="nav-link" aria-current="page"><i class="fas fa-users fa-lg"></i> Contact List</a>
          </li>`).insertBefore("#loginListItem");

        }

      }
      else{
        // $(`<li id="loginListItem" class="nav-item">
        // <a id="login" class="nav-link" aria-current="page" href="#"><i class="fas fa-sign-in-alt fa-lg"></i> Login</a>
        // </li>`).insertBefore("#loginListItem");
        $("#loginListItem").html(
          `<a id="login" class="nav-link" aria-current="page" href="#"><i class="fas fa-sign-in-alt fa-lg"></i> Login</a>`
        );

        //add contact link if exist
        if(contactListLink){
          $("#contactListLink").remove();

        }
      }

      addLinkEvents();
      highlightActiveLink(router.ActiveLink);
    }

    function authGuard():void{
      if (!sessionStorage.getItem("user")) {
        //redirect to login page
        loadLink("login");
      }
    }

    function display404():void{

    }
/**
 * this function associates a related callback to a route
 *
 * @param {string} activeLink
 * @return {function}  {Function}
 */
function CallBack(activeLink:string):Function{
      switch (activeLink) {
        case "home": return displayHome;
        case "about":  return displayAbout;
        case "contact": return displayContact;
        case "services": return displayServices;
        case "projects": return displayProjects
        case "contact-list": return displayContactList;
        case "edit": return displayEdit;
        case "login": return displayLogin;
        case "register": return displayRegister;
        case "404": return display404;
        default: 
          break;
      }
    }

    function Start():void {
      console.log("App started...");

      loadHeader(router.ActiveLink);
      loadContent(router.ActiveLink, CallBack(router.ActiveLink));
      loadFooter();

  }

  window.addEventListener("load", Start);

}
