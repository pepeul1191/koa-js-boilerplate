import _ from 'underscore';

var PermissionListTemplate = _.template(`
  <h2 class="page-tittle">Gestión de Permisos del Sistema</h2>
  <br>  
  <div class="row">
    <div class="col-md-12">
      <label id="message" class="text-danger"><%= message %></label>
    </div>
    <div class="col-md-6">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Llave</th>
            <th scope="col" class="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          <% for (var i = 0; i < permissions.length; i++){ %>
          <tr>
            <td><%= permissions[i].name %></td>
            <td><%= permissions[i].key %></td>
            <td class="text-center">
              <a href="<%= base_url %>admin/#/permission/<%= system_id %>/edit/<%= permissions[i]._id %>">
                <i class="fa fa-pencil row-icon" aria-hidden="true"></i>
              </a>
              <a class="delete-row" permission_id="<%= permissions[i]._id %>">
                <i class="fa fa-times row-icon" aria-hidden="true"></i>
              </a>
            </td>
          </tr>
          <% } %>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="2">
              <% if (page != 1){ %>
                <i id="btnGoBegin" class="fa fa-angle-double-left footer-icon" aria-hidden="true"></i>
                <i id="btnGoPrevious" class="fa fa-angle-left footer-icon" aria-hidden="true"></i>
              <% } %>
              <label> <%= page %> / <%= pages %> </label>
              <% if (page != pages){ %>
                <i id="btnGoNext" class="fa fa-angle-right footer-icon" aria-hidden="true"></i>
                <i id="btnGoLast" class="fa fa-angle-double-right footer-icon" aria-hidden="true"></i>
              <% } %>
            </th>
            <th colspan="1">
              <a href="<%= base_url %>admin/#/permission/<%= system_id %>/create" class="btn btn-primary pull-right">
                <i class="fa fa-plus btn-icon" aria-hidden="true"></i>
                Agregar Registro
              </a>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
`);

export default PermissionListTemplate;
