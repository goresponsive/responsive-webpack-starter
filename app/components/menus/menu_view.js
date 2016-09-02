'use strict';

import Template from './navbar.hbs';
import Marionette from 'marionette';
import Constants from 'constants';
import Channels from 'channels';
import styles from './menu.scss';

let MenuView = Marionette.ItemView.extend({

  template: Template,

  className: 'navbar',

  tagName: 'nav',

  ui: {},

  events: {},

  initialize() {
    this.menuLinks = _.filter(Constants.Menu.Links, (link) => link.menu);
    this.brand = Constants.Menu.Brand;
  },
  onRender() {},
  serializeData() {
    return {
      menuItems: this.menuLinks,
      header: Constants.HEADER,
      styles
    };
  },
  templateHelpers() {
    return { styles };
  },
  openContact(e) {
    e.preventDefault();
    Channels.app.trigger('contact:open');
  },
  openNav() {
    if (Constants.GLOBAL.isMobile) {
      $(this.ui.toggle).toggleClass('close');
      Channels.region.trigger('openmenu');
    }
  },
  closeNav() {
    if (Constants.GLOBAL.isMobile) {
      $(this.ui.toggle).removeClass('close');
      Channels.region.trigger('closemenu');
      Channels.app.trigger('noScroll:off');
    }
  },
  onLinkClick(e) {
    let nextRoute = e.target.hash.replace('#!/', '');
    Channels.app.trigger('route:next', nextRoute);
    this.openNav();
  }
});

export default MenuView;
