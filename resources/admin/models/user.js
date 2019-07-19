import Backbone from 'backbone';

var User = Backbone.Model.extend({
  defaults: {
    _id: 'E',
    user: '',
    pass: '',
    email: '',
    profile_picture: 'default_user.png',
    state_id: '',
  },
  initialize: function() {
  },
});

export default User;