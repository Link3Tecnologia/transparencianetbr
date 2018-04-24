Ext.Loader.setConfig({
    enabled: true
});
Ext.require(['Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.grid.plugin.BufferedRenderer']);
Ext.onReady(function () {
    Ext.define('EntidadeModel', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'id',
            mapping: 'id'
        }, {
            name: 'nome',
            mapping: 'nome'
        }, {
            name: 'uf',
            mapping: 'uf'
        }, {
            name: 'descricao',
            type: 'string',
            convert: function (newValue, model) {
                return model.get('uf') + ' - ' + model.get('nome');
            }
        }]
    });
    // create the Data Store
    var store = Ext.create('Ext.data.Store', {
        id: 'EntidadeStore',
        model: 'EntidadeModel',
        proxy: {
            type: 'rest',
            url: 'entidade/list',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    });
    // create UF store
    var ufStore = Ext.create('Ext.data.Store', {
        fields: ['uf', 'nome'],
        data: [{
            "uf": "",
            "nome": "Todos"
        }, {
            "uf": "AL",
            "nome": "Alagoas"
        }, {
            "uf": "AP",
            "nome": "Amapá"
        }, {
            "uf": "BA",
            "nome": "Bahia"
        }, {
            "uf": "PA",
            "nome": "Pará"
        }, {
            "uf": "SE",
            "nome": "Sergipe"
        }]
    });
    // create grid
    var grid = Ext.create('Ext.grid.Panel', {
        width: 700,
        height: 500,
        collapsible: true,
        title: 'Entidades',
        store: store,
        loadMask: true,
        dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'combobox',
                fieldLabel: 'UF',
                labelAlign: 'right',
                labelWidth: 30,
                flex: 1,
                emptyText: 'UF opcional',
                store: ufStore,
                queryMode: 'local',
                name: 'uf',
                displayField: 'nome',
                valueField: 'uf',
                listeners: {
                    change: function (combo, newValue, oldValue, eOpts) {
                        loadData();
                    }
                }
            }, '-', {
                flex: 2,
                emptyText: 'digite o nome de um município',
                fieldLabel: 'Localizar',
                xtype: 'textfield',
                labelAlign: 'right',
                labelWidth: 55,
                store: store,
                name:'municipio',
                listeners: {
                    change: function (field, newValue, oldValue, eOpts) {
                        loadData();
                    }
                }
            }]
        }],
        selModel: {
            pruneRemoved: false
        },
        multiSelect: false,
        viewConfig: {
            trackOver: false,
            emptyText: '<h1 style="margin:20px">Nenhum resultado encontrado</h1>'
        },
        // grid columns
        columns: [{
            xtype: 'rownumberer',
            width: 50,
            sortable: false,
            align: 'center'
        }, {
            text: "Nome",
            dataIndex: 'descricao',
            width: 500,
            flex: 1,
            align: 'left',
            renderer: renderDescricao
        }],
        renderTo: "entidadesForm"
    });

    function loadData() {
        var params = formToBean();
        Ext.Ajax.request({
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'entidade/list',
            params: Ext.JSON.encode(params),
            scope: this,
            success: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if (jsonResponse.success) {
                    store.loadData(jsonResponse.data, false);
                    var htmlVersion = Ext.get("version");
                    if (htmlVersion) {
                        htmlVersion.setHTML(Ext.String.format('<p>Não é recomendado a utilização com Internet Explorer - {0}</p>', jsonResponse.server_version));
                    }
                } else {
                    // Ext.MessageBox.alert('Entidades', jsonResponse.message);
                }
            },
            failure: function (response, opts) {
                if (response.responseText) {
                    var jsonResponse = Ext.JSON.decode(response.responseText);
                }
            }
        });
    }

    function formToBean() {
        var bean = {
            values: {
                'entidade.uf': grid.down('combobox[name=uf]').getValue(),
                'entidade.nome': grid.down('textfield[name=municipio]').getValue()
            }
        };
        return bean;
    }

    function renderDescricao(value, p, record) {
        return Ext.String.format('<a href="{0}{1}" target="_blank">{2}</a>', document.URL, record.data.id, value);
    }

    function buildContatoLink() {
        var contatoLink = Ext.get('contatoLink');
        if (contatoLink) {
            contatoLink.on('click', function (e, t, eOpts) {
                Ext.MessageBox.alert('Contato', 'Por favor, primeiro escolha uma entidade na lista abaixo e só então click em "contato"');
                return false;
            }, this);
        }
    }

    // inicio
    loadData();
    buildContatoLink();
});
