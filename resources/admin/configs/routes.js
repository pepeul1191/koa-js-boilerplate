import Backbone from 'backbone';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
// views
import UserListView from '../views/user_list_view';
import UserDetailView from '../views/user_detail_view';
import SystemListView from '../views/system_list_view';
import SystemDetailView from '../views/system_detail_view';
import PermissionListView from '../views/permission_list_view';
import PermissionDetailView from '../views/permission_detail_view';

var router = Backbone.Router.extend({
  userListView: null,
  userDetailView: null,
  systemListView: null,
  systemDetailView: null,
  permissionListView: null,
  permissionDetailView: null,
  initialize: function() {
  },
  routes: {
    '': 'index',
    // user
    'user/create': 'userCreate',
    'user/edit/:id' : 'userEdit',
    'user/mail/:id' : 'userMail',
    // system
    'systems' : 'systems',
    'system/create': 'systemCreate',
    'system/edit/:id' : 'systemEdit',
    // permission of system
    'system/permission/:id' : 'permissions',
    'permission/:system_id/create': 'permissionCreate',
    'permission/:system_id/edit/:id' : 'permissionEdit',
    // others
    '*actions' : 'default',
  },
  default: function() {
    //window.location.href = BASE_URL + "error/access/404";
    window.location.href = BASE_URL + 'admin/#/';
  },
  // user
  index: function(){
    if(this.userListView == null){
      this.userListView = new UserListView();
    }
    this.userListView.render();
    //this.userListView.tableSystem.listar();
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
    alert('mail: ' + id);
  },
  userDelete: function(id){
    alert('delete' + id);
  },
  // permission
  permissions: function(id){
    if(this.permissionListView == null){
      this.permissionListView = new PermissionListView();
    }
    this.permissionListView.system_id = id;
    this.permissionListView.render();
  },
  permissionCreate: function(system_id){
    if(this.permissionDetailView == null){
      this.permissionDetailView = new PermissionDetailView();
    }
    this.permissionDetailView.renderCreate(system_id);
  },
  permissionEdit: function(system_id, id){
    if(this.permissionDetailView == null){
      this.permissionDetailView = new PermissionDetailView();
    }
    this.permissionDetailView.renderEdit(system_id, id);
  },
  // system
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
