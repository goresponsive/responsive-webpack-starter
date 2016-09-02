'use strict';

import './utils/model_json';
import './utils/model_localstorage';
import 'backbone.validation';
import App from './app';
import Backbone from 'backbone';

const app = new App();

app.on('start', () => {
  $(function() {
    if (Backbone.history && !Backbone.History.started) {
      Backbone.history.start();
    }
  });
});

app.start();
