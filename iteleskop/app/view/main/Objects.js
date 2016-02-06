Ext.define('iTeleskop.view.main.Objects', {
    extend: 'Ext.grid.Panel',
    xtype: 'objects',

    requires: [
        'iTeleskop.store.Objects'
    ],

    title: 'Objects',

    store: {
        type: 'objects'
    },

    columns: [
        { text: 'Target name', dataIndex: 'name' },
        { text: 'RA', dataIndex: 'ra', renderer: function(value) { return RAfloatToHMS(value); } },
        { text: 'Dec', dataIndex: 'decl', renderer: function(value) { return DeclinationFloatToDMS(value); } },
        { text: 'Description', dataIndex: 'descr' },
        { text: 'Comment', dataIndex: 'comment' },
        { text: 'Const.', dataIndex: 'const' },
        { text: 'Magnitude', dataIndex: 'magn' },
        { text: 'Dimensions', dataIndex: 'none',
          renderer: function(value, metaData, record) {
              var x = record.get('x');
              var y = record.get('y');
              if (x === null)
                  return '-';
              if (y === null)
                  return x;
              return x + "x" + y;
          }
        },
        { text: 'Type', dataIndex: 'type',
          renderer: function (value) {
              if (value == "nul") {
                  return "";
              }
              return value;
          }},
    ],

    listeners: {
        beforerender: function(component, eOpts) {
            Ext.getStore('objects').load();
        }
    }
});
