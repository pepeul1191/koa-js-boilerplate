import Backbone from 'backbone';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';

import UserListView from '../views/user_list_view';
import UserDetailView from '../views/user_detail_view';

var router = Backbone.Router.extend({
  userListView: null,
  userDetailView: null,
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
    if(this.userListView == null){
      this.userListView = new UserListView();
    }
    this.userListView.render();
    //this.userListView.tableSystem.listar();
  },
  default: function() {
    //window.location.href = BASE_URL + "error/access/404";
    window.location.href = BASE_URL + 'admin/#/';
  },
  userCreate: function(){
    if(this.userDetailView == null){
      this.userDetailView = new UserDetailView();
    }
    this.userDetailView.renderCreate();
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
