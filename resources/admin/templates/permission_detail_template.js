import _ from 'underscore';

var PermissionDetailTemplate = _.template(`
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
          <label id="permissionDetailMessage" class="text-danger"><%= message %></label>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="txtName">Nombre</label>
            <input type="text" class="form-control" id="txtName" aria-describedby="txtNameHelp" placeholder="Ingrese nombre" value="<%= permission.get('name') %>" <% if(disabled) { %> disabled <% } %> >
            <small id="txtNameHelp" class="form-text"></small>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="txtKey">Llave</label>
            <input type="text" class="form-control" id="txtKey" aria-describedby="txtKeyHelp" placeholder="Ingrese llave" value="<%= permission.get('key') %>" <% if(disabled) { %> disabled <% } %> >
            <small id="txtKeyHelp" class="form-text"></small>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button id="btnSave" class="btn btn-success" <% if(disabled) { %> disabled <% } %> > 
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

export default PermissionDetailTemplate;
