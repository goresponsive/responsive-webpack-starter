/**
 * # Application Wide Event Channels
 * @description You will often see this file imported into modules as just `require('channels')`.
 */
'use strict';

/**
 * *Module Imports*
 */
import Radio from 'backbone.radio';
import Backbone from 'backbone';
import Marionette from 'marionette';

/**
 * Define our individual channels.
 */
let WindowChannel = Radio.channel('window');
let AppChannel = Radio.channel('app');
let DataChannel = Radio.channel('data');
let RegionChannel = Radio.channel('region');

/**
 * Override Marionette's `_initChannel` method to use `Backbone.Radio` instead of `Backbone.Wreqr`.
 * @method `_initChannel`
 * @private
 * @override
 */
Marionette.Application.prototype._initChannel = function() {
  this.channelName = _.result(this, 'channelName') || 'global';
  this.channel = _.result(this, 'channel') || Radio.channel(this.channelName);
};

/**
 * Here we bind to a few events on the `window` object and pass them throught to
 * the `WindowChannel`. This allows us to only have one listener on the DOM and allows
 * `Backbone.Radio` to spread that event to the application.
 */
let $window = $(window);
$window.on('resize', _.bind(WindowChannel.trigger, WindowChannel, 'resize'));
$window.on('offline', _.bind(WindowChannel.trigger, WindowChannel, 'offline'));
$window.on('scroll', _.bind(WindowChannel.trigger, WindowChannel, 'scroll'));
$window.on('unload', _.bind(WindowChannel.trigger, WindowChannel, 'unload'));

/**
 * Add a global route change trigger on the Application channel.
 */
let currRoute;
let prevRoute;

Backbone.history.on('route', () => {
  prevRoute = currRoute;
  currRoute = Backbone.history.getFragment();
  AppChannel.trigger.apply(AppChannel, [ 'route', prevRoute, currRoute ]);
});

AppChannel.reply('route:previous', () => prevRoute);
AppChannel.reply('route:current', () => currRoute);

/**
 * Setup the `Channels` object for export.
 */
let Channels = {
  window: WindowChannel,
  app: AppChannel,
  data: DataChannel,
  region: RegionChannel
};

export default Channels;
