Ext.define('iTeleskop.view.main.Users', {
    extend: 'Ext.grid.Panel',
    xtype: 'users',

    requires: [
        'iTeleskop.store.Users'
    ],

    title: 'Zadania',

    store: {
        type: 'users'
    },

    // Display all user's details. For now it simply displays first, last name
    // and an id
    tooltip: function(value, metaData, record) {
        var tip = record.get('firstname') + " " + record.get('lastname') + "<br/>";
        tip += 'ID: <b>' + record.get('user_id') + '</b><br/>';
        tip += 'AAVSO ID: <b>' + record.get('aavso_id') + '</b>';
        metaData.tdAttr = 'data-qtip="' + tip + '"';
        return value;
    },

    columns: [
        { text: 'User ID',  dataIndex: 'user_id' },
        { text: 'Login', dataIndex: 'login',
          renderer: function (value, metaData, record) {
              return this.tooltip(value, metaData, record);
          }
        },
        { text: 'Name', dataIndex: 'firstname', flex: 1 },
        { text: 'Last name', dataIndex: 'lastname', flex: 1 },
        { text: 'Shares', dataIndex: 'share' },
        { text: 'Phone', dataIndex: 'phone' },
        { text: 'e-mail', dataIndex: 'email', flex: 1 },
        { text: 'Permissions', dataIndex: 'permissions', flex: 1,
          renderer: function(value) {
              var txt = "";
              // @todo:
              if (value & 1) {
                  txt = "admin";
              }
              if (value & 2) {
                  if (txt.length) {
                      txt += ",";
                  }
                  txt += "task edit";
              }
              return (txt);
          }
        },
        { text: 'AAVSO ID', dataIndex: 'aavso_id' }
    ]
});
