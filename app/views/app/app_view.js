'use strict';

import Marionette from 'marionette';
import Template from './app.hbs';
import MenuView from '../../components/menus/menu_view';
import HomeView from '../home/home_layout';
import HomeModel from '../home/home_model';
import Footer from '../../components/footer/footer_view';
import styles from './app.scss';

let AppLayoutView = Marionette.LayoutView.extend({

  template: Template,

  tagName: 'div',

  className: 'appView',

  regions: {
    navRegion: '[region="nav"]',
    contentRegion: '[region=content]',
    footerRegion: '[region="footer"]'
  },

  ui: {},

  events: {},
  initialize() {},
  onShow() {},
  onRender() {
    setTimeout(() => {
      let menuView = new MenuView();
      this.navRegion.show(menuView);

      let homeView = new HomeView({
        model: new HomeModel()
      });
      this.contentRegion.show(homeView);

      let footer = new Footer();
      this.footerRegion.show(footer);
    }, 1);
  },
  templateHelpers() {
    return { styles };
  }

});

export default AppLayoutView;
