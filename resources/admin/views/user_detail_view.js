import Backbone from 'backbone';
import $ from 'jquery';
import UserDetailTemplate from '../templates/user_detail_template';
import UserService from '../services/user_service';
import User from '../models/user';

var UserListView = Backbone.View.extend({
	el: '#modal-container',
	initialize: function(){
		//this.render();
    //console.log("initialize");
		this.events = this.events || {};
		// services
		this.userService = UserService;
		// modal
		this.modalButton = '#btnModal';
		this.modalContainer = $('#modal-container');
		// models
		this.user = new User();
		// forms
		this.message = '#message';
		this.txtUser = '#txtUser';
		this.txtEmail = '#txtEmail';
		this.txtPass = '#txtPass';
		this.txtPassRepeat = '#txtPassRepeat';
		this.txtUserHelp = '#txtUserHelp';
		this.txtEmailHelp = '#txtEmailHelp';
		this.txtPassHelp = '#txtPassHelp';
		this.txtPassRepeatHelp = '#txtPassRepeatHelp';
		this.filePicture = '#filePicture';
		this.btnUploadPicture = '#btnUploadPicture';
		this.btnGeneratePassword = '#btnGeneratePassword';
		this.txtPictureHelp = '#txtPictureHelp';
		this.btnSaveUser = '#btnSaveUser';
		this.imgPicture = '#imgPicture';
	},
	events: {
		'click .close-modal': 'closeModal',
		'keydown' : 'keydownHandler',
		'click #btnGeneratePassword': 'generatePassword',
		'click #btnSaveUser': 'saveUser',
		'click #btnUploadPicture': 'uploadPicture'
  },
  renderCreate: function(){
		$(this.modalButton).click();
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
		// set id 'E' for new User
		this.user.set('id',  'E');
	},
	closeModal: function(){
		// hide modal
  	$('body').removeClass('modal-open');
		$('.modal-backdrop').addClass('d-none');
		this.modalContainer.addClass('d-none');
		// redirect
		window.location.href = BASE_URL + 'admin/#/';
	},
	keydownHandler: function(e){
		switch(e.which){
			// esc
			case 27:
				this.closeModal();
				break;
		}
	},
	generatePassword: function() {
		var length = 8;
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		} 
		$(this.txtPass).val(result);
		$(this.txtPassRepeat).val(result);
	},
	saveUser: function(){
		if(this.user.id == 'E'){
			// create user
			this.validateFillForm();
		}else{
			// edit user
			this.validateFillForm();
		}
	},
	validateFillForm: function(){
		var validation_pass = true;
		// txtUser is fill
		if($(this.txtUser).val() == ''){
			validation_pass = false;
			$(this.txtUserHelp).html('Debe ingresar un usuario');
			$(this.txtUserHelp).removeClass('text-success');
			$(this.txtUserHelp).addClass('text-danger');
			$(this.txtUser).addClass('has-danger');
		}else{
			$(this.txtUserHelp).html('');
			$(this.txtUserHelp).addClass('text-success');
			$(this.txtUserHelp).removeClass('text-danger');
			$(this.txtUser).removeClass('has-danger');
		}
		// txtEmail is fill
		if($(this.txtEmail).val() == ''){
			validation_pass = false;
			$(this.txtEmailHelp).html('Debe ingresar un correo');
			$(this.txtEmailHelp).removeClass('text-success');
			$(this.txtEmailHelp).addClass('text-danger');
			$(this.txtEmail).addClass('has-danger');
		}else{
			$(this.txtEmailHelp).html('');
			$(this.txtEmailHelp).addClass('text-success');
			$(this.txtEmailHelp).removeClass('text-danger');
			$(this.txtEmail).removeClass('has-danger');
		}
		// txtEmail is email
		if(this.validateEmail($(this.txtEmail).val()) == false){
			validation_pass = false;
			$(this.txtEmailHelp).html('Debe ingresar un correo válido');
			$(this.txtEmailHelp).removeClass('text-success');
			$(this.txtEmailHelp).addClass('text-danger');
			$(this.txtEmail).addClass('has-danger');
		}else{
			$(this.txtEmailHelp).html('');
			$(this.txtEmailHelp).addClass('text-success');
			$(this.txtEmailHelp).removeClass('text-danger');
			$(this.txtEmail).removeClass('has-danger');
		}
		// txtPass is fill
		if($(this.txtPass).val() == ''){
			validation_pass = false;
			$(this.txtPassHelp).html('Debe ingresar una contraseña');
			$(this.txtPassHelp).removeClass('text-success');
			$(this.txtPassHelp).addClass('text-danger');
			$(this.txtPass).addClass('has-danger');
		}else{
			$(this.txtPassHelp).html('');
			$(this.txtPassHelp).addClass('text-success');
			$(this.txtPassHelp).removeClass('text-danger');
			$(this.txtPass).removeClass('has-danger');
		}
		// txtPass and txtPassRepeat are equals
		if($(this.txtPass).val() != $(this.txtPassRepeat).val()){
			validation_pass = false;
			$(this.txtPassRepeatHelp).html('Contraseñas deben ser iguales');
			$(this.txtPassRepeatHelp).removeClass('text-success');
			$(this.txtPassRepeatHelp).addClass('text-danger');
			$(this.txtPassRepeat).addClass('has-danger');
		}else{
			$(this.txtPassRepeatHelp).html('');
			$(this.txtPassRepeatHelp).addClass('text-success');
			$(this.txtPassRepeatHelp).removeClass('text-danger');
			$(this.txtPassRepeat).removeClass('has-danger');
		}
		// check validation pass
		if(validation_pass == false){
			throw new Error('UserListView validateFillForm Error');
		}else{
			this.user.set('user', $(this.txtUser).val());
			this.user.set('pass', $(this.txtPass).val());
			this.user.set('email', $(this.txtEmail).val());
			console.log(JSON.stringify(this.user));
		}
	},
	uploadPicture: function(){
		$(this.txtPictureHelp).html('Subiendo arhcivo...');
		var form_data = new FormData();
		var file = $(this.filePicture)[0].files[0];
		form_data.append('picture_file', file);
		var resp = this.userService.upload(form_data);
    if (resp.status == 200){
			$(this.txtPictureHelp).removeClass('text-danger');
			$(this.txtPictureHelp).addClass('text-success');
			$(this.txtPictureHelp).html('Imagen cargada correctamente');
			this.user.set('profile_picture', resp.message);
			$(this.imgPicture).attr('src', STATICS_URL + 'uploads/' + this.user.get('profile_picture'));
		}else{
			$(this.txtPictureHelp).removeClass('text-success');
			$(this.txtPictureHelp).addClass('text-danger');
			$(this.txtPictureHelp).html('Ha ocurrido un error en cargar la imagen');
		}
	},
	validateEmail: function(email){
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}, 
});

export default UserListView;