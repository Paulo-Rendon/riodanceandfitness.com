window.addEventListener('DOMContentLoaded', ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("event_section").innerHTML += this.responseText;
        }
    };
    xmlhttp.open("GET", "admin_php/get_all_events.php", true);
    xmlhttp.send();
    gEID = urlParams.get('EID');
})

function showClasses(EID){
    var class_field = document.getElementById("class_section");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            class_field.innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "admin_php/get_all_classes.php?q=" + EID, true);
    xmlhttp.send();
}

function addClass(EID, start_time, end_time){
    var msg = document.getElementById("message");
    msg.innerHTML = "<form class=\"formField\" id=\"classForm\" action=\"admin_php/add_class.php\" method=\"post\" target=\"hidden-form\"><h1>Adding Class</h1><label for=\"dt\">Enter Class Date:</label><input type=\"date\" class=\"form-control\" id=\"dt\" name=\"dt\" required><label for=\"start_time\">Enter start time:</label><input type=\"time\" class=\"form-control\" id=\"start_time\" name=\"start_time\" value=\"" + start_time + "\"required><label for=\"end_time\">Enter end time:</label><input type=\"time\" class=\"form-control\" id=\"end_time\" name=\"end_time\" value=\"" + end_time + "\" required><input type=\"hidden\" id=\"EID\" name=\"EID\" value=\"" + EID + "\"><a class=\"nav_button\" onClick=\"addClassSubmit()\">Submit</a></form><iframe style=\"display:none\" name=\"hidden-form\"></iframe>";
    togglePopup();
}

function addClassSubmit(){
    document.forms['classForm'].submit();
    togglePopup();
}

function showParticipants(CID, EID){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("enrollment_section").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "admin_php/get_all_participants.php?q=" + CID + "&e=" + EID, true);
    xmlhttp.send();
}

function addParticipant(class_num){
    var popupForm = document.getElementById('message');
    popupForm.innerHTML = "<form class=\"formField\"><h1>Login</h1><label for=\"fname\">Enter your first name:</label><input type=\"text\" class=\"form-control\" id=\"fname\" name=\"fname\" placeholder=\"Enter your First Name...\"><label for=\"lname\">Enter your last name:</label><input type=\"text\" class=\"form-control\" id=\"lname\" name=\"lname\" placeholder=\"Enter your Last Name...\"><label for=\"tel\">Enter your phone number:</label><input type=\"tel\" class=\"form-control\" id=\"phonen\" name=\"phonen\" placeholder=\"Enter your phone number...\" pattern=\"[1-9][0-9]{9}\" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required><a class=\"nav_button_2\" onClick=\"addParticipantSubmit(" + class_num + ")\">Submit</a></form>";
    togglePopup();
    
    var tele = document.querySelector('#phonen');

    tele.addEventListener('keyup', function(e){
        if (event.key != 'Backspace' && (tele.value.length === 3 || tele.value.length === 7)){
            tele.value += '-';
        }
    });
}

function addParticipantSubmit(classID){
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
        url: "../client_php/reg_person.php",
        data: {CID: classID, firstname : firstname, lastname : lastname, phonenumber : phonenum},
        success: function(res){
               if(res == 0)
                    response.innerHTML = "<h1>Success!!</h1>";
                else if(res == 1)
                    response.innerHTML = "<h1>You are already enlisted in this class!</h1>";
                else
                    response.innerHTML = "<h1>There was a problem!! Please contact me at 925-818-5754";
        }
    });
}

function autoFillPerson(EID){
    var msg = document.getElementById("message");
    msg.innerHTML = "<form class=\"formField\" id=\"apForm\" action=\"admin_php/auto_fill_person.php\" method=\"post\" target=\"hidden-form\"><h1>Filling Class</h1><label for=\"start_date\">Enter Start Date:</label><input type=\"date\" class=\"form-control\" id=\"start_date\" name=\"start_date\" placeholder=\"Enter start date...\" required><label for=\"end_date\">Enter End Date:</label><input type=\"date\" class=\"form-control\" id=\"end_date\" name=\"end_date\" placeholder=\"Enter end date...\" required><label for=\"fname\">Enter your first name:</label><input type=\"text\" class=\"form-control\" id=\"fname\" name=\"fname\" placeholder=\"Enter your First Name...\"><label for=\"lname\">Enter your last name:</label><input type=\"text\" class=\"form-control\" id=\"lname\" name=\"lname\" placeholder=\"Enter your Last Name...\"><label for=\"tel\">Enter your phone number:</label><input type=\"tel\" class=\"form-control\" id=\"phonen\" name=\"phonen\" placeholder=\"Enter your phone number...\" pattern=\"[1-9][0-9]{9}\" required><a class=\"nav_button\" onClick=\"apSubmit(" + EID + ")\">Submit</a></form><iframe style=\"display:none\" name=\"hidden-form\"></iframe>";
    togglePopup();
    
    var tele = document.querySelector('#phonen');

    tele.addEventListener('keyup', function(e){
        if (event.key != 'Backspace' && (tele.value.length === 3 || tele.value.length === 7)){
            tele.value += '-';
        }
    });
}

function apSubmit(EID){
    var firstname = document.getElementById('fname').value;
    var lastname = document.getElementById('lname').value;
    var phonenum = document.getElementById('phonen').value.match(/\d/g);
    phonenum = phonenum.join("");
    var startdt = document.getElementById('start_date').value;
    var enddt = document.getElementById('end_date').value;
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
        url: "admin_php/auto_fill_person.php",
        data: {EID : EID, fname : firstname, lname : lastname, phonen : phonenum, start_date : startdt, end_date : enddt},
        success: function(res){
            console.log(res);
        }
    });
    togglePopup();
}

function numberValidate(num){
    return (num.toString().length == 10);
}

function togglePopup(){
    const popup = document.querySelector(".popup");
    popup.classList.toggle("show-popup");
}

function addEvent(){
    var msg = document.getElementById("message");
    msg.innerHTML = "<form class=\"formField\" id=\"eventForm\" action=\"admin_php/add_event.php\" method=\"post\" target=\"hidden-form\"><h1>Adding Event</h1><label for=\"EName\">Enter Event Title:</label><input type=\"text\" class=\"form-control\" id=\"EName\" name=\"EName\" placeholder=\"Enter title...\" required><label for=\"descr\">Enter event description:</label><textarea class=\"form-control\" id=\"descr\" name=\"descr\" placeholder=\"Enter a description of the event...\" cols=\"40\" rows=\"5\" required></textarea><label for=\"partN\">Enter class size:</label><input type=\"number\" class=\"form-control\" id=\"partN\" name=\"partN\" required><label for=\"start_time\">Start Time:</label><input type=\"time\" class=\"form-control\" id=\"start_time\" name=\"start_time\" required><label for=\"end_time\">End Time:</label><input type=\"time\" class=\"form-control\" id=\"end_time\" name=\"end_time\" required><label for=\"weekday\">Choose a weekday:</label><select id=\"weekday\" name=\"weekday\"><option value=0>Sunday</option><option value=1>Monday</option><option value=2>Tuesday</option><option value=3>Wednesday</option><option value=4>Thursday</option><option value=5>Friday</option><option value=6>Saturday</option></select><label for=\"color\">Enter Background Color:</label><input type=\"color\" class=\"form-control\" id=\"color\" name=\"color\" value=\"#ffffff\" required><a class=\"nav_button\" onClick=\"addEventSubmit()\">Submit</a></form><iframe style=\"display:none\" name=\"hidden-form\"></iframe>";
    togglePopup();
}

function addEventSubmit(){
    document.forms['eventForm'].submit();
    togglePopup();
    location.reload();
}

function removeEvent(EID){
    
    var check = confirm("Are you sure you want to remove this event?");
    
    if(check){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                location.reload();
            }
        };
        xmlhttp.open("GET", "admin_php/remove_event.php?q=" + EID, true);
        xmlhttp.send();
    }
    else{}
}

function alterEvent(EID){
    var msg = document.getElementById("message");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            msg.innerHTML = this.responseText;
            togglePopup();
        }
    };
    xmlhttp.open("GET", "admin_php/alter_event.php?q=" + EID, true);
    xmlhttp.send();
}

function alterEventSubmit(){
    document.forms['alterForm'].submit();
    togglePopup();
    location.reload();
  /*  var xhr = new XMLHttpRequest();
    xhr.open("POST", "admin_php/alter_event_submit.php"); 
    xhr.onload = function(event){ 
    alert("Success, server responded with: " + event.target.response); // raw response
}; 
// or onerror, onabort
var formData = new FormData(document.getElementById("alterForm")); 
xhr.send(formData);*/
}

function removeClass(CID){
    var check = confirm("Are you sure you want to remove this class?");
    if(check){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                location.reload();
            }
        };
        xmlhttp.open("GET", "admin_php/remove_class.php?q=" + CID, true);
        xmlhttp.send();
    }
    else{}
}

function removeParticipant(CID, FName, LName, PhoneN){
    var check = confirm("Are you sure you want to remove " + FName + " from this class?");
    if(check){
        $.ajax({
            type: "POST",
            url: "../client_php/remove_participant.php",
            data: {CID, FName, LName, PhoneN},
            success(res){
                showParticipants(CID);
            }
        });
    }
}

function fillClass(EID, start_time, end_time){
    var msg = document.getElementById("message");
    msg.innerHTML = "<form class=\"formField\" id=\"eventForm\" action=\"admin_php/fill_classes.php\" method=\"post\" target=\"hidden-form\"><h1>Filling Class</h1><label for=\"start_date\">Enter Start Date:</label><input type=\"date\" class=\"form-control\" id=\"start_date\" name=\"start_date\" placeholder=\"Enter start date...\" required><label for=\"end_date\">Enter End Date:</label><input type=\"date\" class=\"form-control\" id=\"end_date\" name=\"end_date\" placeholder=\"Enter end date...\" required><label for=\"start_time\">Enter start time:</label><input type=\"time\" class=\"form-control\" id=\"start_time\" name=\"start_time\" value=\"" + start_time + "\"required><label for=\"end_time\">Enter end time:</label><input type=\"time\" class=\"form-control\" id=\"end_time\" name=\"end_time\" value=\"" + end_time + "\" required><label for=\"weekday\">Choose a weekday:</label><select id=\"weekday\" name=\"weekday\"><option value=0>Sunday</option><option value=1>Monday</option><option value=2>Tuesday</option><option value=3>Wednesday</option><option value=4>Thursday</option><option value=5>Friday</option><option value=6>Saturday</option></select><input type=\"hidden\" id=\"EID\" name=\"EID\" value=\"" + EID + "\"><a class=\"nav_button\" onClick=\"fillEventSubmit()\">Submit</a></form><iframe style=\"display:none\" name=\"hidden-form\"></iframe>";
    togglePopup();
}

function fillEventSubmit(){
    document.forms['eventForm'].submit();
    togglePopup();
    location.reload();
}

/* Reformatted form submittion for debugging purposes
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "admin_php/the_call.php"); 
    xhr.onload = function(event){ 
    alert("Success, server responded with: " + event.target.response); // raw response
}; 
// or onerror, onabort
var formData = new FormData(document.getElementById("formName")); 
xhr.send(formData);
*/