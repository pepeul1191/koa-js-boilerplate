import _ from 'underscore';

var UserDetailTemplate = _.template(`
  <h2 class="page-tittle"><%= title %></h2>
  <br>
  <div class="row">
    <div class="col-md-3">
      <div class="form-group">
        <label for="user">Usuario</label>
        <input type="text" class="form-control" id="user" aria-describedby="userHelp" placeholder="Ingrese usuario">
        <small id="userHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
    </div>
    <div class="col-md-3">
      <div class="form-group">
        <label for="pass">Contraseña</label>
        <input type="text" class="form-control" id="pass" aria-describedby="passHelp" placeholder="Ingrese contraseña">
        <small id="passHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
    </div>
    <div class="col-md-3">
      <div class="form-group">
        <label for="passRepeat">Confirme Contraseña</label>
        <input type="text" class="form-control" id="passRepeat" aria-describedby="passRepeatHelp" placeholder="Reingrese contraseña">
        <small id="passRepeatHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
    </div>
    <div class="col-md-3">
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Ingrese correo">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
    </div>
  </div>
  <div class="row>
    <div class="col-md-3 offset-md-9c">
      <div class="form-group">
        <button class="btn btn-primary"> 
          <i class="fa fa-check btn-icon" aria-hidden="true"></i>
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
`);

export default UserDetailTemplate;
