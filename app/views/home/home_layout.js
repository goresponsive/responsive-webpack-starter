'use strict';
import Marionette from 'marionette';
import Template from './home-layout.hbs';
import styles from './home.scss';

let HomeLayoutView = Marionette.LayoutView.extend({

  template: Template,
  className: 'slide',
  regions: {},
  initialize() {
    $('link[rel=alternate],link[rel=canonical]').prop('href', window.location.href);
    $('title').text(_.get(this.model.get('seo'), 'title'));
    $('meta[name=description]').prop('content', _.get(this.model.get('seo'), 'description'));
    $('meta[name=keyword]').prop('content', _.get(this.model.get('seo'), 'keyword'));
  },
  onDestroy() {},
  onRender() {},
  onShow() {},
  templateHelpers() {
    return {
      styles
    };
  }

});

export default HomeLayoutView;
