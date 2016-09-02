'use strict';

import Backbone from 'backbone';

let HomeModel = Backbone.Model.extend({
  name: 'homeModel',
  store: false,
  initialize(attributes, options) {},
  defaults: {
    title: 'testing'
  }
});

export default HomeModel;
