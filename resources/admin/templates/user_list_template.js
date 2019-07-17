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
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <% for (var i = 0; i < users.length; i++){ %>
          <tr>
            <td><%= users[i].user %></td>
            <td><%= users[i].email %></td>
            <td>
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
            <th colspan="3">
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
