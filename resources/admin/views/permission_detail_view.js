import Backbone from 'backbone';
import $ from 'jquery';
import PermissionDetailTemplate from '../templates/permission_detail_template';
import PermissionService from '../services/permission_service';
import Permission from '../models/permission';

var PermissionDetailView = Backbone.View.extend({
  el: '#modal-container',
  system_id: null,
	initialize: function(){
		//this.render();
    //console.log("initialize");
		this.events = this.events || {};
		// services
		this.permissionService = PermissionService;
		// modal
		this.modalContainer = '#modal-container';
		this.modalTitle = '#modalTitle';
		this.modalButton = '#btnModal';
		// models
		this.permission = new Permission();
		// forms
		this.message = '#permissionDetailMessage';
		this.txtName = '#txtName';
    this.txtNameHelp = '#txtNameHelp';
    this.txtKey = '#txtKey';
		this.txtKeyHelp = '#txtKeyHelp';
		this.btnSave = '#btnSave';
	},
	events: {
		'click .close-modal': 'closeModal',
		'keydown' : 'keydownHandler',
    'click #btnSave': 'save',
	},
  renderCreate: function(system_id){
		$(this.modalButton).click();
    $(this.el).html(
      PermissionDetailTemplate({
        title: 'Crear Permiso',
				base_url: BASE_URL,
				statics_url: STATICS_URL, 
				permission: this.permission,
				message: '',
				disabled: false,
			})
    );
    this.system_id = system_id;
		// show modal
		$('body').addClass('modal-open');
		$('.modal-backdrop').removeClass('d-none');
		$(this.modalContainer).removeClass('d-none');
		// focus modal
		$('#txtName').focus();
		// set id 'E' for new System
		this.permission.set('_id',  'E');
	},
	renderEdit: function(system_id, _id){
		$(this.modalButton).click();
		var resp = this.permissionService.get(_id);
		var message = '';
		if (resp.status == 200){
      this.system_id = system_id;
			this.permission.set('_id',  resp.message._id);
      this.permission.set('name',  resp.message.name);
      this.permission.set('key',  resp.message.key);
      this.permission.set('system_id',  system_id);
      var permission = this.permission;
			$(this.el).html(
				PermissionDetailTemplate({
					title: 'Editar Permiso',
					base_url: BASE_URL,
					statics_url: STATICS_URL, 
					permission: permission,
					message: message,
					disabled: false,
				})
			);
		}else {
			if (resp.status == 409){
				message = resp.message;
			}else{
				message = 'Ocurrió un no esperado en traer los datos del permiso a editar';
			}
			this.permission.set('_id',  '');
			this.permission.set('name',  '');
			$(this.el).html(
				PermissionDetailTemplate({
					title: 'Editar Sistema',
					base_url: BASE_URL,
					statics_url: STATICS_URL, 
					permission: this.permission,
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
		window.location.href = BASE_URL + 'admin/#/system/permission/' +  this.system_id;
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
		if(this.permission.id == 'E'){
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
			$(this.txtNameHelp).html('Debe ingresar un nombre de permiso');
			$(this.txtNameHelp).removeClass('text-success');
			$(this.txtNameHelp).addClass('text-danger');
			$(this.txtName).addClass('has-danger');
		}else{
			$(this.txtNameHelp).html('');
			$(this.txtNameHelp).addClass('text-success');
			$(this.txtNameHelp).removeClass('text-danger');
			$(this.txtName).removeClass('has-danger');
    }
    // txtKey is fill
    if($(this.txtKey).val() == ''){
			validation_pass = false;
			$(this.txtKeyHelp).html('Debe ingresar una llave del permiso');
			$(this.txtKeyHelp).removeClass('text-success');
			$(this.txtKeyHelp).addClass('text-danger');
			$(this.txtKey).addClass('has-danger');
		}else{
			$(this.txtKeyHelp).html('');
			$(this.txtKeyHelp).addClass('text-success');
			$(this.txtKeyHelp).removeClass('text-danger');
			$(this.txtKey).removeClass('has-danger');
		}
		// check validation pass
		if(validation_pass == false){
			throw new Error('PermissionDetailView validateFillForm Error');
		}else{
			// send permission to sever
      this.permission.set('name', $(this.txtName).val());
      this.permission.set('key', $(this.txtKey).val());
      this.permission.set('system_id', this.system_id);
			var resp = this.permissionService.save(JSON.stringify(this.permission));
			if(resp.status == 200){
				if (resp.message.action_executed == 'create'){
					// set _id to model
					this.permission.set('_id', resp.message._id);
					// show success message
					$(this.message).addClass('text-success');
					$(this.message).removeClass('text-danger');
					$(this.message).html('Se ha registrado un nuevo permiso');
					$(this.modalTitle).html('Editar Permiso');
				}
				if (resp.message.action_executed == 'edit'){
					// show success message
					$(this.message).addClass('text-success');
					$(this.message).removeClass('text-danger');
					$(this.message).html('Se ha editado un permiso');
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

export default PermissionDetailView;