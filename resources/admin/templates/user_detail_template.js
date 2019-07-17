import _ from 'underscore';

var UserDetailTemplate = _.template(`
<div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel"><%= title %></h5>
      <button type="button" class="close close-modal" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="user">Usuario</label>
            <input type="text" class="form-control" id="txtUser" aria-describedby="userHelp" placeholder="Ingrese usuario">
            <small id="userHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" class="form-control" id="txtMmail" aria-describedby="emailHelp" placeholder="Ingrese correo">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="pass">Contraseña</label>
            <input type="password" class="form-control" id="txtPass" aria-describedby="passHelp" placeholder="Ingrese contraseña">
            <small id="passHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="passRepeat">Confirme Contraseña</label>
            <input type="password" class="form-control" id="txtPassRepeat" aria-describedby="passRepeatHelp" placeholder="Reingrese contraseña">
            <small id="passRepeatHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary"> 
        <i class="fa fa-refresh btn-icon" aria-hidden="true"></i>
        Generar Contraseña
      </button>
      <button class="btn btn-success"> 
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
