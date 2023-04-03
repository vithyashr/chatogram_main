var firebaseConfig = {
    apiKey: "AIzaSyAC6I5sr9T2Q9EU0x9dL0EKLeOkZFIhQ6I",
    authDomain: "chatogram-main.firebaseapp.com",
    databaseURL: "https://chatogram-main-default-rtdb.firebaseio.com",
    projectId: "chatogram-main",
    storageBucket: "chatogram-main.appspot.com",
    messagingSenderId: "216390163477",
    appId: "1:216390163477:web:63cb06cd318121cc71421c",

  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  
user_name=localStorage.getItem("User_Name")
document.getElementById("welcome").innerHTML="Welcome " + user_name + " ! "

function AddRoom(){
    room_name=document.getElementById("room_name").value 
    firebase.database().ref("/").child(room_name).update({
      purpose:"Add Room Name"
    })

    localStorage.setItem("room_name",room_name)
    window.location="message_page.html"
}


function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("Room_name-" + Room_names)
                  row="<div class='room_name' id=" + Room_names + " onclick='redirect(this.id)'> ♥ "+ Room_names + "</div> <hr>"
document.getElementById("output").innerHTML += row

                  //End code
            });
      });
}
getData();

function redirect(name){

      console.log(name)
      localStorage.setItem("room_name", name)
      window.location="message_page.html"

}

function logout(){
      localStorage.removeItem("room_name")
      localStorage.removeItem("User_Name")
      window.location="login_page.html"
}
 