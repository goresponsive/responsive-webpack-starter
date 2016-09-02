/**
 * # Model JSON Augmentations
 * @description This module augments `Backbone.Model` JSON methods.
 */
'use strict';

/**
 * *Module Imports*
 */
import Backbone from 'backbone';

/**
 * Extend the `toJSON` method to recursively `toJSON` nested Models and Collections.
 * @method `toJSON`
 * @override
 *
 * @returns {Object} An object containing the model and all its childrens attributes.
 */
Backbone.Model.prototype.toFullJSON = function() {
  if (this._isSerializing) {
    return this.id || this.cid;
  }
  this._isSerializing = true;
  let json = _.clone(this.attributes);
  _.forEach(json, (value, name) => {
    if (value && _.isFunction(value.toFullJSON)) {
      json[name] = value.toFullJSON();
    }
  });
  this._isSerializing = false;
  return json;
};

/**
 * Output the model as JSON minus any attributes defined in the `omitInJSON` property of the model.
 * @method `Model.toJSON`
 *
 * @returns {Object} An object containing the model and all its childrens attributes, minus any
 * attributes defined in the `omitInJSON` property of the model.
 */
Backbone.Model.prototype.toJSON = function() {
  if (!this.omitInJSON) {
    return this.toFullJSON();
  }
  if (this._isSerializing) {
    return this.id || this.cid;
  }
  this._isSerializing = true;
  let json = _.clone(this.attributes);
  json = _.omit(json, this.omitInJSON);
  _.forEach(json, (value, name) => {
    if (value && _.isFunction(value.toJSON)) {
      json[name] = value.toJSON();
    }
  });
  this._isSerializing = false;
  return json;
};

/**
 * Map over models in a collection and call `toJSON` on each if `toJSON` is called on the collection.
 * @method `Collection.toJSON`
 *
 * @returns {Object} An object containing a 'clean' JSON of the collection.
 */
Backbone.Collection.prototype.toJSON = function() {
  return this.map((model) => model.toJSON());
};
