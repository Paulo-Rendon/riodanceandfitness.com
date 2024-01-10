const months = ["January", "Febuary", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];
const daysOfMonth = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const currentDate = new Date();
month = months[currentDate.getMonth()];
day = currentDate.getDay();

window.addEventListener('DOMContentLoaded', ()=>{
    buildCalendar();
})

function buildWeekday(value){
    var val = '';
    for(let i = 0; i < 7; i++){
        val += '<th>' + daysOfMonth[(value+i)%7] + '</th>';
    }
    return val;
}

function daysInMonth(){
    return new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0).getDate();
}

function buildDays(count){
    var val = '';
    var day_count = daysInMonth();
    var curdate = currentDate.getDate();
    var dateCounter = (curdate + count)%day_count;
    for(let i = 0; i < 7; i++){
        if (dateCounter > day_count)
            dateCounter = 1;
        val += '<th onClick=buildEvents(' + (count+i) + ')>' + dateCounter + '</th>';
        dateCounter++;
    }
    return val;
}

function addDays(date, days){
    var dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + days);
    return dateCopy;
}

function buildEvents(count){
    var tDate = addDays(currentDate, count);
    document.getElementById("selected_date").innerHTML = daysOfMonth[tDate.getDay()] + ", " + months[tDate.getMonth()] + " " + tDate.getDate() + " " + tDate.getFullYear();
    var val = '';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("events").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "client_php/get_classes.php?q=" + count, true);
    xmlhttp.send();
    /*val += '<div class="event"><h1 class="event_title">Zumba</h1><p class="event_desc">There\'s the pale cast of troubles, and moment with this mortal coil, must give us pause. There\'s the slings and scorns of us all; and sweat under a weary life, but that patient merit of time, than fly to be: that flesh is heir to</p></div>';*/
}

function togglePopup(){
    const popup = document.querySelector(".popup");
    popup.classList.toggle("show-popup");
}

function getClasses(EID){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("events").innerHTML = this.responseText;
        }
    };
    xmlhttp.open("GET", "client_php/get_classes.php?q=" + EID, true);
    xmlhttp.send();
}

function buildCalendar(){
    var calendar = document.getElementById("calendar");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            calendar.innerHTML += this.responseText;
        }
    };
    xmlhttp.open("GET", "client_php/build_event_calendar.php", true);
    xmlhttp.send();
}

var source = document.getElementById("enrollScript").src;

function getMember(class_num){
    var popupForm = document.getElementById('message');
    popupForm.innerHTML = "<form class=\"formField\"><h1>Login</h1><label for=\"fname\">Enter your first name:</label><input type=\"text\" class=\"form-control\" id=\"fname\" name=\"fname\" placeholder=\"Enter your First Name...\"><label for=\"lname\">Enter your last name:</label><input type=\"text\" class=\"form-control\" id=\"lname\" name=\"lname\" placeholder=\"Enter your Last Name...\"><label for=\"tel\">Enter your phone number:</label><input type=\"tel\" class=\"form-control\" id=\"phonen\" name=\"phonen\" placeholder=\"Enter your phone number...\" pattern=\"[1-9][0-9]{9}\" onkeypress='return event.charCode >= 48 && event.charCode <= 57' required><a class=\"nav_button_2\" onClick=\"getMemberSubmit(" + 1 + ")\">Submit</a></form>";
    togglePopup();
    
    var tele = document.querySelector('#phonen');

    tele.addEventListener('keyup', function(e){
        if (event.key != 'Backspace' && (tele.value.length === 3 || tele.value.length === 7)){
            tele.value += '-';
        }
    });
}

function getMemberSubmit(val){
    if(val)
        togglePopup();
    var FName = document.getElementById('fname').value;
    var LName = document.getElementById('lname').value;
    var PhoneN = document.getElementById('phonen').value.match(/\d/g);
    var output = document.getElementById('events');
    PhoneN = PhoneN.join("");
    var response = document.getElementById('message');
    output.innerHTML = "<h1>Hello " + FName + " " + LName + ", You are enrolled in:</h1>";
    if(FName == "")
        FName = "Jane";
    if(LName == "")
        LName = "Doe";
    if(!numberValidate(PhoneN)){
        window.alert("You must provide a valid phone number");
        return false;
    }
    
    $.ajax({
        type: "POST",
        url: source + "/../client_php/enrolled_classes.php",
        data: {FName, LName, PhoneN},
        success: function(res){
            output.innerHTML += res;
            if(val){
                window.scrollTo({
                    top: output.offsetTop - document.getElementById('nav_section').offsetHeight,
                    behavior: "smooth",
                });
            }
        }
    });
}

function removeParticipant(CID, FName, LName, PhoneN){
    var check = confirm("Are you sure you want to unenroll from this class?");
    if(check){
        $.ajax({
        type: "POST",
        url: "client_php/remove_participant.php",
        data: {CID, FName, LName, PhoneN},
        success: function(res){
            getMemberSubmit(0);   
        }
        });
    }
    else{}
}

function numberValidate(num){
    return (num.toString().length == 10);
}