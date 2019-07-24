import Backbone from 'backbone';

var Permission = Backbone.Model.extend({
  defaults: {
    _id: 'E',
    name: '',
    key: '',
  },
  initialize: function() {
  },
});

export default Permission;