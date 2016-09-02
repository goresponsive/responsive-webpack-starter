/**
 * # Model Persistence Augmentation
 * @description This module augments `Backbone.Models` with the ability to persist
 * in `localStorage` by supply `store: true` in their options.
 *
 * This module is injected at the beginning of the Application.
 */
'use strict';
/*eslint-disable */

/**
 * *Module Imports*
 */
import Backbone from 'backbone';
import Channels from 'channels';

let BackboneModelConstructor = Backbone.Model;
let BackboneCollectionConstructor = Backbone.Collection;

let Methods = {
  _getFromStore: function() {
    return JSON.parse(localStorage.getItem(this.name));
  },
  _saveToStore: function() {
    try {
      if (this.storeFullJSON) {
        localStorage.setItem(this.name, JSON.stringify(this.toFullJSON()));
      } else {
        localStorage.setItem(this.name, JSON.stringify(this.toJSON()));
      }
    } catch (e) {
      Channels.app.trigger('error', { status: e.code });
    }
  },
  _clearFromStore: function() {
    localStorage.removeItem(this.name);
  }
};

/**
 * Augmented `Backbone.Model`
 * @constructor
 * @override
 */
Backbone.Model = Backbone.Model.extend({
  constructor() {
    Channels.data.reply('get:' + (this.name || this.cid), this);

    if (this.store && this.name) {
      let json = Methods._getFromStore.call(this);
      /**
       * If JSON is returned from Local Storage, overwrite this models
       * default attributes.
       */
      if (json) {
        this.originalDefaults = _.clone(this.defaults);
        this.defaults = _.extend(this.defaults, json);
      }
      this.listenTo(this, 'change reset add remove', Methods._saveToStore.bind(this), this);
      this.listenTo(Channels.window, 'offline', Methods._saveToStore.bind(this), this);
    }
    BackboneModelConstructor.apply(this, arguments);
  }
});

Backbone.Model.prototype.constructor = BackboneModelConstructor;

Backbone.Collection = Backbone.Collection.extend({
  constructor(models, options) {
    Channels.data.reply('get:' + (this.name || this.cid), this);

    let json;
    if (this.store && this.name) {
      json = Methods._getFromStore.call(this);
      this.listenTo(this, 'update set reset add remove', Methods._saveToStore.bind(this), this);
      this.listenTo(Channels.window, 'offline', Methods._saveToStore.bind(this), this);
    }
    BackboneCollectionConstructor.call(this, (models || []).concat(json || []), options);
  }
});

Backbone.Collection.prototype.constructor = BackboneCollectionConstructor;
