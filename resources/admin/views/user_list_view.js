import Backbone from 'backbone';
import $ from 'jquery';

import UserListTemplate from '../templates/user_list_template';
import UserService from '../services/user_service';

var UserListView = Backbone.View.extend({
	el: '#workspace',
	initialize: function(){
		//this.render();
    //console.log("initialize");
    this.userService = UserService;
		this.message = "#mensaje";
		this.events = this.events || {};
		//this.model = new User();
		this.modalButton = $("#btnModal");
		this.modalContainer = $("#modal-container");
		//this.tableUserLog = new TableView(dataTableUserLog);
	},
	events: {
    "click #btnBuscarUsuario": "buscarUsuario",
		"click #btnGenerarUsuario": "generarCorrelativo",
		"click #btnCrearUsuario": "crearUsuario",
		"click #btnActualizarCorreo": "actualizarCorreo",
		"click #btnCambiarContrasenia": "cambiarContrasenia",
		"click #btnReenviarActivacion": "reenviarActivacion",
		"click #btnActualizarEstado": "actualizarEstado",
		"click #btnAsociarSistemasUsuarioNuevo": "asociarSistemasUsuarioNuevo",
		"click #btnVerLogs": "verLogs",
		"click #btnVerSistemas": "verSistemas",
		"click #btnVerRolesPermisos": "verRolesPermisos",
  },
  render: function(){
    var resp = this.userService.list();
    $(this.el).html(
      UserListTemplate({
        users: resp.message,
        base_url: BASE_URL,
      }))
    ;
  },
});

export default UserListView;