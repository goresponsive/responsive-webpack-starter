'use strict';

import Marionette from 'marionette';
import Constants from 'constants';
import Template from './footer.hbs';
import styles from './footer.scss';

let Footer = Marionette.ItemView.extend({
  tagName: 'footer',
  className: styles.footer,
  template: Template,
  templateHelpers() {
    return {
      copyright: Constants.FOOTER.copyright,
      contact: Constants.FOOTER.contact,
      styles
    };
  }
});

export default Footer;
