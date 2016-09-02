'use strict';

import Marionette from 'marionette';
import HomeLayout from './views/home/home_layout';
import HomeModel from './views/home/home_model';
import Channels from 'channels';
import Constants from 'constants';

const AppController = Marionette.Controller.extend({

  initialize(options) {
    this.routeOrders = _.map(Constants.Menu.Links, (link, index) => {
      return {
        route: link.route.replace('#!/', ''),
        order: index
      };
    });
    this.listenTo(Channels.app, 'route:next', (route) => this.nextRoute = route);
    this.isMobile = Constants.GLOBAL.isMobile;
  },

  showHomePage(options) {
    this.getOption('region').show(new HomeLayout({
      model: new HomeModel({ isMobile: this.isMobile })
    }), this.scrollTop());
  },

  scrollTop(options) {
    _.delay(() => {
      let scrollTop = options ? $(`.${options}`).position().top - 100 : 0;
      $('html, body').animate({ scrollTop }, 0);
    }, 10);
  }

});

export default AppController;
