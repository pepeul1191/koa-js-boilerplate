import Backbone from 'backbone';
import $ from 'jquery';

import PermissionListTemplate from '../templates/permission_list_template';
import PermissionService from '../services/permission_service';

var PermissionListView = Backbone.View.extend({
  el: '#workspace',
  system_id: null,
	initialize: function(){
    this.permissionService = PermissionService;
		this.message = '#message';
		this.events = this.events || {};
		this.page_size = 20;
		this.page = 1;
		this.pages = 0;
	},
	events: {
		'click #btnGoBegin': 'goBegin',
		'click #btnGoPrevious': 'goPrevious',
		'click #btnGoNext': 'goNext',
    'click #btnGoLast': 'goLast',
    'click .delete-row': 'delete',
  },
  render: function(){
		var resp = this.permissionService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      PermissionListTemplate({
        permissions: resp.message.permissions,
				base_url: BASE_URL,
				page: this.page,
        pages: this.pages,
        message: '',
        system_id: this.system_id,
			})
		);
	},
	goBegin: function(){
		this.page = 1;
		var resp = this.permissionService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      PermissionListTemplate({
        permissions: resp.message.permissions,
				base_url: BASE_URL,
				page: this.page,
        pages: this.pages,
        message: '',
			})
		);
	},
	goPrevious: function(){
		this.page = this.page - 1;
		var resp = this.permissionService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      PermissionListTemplate({
        permissions: resp.message.permissions,
				base_url: BASE_URL,
				page: this.page,
        pages: this.pages,
        message: '',
			})
		);
	},
	goNext: function(){
		this.page = this.page + 1;
		var resp = this.permissionService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      PermissionListTemplate({
        permissions: resp.message.permissions,
				base_url: BASE_URL,
				page: this.page,
        pages: this.pages,
        message: '',
			})
		);
	},
	goLast: function(){
		this.page = this.pages;
		var resp = this.permissionService.list(this.page, this.page_size);
    $(this.el).html(
      PermissionListTemplate({
        permissions: resp.message.permissions,
				base_url: BASE_URL,
				page: this.page,
        pages: this.pages,
        message: '',
			})
		);
  },
  delete: function(event){
    var _id = event.target.parentElement.getAttribute('permission_id');
    var resp = this.permissionService.delete(this.system_id, _id);
    var tbody = event.target.parentElement.parentElement.parentElement.parentElement;
		var td = event.target.parentElement.parentElement.parentElement;
    tbody.removeChild(td);
    if(resp.status == 200){
      $(this.message).addClass('text-success');
      $(this.message).removeClass('text-danger');
      $(this.message).html(resp.message.data);
    }else{
      $(this.message).addClass('text-danger');
			$(this.message).removeClass('text-success');
			$(this.message).html('No se pudo eliminar el permiso');
    }
  },
});

export default PermissionListView;