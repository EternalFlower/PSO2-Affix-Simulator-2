Ext.define('Ext.ux.Mediator', {
    singleton: true,
    mixins: ['Ext.mixin.Observable'],
  
    constructor: function (config) {
        this.mixins.observable.constructor.call(this, config);
    }
});