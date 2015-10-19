// YOUR CODE HERE:
var app = {

};

app.server = 'https://api.parse.com/1/classes/chatterbox';

$(document).ready(function(){
  $('.submit').on('click', function(event){
    //event.preventDefault();
    console.log("in click repsonse");
    app.handleSubmit();
  });
});

app.send = function(message){

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.fetch = function(){
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    //data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      var results = data.results;
      for(var i = 0; i < results.length; i++){
        app.addMessage(results[i]);
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
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
  console.log("in submitter");
  var messageText = {username: 'Me', message: $('#message').val(), roomname : 'my room'};
  app.addMessage(messageText);
};

app.init = function(){
  console.log("init");
  app.fetch();
};

app.init();
