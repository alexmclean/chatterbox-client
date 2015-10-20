/*
var App = Backbone.Model.extend({
  initialize: function(){

  }

});
*/
var Chat = Backbone.Model.extend({
  initialize: function(userName, message, roomName) {
    this.set('userName', userName);
    this.set('message', message);
    this.set('roomName', roomName);
  },

  defaults: {roomName : 'All Rooms'}

});

/*
var ChatView = Backbone.View.extend({
  initialize: function(){

  },

  render: function(){
    var html = [
      '<div class="chat">',
        this.model.get('message'),
        '<div class="username">',
          this.model.get('userName'),
        '</div>',
      '</div>'].join('');
    return this.$el.html(html);
  },

  addFriend: function(){
    console.log("added a friend!");
  },

  events: {'click .username': 'addFriend'}

});
*/

var Chats = Backbone.Collection.extend({
  model: Chat
});

var ChatsView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('click', function(e){
      this.model.addFriend();
    });
  },

  render: function(){
    var html = [
      '<div id="chats">',
      '</div>'
    ].join('');

    this.$el.html(html);

    this.$el.find('#chats').append(this.collection.map(function(chat){
      var chathtml = [
      '<div class="chat">',
        chat.get('message'),
        '<div class="username">',
          chat.get('userName'),
        '</div>',
      '</div>'].join('');
      return chathtml;
    }));
    return this.$el;
  }

});

var chat = new Chat('Alex', 'he says hi', 'MyRoom');
var chat2 = new Chat('Alext', 'he says hih', 'MyRoom');
var chat3 = new Chat('Alexa', 'he says hig', 'MyRoom');
var chatList = [chat, chat2, chat3];
var chatColl = new Chats(chatList);

var chatsview = new ChatsView({collection : chatColl});

$('body').append(chatsview.render());