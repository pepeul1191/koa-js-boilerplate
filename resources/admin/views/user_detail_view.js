import Backbone from 'backbone';
import $ from 'jquery';

import UserDetailTemplate from '../templates/user_detail_template';
import UserService from '../services/user_service';

var UserListView = Backbone.View.extend({
	el: '#modal-container',
	initialize: function(){
		//this.render();
    //console.log("initialize");
    this.userService = UserService;
		this.message = "#mensaje";
		this.events = this.events || {};
		//this.model = new User();
		this.modalButton = $('#btnModal');
		this.modalContainer = $('#modal-container');
		//this.tableUserLog = new TableView(dataTableUserLog);
	},
	events: {
		'click .close-modal': 'closeModal',
		'keydown' : 'keydownHandler',
  },
  renderCreate: function(){
		this.modalButton.click();
    $(this.el).html(
      UserDetailTemplate({
        title: 'Crear Usuario',
        base_url: BASE_URL,
        user: {},
			})
		);
		// show modal
		$('body').addClass('modal-open');
		$('.modal-backdrop').removeClass('d-none');
		this.modalContainer.removeClass('d-none');
		// focus modal
		$('#txtUser').focus();
	},
	closeModal: function(){
		// hide modal
  	$('body').removeClass('modal-open');
		$('.modal-backdrop').addClass('d-none');
		this.modalContainer.addClass('d-none');
		// redirect
		window.location.href = BASE_URL + 'admin/#/';
	},
	keydownHandler : function(e){
		switch (e.which) {
			// esc
			case 27 :
				this.closeModal();
				break;
		}
	},
});

export default UserListView;