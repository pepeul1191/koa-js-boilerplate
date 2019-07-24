import Backbone from 'backbone';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
// views
import UserListView from '../views/user_list_view';
import UserDetailView from '../views/user_detail_view';
import SystemListView from '../views/system_list_view';
import SystemDetailView from '../views/system_detail_view';

var router = Backbone.Router.extend({
  userListView: null,
  userDetailView: null,
  systemListView: null,
  initialize: function() {
  },
  routes: {
    '': 'index',
    'user/create': 'userCreate',
    'user/edit/:id' : 'userEdit',
    'user/mail/:id' : 'userMail',
    'user/delete/:id' : 'userDelete',
    'permissions' : 'permissions',
    'systems' : 'systems',
    'system/create': 'systemCreate',
    'system/edit/:id' : 'systemEdit',
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
    if(this.userDetailView == null){
      this.userDetailView = new UserDetailView();
    }
    this.userDetailView.renderEdit(id);
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
  permissions: function(){
    alert('permissions');
  },
  systems: function(){
    if(this.systemListView == null){
      this.systemListView = new SystemListView();
    }
    this.systemListView.render();
  },
  systemCreate: function(){
    if(this.systemDetailView == null){
      this.systemDetailView = new SystemDetailView();
    }
    this.systemDetailView.renderCreate();
  },
  systemEdit: function(id){
    if(this.systemDetailView == null){
      this.systemDetailView = new SystemDetailView();
    }
    this.systemDetailView.renderEdit(id);
  },
});

$(document).ready(function(){
  new router();
  Backbone.history.start();
});
