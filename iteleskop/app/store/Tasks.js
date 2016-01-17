Ext.define('iTeleskop.store.Tasks', {
    extend: 'Ext.data.Store',

    storeId: 'tasks',

    alias: 'store.tasks',

    fields: [
        'task_id',
        'state',
        'object',
        'ra',
        'decl',
        'login',
        'descr',
        'comment',
        'filter',
        'binning',
        'defocus',
        'calibrate',
        'solve',
        'vphot',
        'other_cmd',
        'min_alt',
        'moon_distance',
        'skip_before',
        'skip_after',
        'skip_interval',
        'skip_period_seconds',
        'skip_period_count',
        'imagename'
    ],

    proxy: {
        type: 'direct',
        directFn: 'Tasks.getResults'
    },

    autoLoad: true
});
