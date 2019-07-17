import _ from 'underscore';

var UserListTemplate = _.template(`
  <h2 class="page-tittle">Gestión de Usuarios</h2>
  <br>
  <div class="row">
    <div class="col-md-6">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Usuario</th>
            <th scope="col">Correo</th>
            <th scope="col" class="text-center">Operaciones</th>
          </tr>
        </thead>
        <tbody>
          <% for (var i = 0; i < users.length; i++){ %>
          <tr>
            <td><%= users[i].user %></td>
            <td><%= users[i].email %></td>
            <td class="text-center">
              <a href="<%= base_url %>admin/#/user/edit/<%= users[i]._id %>">
                <i class="fa fa-pencil row-icon" aria-hidden="true"></i>
              </a>
              <a href="<%= base_url %>admin/#/user/mail/<%= users[i]._id %>">
                <i class="fa fa-envelope row-icon" aria-hidden="true"></i>
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
              <a href="<%= base_url %>admin/#/user/create" class="btn btn-primary pull-right">
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

export default UserListTemplate;
