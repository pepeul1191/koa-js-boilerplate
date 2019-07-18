import Backbone from 'backbone';

var User = Backbone.Model.extend({
  defaults: {
    id: 'E',
    user: '',
    pass: '',
    email: '',
    profile_picture: '',
  },
  initialize: function() {
  },
});

export default User;