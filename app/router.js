'use strict';

import Marionette from 'marionette';

let router = Marionette.AppRouter.extend({

  appRoutes: {
    '': 'showHomePage'
    // Add more routes as below, the name placed here will be the same as the function on controller.js
    // '!/contact': 'showContact',
  },

  routes: {
    '*notFound': 'notFound'
  },

  notFound(route) {
    this.navigate('', { trigger: true, replace: true });
  }

});

export default router;
