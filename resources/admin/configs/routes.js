import Backbone from 'backbone';
import $ from 'jquery';

var router = Backbone.Router.extend({
  userListView: null,
  userView: null,
  initialize: function() {
  },
  routes: {
    '': 'index',
    'user/create': 'userCreate',
    'user/edit/:id' : 'userEdit',
    'user/mail/:id' : 'userMail',
    'user/delete/:id' : 'userDelete',
    '*actions' : 'default',
  },
  index: function(){
    alert('index');
  },
  default: function() {
    //window.location.href = BASE_URL + "error/access/404";
    window.location.href = BASE_URL + 'admin/#/';
  },
  userCreate: function(){
    /*
    if(this.systemView == null){
      this.systemView = new SystemView();
    }
    this.systemView.render();
    this.systemView.tableSystem.listar();
    */
    alert('create');
  },
  userEdit: function(id){
    /*
    if(this.systemView == null){
      this.systemView = new SystemView();
    }
    this.systemView.render();
    this.systemView.tableSystem.listar();
    */
    alert('edit' + id);
  },
  userMail: function(id){
    /*
    if(this.systemView == null){
      this.systemView = new SystemView();
    }
    this.systemView.render();
    this.systemView.tableSystem.listar();
    */
    alert('mail' + id);
  },
  userDelete: function(id){
    /*
    if(this.systemView == null){
      this.systemView = new SystemView();
    }
    this.systemView.render();
    this.systemView.tableSystem.listar();
    */
    alert('delete' + id);
  },
});

$(document).ready(function(){
  new router();
  Backbone.history.start();
});
