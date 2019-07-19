import Backbone from 'backbone';

var User = Backbone.Model.extend({
  defaults: {
    id: 'E',
    user: '',
    pass: '',
    email: '',
    profile_picture: 'default_user.png',
  },
  initialize: function() {
  },
});

export default User;