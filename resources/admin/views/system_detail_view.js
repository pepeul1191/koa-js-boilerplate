import Backbone from 'backbone';
import $ from 'jquery';
import SystemDetailTemplate from '../templates/system_detail_template';
import SystemService from '../services/system_service';
import System from '../models/system';

var SystemDetailView = Backbone.View.extend({
	el: '#modal-container',
	initialize: function(){
		//this.render();
    //console.log("initialize");
		this.events = this.events || {};
		// services
		this.systemService = SystemService;
		// modal
		this.modalContainer = '#modal-container';
		this.modalTitle = '#modalTitle';
		this.modalButton = '#btnModal';
		// models
		this.system = new System();
		// forms
		this.message = '#systemDetailMessage';
		this.txtName = '#txtName';
		this.txtNameHelp = '#txtNameHelp';
		this.btnSave = '#btnSave';
	},
	events: {
		'click .close-modal': 'closeModal',
		'keydown' : 'keydownHandler',
    'click #btnSave': 'save',
	},
  renderCreate: function(){
		$(this.modalButton).click();
    $(this.el).html(
      SystemDetailTemplate({
        title: 'Crear Sistema',
				base_url: BASE_URL,
				statics_url: STATICS_URL, 
				system: this.system,
				message: '',
				disabled: false,
			})
		);
		// show modal
		$('body').addClass('modal-open');
		$('.modal-backdrop').removeClass('d-none');
		$(this.modalContainer).removeClass('d-none');
		// focus modal
		$('#txtName').focus();
		// set id 'E' for new System
		this.system.set('_id',  'E');
	},
	renderEdit: function(_id){
		$(this.modalButton).click();
		var resp = this.systemService.get(_id);
		var system = {};
		var message = '';
		if (resp.status == 200){
			this.system.set('_id',  resp.message._id);
			this.system.set('name',  resp.message.name);
			system = this.system;
			$(this.el).html(
				SystemDetailTemplate({
					title: 'Editar Sistema',
					base_url: BASE_URL,
					statics_url: STATICS_URL, 
					system: system,
					message: message,
					disabled: false,
				})
			);
		}else {
			if (resp.status == 409){
				message = resp.message;
			}else{
				message = 'Ocurrió un no esperado en traer los datos del sistema a editar';
			}
			this.system.set('_id',  '');
			this.system.set('name',  '');
			$(this.el).html(
				SystemDetailTemplate({
					title: 'Editar Sistema',
					base_url: BASE_URL,
					statics_url: STATICS_URL, 
					system: this.system,
					states: states,
					message: message,
					disabled: true,
				})
			);
		}
		// show modal
		$('body').addClass('modal-open');
		$('.modal-backdrop').removeClass('d-none');
		$(this.modalContainer).removeClass('d-none');
		// focus modal
		$('#txtName').focus();
	},
	closeModal: function(){
		// hide modal
  	$('body').removeClass('modal-open');
		$('.modal-backdrop').addClass('d-none');
		$(this.modalContainer).addClass('d-none');
		// redirect
		window.location.href = BASE_URL + 'admin/#/systems';
	},
	keydownHandler: function(e){
		switch(e.which){
			// esc
			case 27:
				this.closeModal();
				break;
		}
	},
	save: function(){
		if(this.system.id == 'E'){
			// create user
			this.validateFillForm();
		}else{
			// edit user
			this.validateFillForm();
		}
	},
	validateFillForm: function(){
		var validation_pass = true;
		// txtName is fill
		if($(this.txtName).val() == ''){
			validation_pass = false;
			$(this.txtNameHelp).html('Debe ingresar un sistema');
			$(this.txtNameHelp).removeClass('text-success');
			$(this.txtNameHelp).addClass('text-danger');
			$(this.txtName).addClass('has-danger');
		}else{
			$(this.txtNameHelp).html('');
			$(this.txtNameHelp).addClass('text-success');
			$(this.txtNameHelp).removeClass('text-danger');
			$(this.txtName).removeClass('has-danger');
		}
		// check validation pass
		if(validation_pass == false){
			throw new Error('SystemDetailView validateFillForm Error');
		}else{
			// send system to sever
			this.system.set('name', $(this.txtName).val());
			var resp = this.systemService.save(JSON.stringify(this.system));
			if(resp.status == 200){
				if (resp.message.action_executed == 'create'){
					// set _id to model
					this.system.set('_id', resp.message._id);
					// show success message
					$(this.message).addClass('text-success');
					$(this.message).removeClass('text-danger');
					$(this.message).html('Se ha registrado un nuevo sistema');
					$(this.modalTitle).html('Editar Sistema');
				}
				if (resp.message.action_executed == 'edit'){
					// show success message
					$(this.message).addClass('text-success');
					$(this.message).removeClass('text-danger');
					$(this.message).html('Se ha editado un sistema');
				}
			}else if(resp.status == 409){
				// controled error
				// show success error
				$(this.message).addClass('text-danger');
				$(this.message).removeClass('text-success');
				$(this.message).html(resp.message.data);
			}else{
				// not controled error
				$(this.message).addClass('text-danger');
				$(this.message).removeClass('text-success');
				$(this.message).html('Ha ocurrido un error no esperado');
			}
		}
  },
});

export default SystemDetailView;