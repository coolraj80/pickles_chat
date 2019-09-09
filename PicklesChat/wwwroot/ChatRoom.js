const uri = "https://pickleschat.azurewebsites.net/api/chat";
let todos = null;
function getCount(data) {
  const el = $("#counter");
  let name = "to-do";
  if (data) {
    if (data > 1) {
      name = "Chat Rooms";
    }
    el.text(data + " " + name);
  } else {
    el.text("No " + name);
  }
}

$(document).ready(function() {
  $("#new_message").focus();
  getChatRoomNameFromURL();
  getChatMessages();
    
  window.setInterval(function() {
    getChatMessages();
    }, 1000);
    
});


var room, user;

function getChatRoomNameFromURL()
{    
    var url = new URL(window.location.href);
    room = url.searchParams.get("room");    
    user = url.searchParams.get("user");    
    $("#RoomName").append("<font color=blue>" + user + "</font>");
    $("#RoomName").append(" To <font color=blue>" + room + "</font>");
    
}

function getChatMessages() {    
  $.ajax({
    type: "GET",
    url: uri + "/GetChatMessages/" + room,
    cache: false,
    success: function(data) {     
    
      var messages = "";
      $.each(data, function(key, item) {         
          // alert(item.message);                  
            messages = messages + item.userName + " : " + item.message + "\n";
      });
    
      $("#ChatMessages").val(messages);
    }
  });
}

function addMessage() {
  const item = {
    ChatRoom: room,
    UserName: user,
    Message: $("#new_message").val()    
  };

  $.ajax({
    type: "POST",
    accepts: "application/json",
    url: uri + '/InsertChatMessage',
    contentType: "application/json",
    data: JSON.stringify(item),
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Something went wrong!");        
    },
    success: function(result) {
      getChatMessages();
      $("#new_message").val("");
    }
  });
}


