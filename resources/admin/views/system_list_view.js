import Backbone from 'backbone';
import $ from 'jquery';

import SystemListTemplate from '../templates/system_list_template';
import SystemService from '../services/system_service';

var SystemListView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
    this.systemService = SystemService;
		this.message = '#message';
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
    'click .delete-row': 'delete',
  },
  render: function(){
		var resp = this.systemService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      SystemListTemplate({
        systems: resp.message.systems,
				base_url: BASE_URL,
				page: this.page,
        pages: this.pages,
        message: '',
			})
		);
	},
	goBegin: function(){
		this.page = 1;
		var resp = this.systemService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      SystemListTemplate({
        systems: resp.message.systems,
				base_url: BASE_URL,
				page: this.page,
        pages: this.pages,
        message: '',
			})
		);
	},
	goPrevious: function(){
		this.page = this.page - 1;
		var resp = this.systemService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      SystemListTemplate({
        systems: resp.message.systems,
				base_url: BASE_URL,
				page: this.page,
        pages: this.pages,
        message: '',
			})
		);
	},
	goNext: function(){
		this.page = this.page + 1;
		var resp = this.systemService.list(this.page, this.page_size);
		this.pages = Math.ceil(resp.message.count / this.page_size);
    $(this.el).html(
      SystemListTemplate({
        systems: resp.message.systems,
				base_url: BASE_URL,
				page: this.page,
        pages: this.pages,
        message: '',
			})
		);
	},
	goLast: function(){
		this.page = this.pages;
		var resp = this.systemService.list(this.page, this.page_size);
    $(this.el).html(
      SystemListTemplate({
        systems: resp.message.systems,
				base_url: BASE_URL,
				page: this.page,
        pages: this.pages,
        message: '',
			})
		);
  },
  delete: function(event){
    var _id = event.target.parentElement.getAttribute('system_id');
    var resp = this.systemService.delete(_id);
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
			$(this.message).html('No se pudo eliminar el sistema');
    }
  },
});

export default SystemListView;