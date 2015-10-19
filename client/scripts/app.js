// YOUR CODE HERE:
var app = {

};

app.server = 'https://api.parse.com/1/classes/chatterbox';

$(document).ready(function(){
  $('.submit').on('click', function(event){
    event.preventDefault();
    console.log("in click repsonse");
    app.handleSubmit();
  });

  $('#roomSelect').change(function(){
    console.log($('#roomSelect').val());
    app.fetch();
  });
});

app.send = function(message){
  console.log(message.roomname);
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.addMessage(message);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

function showMessages(results, roomName){
  var rooms = [];

  for(var i = 0; i < results.length; i++){
    if(results[i].roomname === roomName || roomName === 'All Rooms'){
      app.addMessage(results[i]);
    }
    rooms.push(results[i].roomname);
  }
  app.buildRooms(rooms);
}


app.fetch = function(){
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    //data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.clearMessages();
      showMessages(data.results, $('#roomSelect').val());

    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.buildRooms = function(rooms){
  var isDuplicate = {};
  for(var i = 0; i < rooms.length; i++){
    if(!isDuplicate[rooms[i]]){
      isDuplicate[rooms[i]] = true;
      app.addRoom(rooms[i]);
    }
  }
};


app.clearMessages = function(){
  $('#chats').empty();
};

app.addMessage = function(message){
  var $node = $('<div/>', {class : 'chat', text : message['text']});
  var $user = $('<div/>', {class : 'username', text : message['username']});
  $user.on('click', function(event){
    app.addFriend($(this).val());
  });
  $user.appendTo($node);
  $node.appendTo('#chats');
};

app.addRoom = function(roomName){
  var $choice = $('<option/>', {class : 'room', text : roomName});
  $choice.appendTo('#roomSelect');
};

app.addFriend = function(){

};

app.handleSubmit = function(){
  var roomName = $('#roomSelect').val();
  var messageText = {username: 'Me', text: $('#message').val(), roomname : roomName};
  app.send(messageText);
};

app.init = function(){
  console.log("init");
  app.fetch();
};

app.init();
