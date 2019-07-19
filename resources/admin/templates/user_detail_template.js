import _ from 'underscore';

var UserDetailTemplate = _.template(`
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="modalTitle"><%= title %></h5>
      <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-md-12">
          <label id="userDetailMessage" class="text-danger"><%= message %></label>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="txtUser">Usuario</label>
            <input type="text" class="form-control" id="txtUser" aria-describedby="txtUserHelp" placeholder="Ingrese usuario" value="<%= user.get('user') %>" <% if(disabled) { %> disabled <% } %> >
            <small id="txtUserHelp" class="form-text"></small>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="txtEmail">Correo Electrónico</label>
            <input type="email" class="form-control" id="txtEmail" aria-describedby="txtEmailHelp" placeholder="Ingrese correo" value="<%= user.get('email') %>" <% if(disabled) { %> disabled <% } %> >
            <small id="txtEmailHelp" class="form-text"></small>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="txtPass">Contraseña</label>
            <input type="password" class="form-control" id="txtPass" aria-describedby="txtPassHelp" placeholder="Ingrese contraseña" <% if(disabled) { %> disabled <% } %> >
            <small id="txtPassHelp" class="form-text"></small>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="txtPassRepeat">Confirme Contraseña</label>
            <input type="password" class="form-control" id="txtPassRepeat" aria-describedby="txtPassRepeatHelp" placeholder="Reingrese contraseña" <% if(disabled) { %> disabled <% } %> >
            <small id="txtPassRepeatHelp" class="form-text"></small>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="selState">Estado</label>
            <select class="form-control" id="selState" <% if(disabled) { %> disabled <% } %> >
              <option value="E"></option>
              <% for (var i = 0; i < states.length; i++){ %>
                <% if(user.get('state_id') == states[i]._id){ %>
                <option value="<%= states[i]._id %>" selected><%= states[i].name %></option>
                <% } else { %>
                  <option value="<%= states[i]._id %>"><%= states[i].name %></option>
                <% } %>
              <% } %>
            </select>
            <small id="selStateHelp" class="form-text"></small>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="form-group">
            <label for="txtPicture">Imagen de Perfil</label>
            <button id="btnSelectPicture" class="btn btn-primary" style="margin-top: 3px;" <% if(disabled) { %> disabled <% } %> > 
              <i class="fa fa-search btn-icon" aria-hidden="true"></i>
              Buscar Archivo
            </button>
            <input type="file" class="custom-file-input d-none" id="filePicture">
            <button id="btnUploadPicture" class="btn btn-primary" style="margin-top: 3px; margin-left: 10px;" <% if(disabled) { %> disabled <% } %> > 
              <i class="fa fa-upload btn-icon" aria-hidden="true"></i>
              Subir
            </button>
            <small id="txtPictureHelp" class="form-text"></small>
          </div>
        </div>
        <div class="col-md-4">
          <img id="imgPicture" height="75" width="75" src="<%= statics_url + 'uploads/' + user.get('profile_picture') %>"> 
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button id="btnGeneratePassword" class="btn btn-primary" <% if(disabled) { %> disabled <% } %> > 
        <i class="fa fa-refresh btn-icon" aria-hidden="true"></i>
        Generar Contraseña
      </button>
      <button id="btnSaveUser" class="btn btn-success" <% if(disabled) { %> disabled <% } %> > 
        <i class="fa fa-check btn-icon" aria-hidden="true"></i>
        Guardar Cambios
      </button>
      <button type="button" class="btn btn-secondary close-modal" data-dismiss="modal">
        <i class="fa fa-times btn-icon" aria-hidden="true"></i>
        Cerrar Ventana
      </button>
    </div>
  </div>
</div>
`);

export default UserDetailTemplate;
