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

  user_name = localStorage.getItem("User_Name")
  room_name = localStorage.getItem("room_name")
  
  function send() {
      msg = document.getElementById("msg").value
      firebase.database().ref(room_name).push({
          name: user_name,
          message: msg,
          like: 0
  
      })
      document.getElementById("msg").value = ""
  
  }
  
  function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
              childKey = childSnapshot.key;
              childData = childSnapshot.val();
              if (childKey != "purpose") {
                  firebase_message_id = childKey;
                  message_data = childData;
                  console.log(firebase_message_id);
                  console.log(message_data);
  
                  name1 = message_data['name']
                  message = message_data['message']
                  like = message_data['like']
  
                  name_with_tag = "<h4> " + name1 + "<img class='user_tick' src='tick.png'>";
                  message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                  like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                  span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                  row = name_with_tag + message_with_tag + like_button + span_with_tag;
                  document.getElementById("output").innerHTML += row;
              }
          });
      });
  }
  getData();
  
  function updateLike(message_id){
      button_id= message_id
      likes =document.getElementById(button_id).value
      updateLikes= Number(likes) + 1
      firebase.database().ref(room_name).child(message_id).update({
         like:updateLikes 
      })
  }
  
  function logout(){
    localStorage.removeItem("room_name")
    localStorage.removeItem("User_Name")
    window.location="login_page.html"
}

  
  