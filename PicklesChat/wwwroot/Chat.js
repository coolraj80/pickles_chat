const uri = "https://pickleschat.azurewebsites.net/api/chat";
let todos = null;
function getCount(data) {
  const el = $("#counter");
  let name = "Chat Room";
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
  getChatRooms();
});

function getChatRooms() {
  $.ajax({
    type: "GET",
    url: uri + "/GetChatRooms",
    cache: false,
    success: function(data) {
      const tBody = $("#todos");

      $(tBody).empty();
      $("#rooms").empty();

      getCount(data.length);
        
      $.each(data, function(key, item) {           
          
        const tr = $("<tr></tr>")          
          .append($("<td></td>").text(item.name))
          .append(
            $("<td></td>").append(
              $("<button>Join</button>").on("click", function() {
                 joinChatRoom(item.name);
              })
            )
          );

        tr.appendTo(tBody);
      });

      todos = data;
    }
  });
}

function joinChatRoom (roomName)
{
    if ($("#user_name").val() == "") 
    { 
        alert ('Please enter your name');
        $("#user_name").focus();
    }
    else
    {
        document.location = "PicklesChatRoom.html?room=" + roomName + "&user=" + $("#user_name").val();        
    } 
}

function addItem() {
    
    if ($("#add-name").val() == "") 
    { 
        alert ('Please enter the Chat Room name');
        $("#add-name").focus();
        return;
    }
    
    
  const item = {
    name: $("#add-name").val(),
    isComplete: false
  };

  $.ajax({
    type: "POST",
    accepts: "application/json",
    url: uri + '/NewChatRoom',
    contentType: "application/json",
    data: JSON.stringify(item),
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Something went wrong!");
    },
    success: function(result) {
      getChatRooms();      
      joinChatRoom($("#add-name").val());
      $("#add-name").val("");
    }
  });
}


