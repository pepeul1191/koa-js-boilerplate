import Backbone from 'backbone';

var Permission = Backbone.Model.extend({
  defaults: {
    _id: 'E',
    name: '',
    key: '',
    system_id: '',
  },
  initialize: function() {
  },
});

export default Permission;