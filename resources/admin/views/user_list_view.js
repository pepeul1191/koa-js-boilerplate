import Backbone from 'backbone';
import $ from 'jquery';

import UserListTemplate from '../templates/user_list_template';
import UserService from '../services/user_service';

var UserListView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
    this.userService = UserService;
		this.message = '#mensaje';
		this.events = this.events || {};
		this.page_size = 10;
		this.page = 1;
		this.pages = 0;
	},
	events: {
		'click #btnGoBegin': 'goBegin',
		'click #btnGoPrevious': 'goPrevious',
		'click #btnGoNext': 'goNext',
		'click #btnGoLast': 'goLast',
  },
  render: function(){
		var resp = this.userService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      UserListTemplate({
        users: resp.message.users,
				base_url: BASE_URL,
				page: this.page,
				pages: this.pages,
			})
		);
	},
	goBegin: function(){
		this.page = 1;
		var resp = this.userService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      UserListTemplate({
        users: resp.message.users,
				base_url: BASE_URL,
				page: this.page,
				pages: this.pages,
			})
		);
	},
	goPrevious: function(){
		this.page = this.page - 1;
		var resp = this.userService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      UserListTemplate({
        users: resp.message.users,
				base_url: BASE_URL,
				page: this.page,
				pages: this.pages,
			})
		);
	},
	goNext: function(){
		this.page = this.page + 1;
		var resp = this.userService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      UserListTemplate({
        users: resp.message.users,
				base_url: BASE_URL,
				page: this.page,
				pages: this.pages,
			})
		);
	},
	goLast: function(){
		this.page = this.pages;
		var resp = this.userService.list(this.page, this.page_size);
    $(this.el).html(
      UserListTemplate({
        users: resp.message.users,
				base_url: BASE_URL,
				page: this.page,
				pages: this.pages,
			})
		);
	},
});

export default UserListView;