'use strict';
import Backbone from 'backbone';
import Marionette from 'marionette';
import Router from './router';
import Channels from 'channels';
import Controller from './controller';
import AppView from './views/app/app_view';
import AppModel from './views/app/app_model';
import 'cssuseragent';
import 'ga';

let App = Marionette.Application.extend({
  regions: {
    appRegion: '#app'
  },

  initialize() {
    this.model = Channels.data.request('get:AppModel') || new AppModel();
    this.listenTo(Channels.app, 'reset:app', this.reInitAppModel);
    this.listenTo(Channels.app, 'error', this.onError, this);
    this.listenTo(Channels.app, 'offline', this.onOffline, this);
    this.listenTo(Channels.app, 'noScroll:on', this.noScrollOn, this);
    this.listenTo(Channels.app, 'noScroll:off', this.noScrollOff, this);
    $('#app').hide();
  },

  onStart() {
    localStorage.removeItem('homeModel');
    setTimeout(() => {
      $('#app').show();
    }, 10);
    this.view = new AppView({
      model: this.model
    });

    this.appRegion.show(this.view);
    this.initRouter();
  },

  onDestroy() {
    Backbone.history.stop();
  },

  onError() {
    // handle app errors
  },

  onOffline() {
    // handle if app goes offline
  },

  reInitAppModel() {
    this.model = new AppModel();
  },

  initRouter() {
    return new Router({
      controller: new Controller({
        region: this.view.contentRegion
      })
    });
  }
});

export default App;
