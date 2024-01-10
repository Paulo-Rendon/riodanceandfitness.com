var source = document.getElementById("enrollScript").src;

function enrollMember(class_num, EID, admin){
    var popupForm = document.getElementById('message');
    popupForm.innerHTML = "<form class=\"formField\"><h1>Login</h1><label for=\"fname\">Enter your first name:</label><input type=\"text\" class=\"form-control\" id=\"fname\" name=\"fname\" placeholder=\"Enter your First Name...\"><label for=\"lname\">Enter your last name:</label><input type=\"text\" class=\"form-control\" id=\"lname\" name=\"lname\" placeholder=\"Enter your Last Name...\"><label for=\"tel\">Enter your phone number:</label><input type=\"tel\" class=\"form-control\" id=\"phonen\" name=\"phonen\" placeholder=\"Enter your phone number...\" pattern=\"[1-9][0-9]{9}\" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required><a class=\"nav_button_2\" onClick=\"enrollMemberSubmit(" + class_num + ", " + EID + ", " + admin + ")\">Submit</a></form>";
    togglePopup();
    
    var tele = document.querySelector('#phonen');

    tele.addEventListener('keyup', function(e){
        if (event.key != 'Backspace' && (tele.value.length === 3 || tele.value.length === 7)){
            tele.value += '-';
        }
    });
}

function enrollMemberSubmit(classID, EID, admin){
    var firstname = document.getElementById('fname').value;
    var lastname = document.getElementById('lname').value;
    var phonenum = document.getElementById('phonen').value.match(/\d/g);
    phonenum = phonenum.join("");
    var response = document.getElementById('message');
    if(firstname == "")
        firstname = "Jane";
    if(lastname == "")
        lastname = "Doe";
    if(!numberValidate(phonenum)){
        window.alert("You must provide a valid phone number");
        return false;
    }
    
    $.ajax({
        type: "POST",
        url: source + "/../client_php/reg_person.php",
        data: {CID: classID, firstname : firstname, lastname : lastname, phonenumber : phonenum},
        success: function(res){
               if(res == 0)
                    response.innerHTML = "<h1>Success!!</h1><p>You have successfully enrolled for this class.</p><p>See you there!</p>";
                else if(res == 1)
                    response.innerHTML = "<h1>You are already enlisted in this class!</h1>";
            
                else if(res == 2)
                    response.innerHTML = "<h1>Class is Full!</h1>";
                else
                    response.innerHTML = "<h1>There was a problem!!</h1> <p>Please contact me at 925-818-5754</p>";
            if(admin){
                showClasses(EID);
                showParticipants(classID);
            }
                else
                getClasses(EID);
        }
    });
}

function numberValidate(num){
    return (num.toString().length == 10);
}