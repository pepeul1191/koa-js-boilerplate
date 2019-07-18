import Backbone from 'backbone';

var User = Backbone.Model.extend({
  defaults: {
    id: 'E',
    user: '',
    pass: '',
    email: '',
  },
  initialize: function() {
  },
});

export default User;