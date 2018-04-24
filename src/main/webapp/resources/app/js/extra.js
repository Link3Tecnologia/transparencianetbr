Ext.require(['Ext.form.*', 'Ext.form.*', 'Ext.tip.QuickTipManager']);
Ext.onReady(function () {
    // define Conta Model
    Ext.define('ContaModel', {
        extend: 'Ext.data.Model',
        fields: ['nomeconta']
    });
    // define Conta Store
    var contaStore = Ext.create('Ext.data.Store', {
        id: 'ContaStore',
        model: 'ContaModel',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    });
    // define o formulario
    var formDespesa = Ext.create('Ext.form.Panel', {
        title: Ext.String.format('Consulta Básica - {0} Extras', (tipo == 'despesas') ? 'Despesas' : 'Receitas'),
        renderTo: 'consultaExtraForm',
        layout: {
            type: 'vbox',
            padding: '5',
            align: 'stretchmax'
        },
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 120,
            msgTarget: 'side'
        },
        items: [{
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                padding: '5',
                align: 'stretch'
            },
            items: [{
                xtype: 'datefield',
                name: 'dataIni',
                fieldLabel: 'Período',
                emptyText: 'Data Inicial',
                format: 'd/m/Y',
                maxValue: Ext.Date.subtract(new Date(), Ext.Date.DAY, 1)
            }, {
                xtype: 'datefield',
                name: 'dataFim',
                emptyText: 'Data Final',
                fieldLabel: 'a',
                labelWidth: 20,
                labelSeparator: '',
                format: 'd/m/Y',
                maxValue: Ext.Date.subtract(new Date(), Ext.Date.DAY, 1),
                labelPad: 10
            }]
        }, {
            xtype: 'combobox',
            store: contaStore,
            fieldLabel: 'Conta',
            queryMode: 'local',
            displayField: 'nomeconta',
            valueField: 'nomeconta',
            emptyText: 'Todas',
            editable: false,
            listeners: {
                change: function (combo, newValue, oldValue, eOpts) {
                    loadData();
                }
            }
        }],
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{
                xtype: 'button',
                text: 'Imprimir',
                iconCls: 'imprime_button',
                handler: function () {
                    window.print();
                }
            }, '->', '-', {
                xtype: 'button',
                text: 'Limpar campos',
                iconCls: 'clean_button',
                handler: function () {
                    clearForm();
                    loadData();
                }
            }, {
                xtype: 'button',
                text: 'Consultar',
                iconCls: 'filtro_button',
                handler: function () {
                    loadData();
                }
            }]
        }]
    });
    // despesa model
    Ext.define('ExtraModel', {
        extend: 'Ext.data.Model',
        fields: ['entidade_id',
            {
                name: 'data',
                type: 'date',
                dateFormat: 'd/m/Y'
            },
//		          'data',
            'numero', 'conta', 'nomeconta', 'valor', 'obs']
    });
    // create the Data Store
    var extraStore = Ext.create('Ext.data.Store', {
        id: 'extraStore',
        model: 'ExtraModel',
        proxy: {
            type: 'rest',
            url: '${entidade.codigo}/despesa/list',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    });
    // create grid
    var grid = Ext.create('Ext.grid.Panel', {
        height: 500,
        collapsible: true,
        title: 'Resultado da Consulta',
        store: extraStore,
        loadMask: true,
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
            text: 'Data',
            dataIndex: 'data',
            width: 80,
            type: 'date',
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
            align: 'center',
            allowBlank: false
        }, {
            text: 'Documento',
            dataIndex: 'numero',
            width: 90,
            align: 'center',
            renderer: renderDocumento
        }, {
            text: 'Conta',
            dataIndex: 'conta',
            flex: 1
        }, {
            text: 'Nome da Conta',
            dataIndex: 'nomeconta',
            flex: 1
        }, {
            text: 'OBS',
            dataIndex: 'obs',
            flex: 1
        }, {
            text: 'Valor',
            dataIndex: 'valor',
            width: 100,
            align: 'right',
            renderer: rendererBrMoney
        }],
        bbar: ['->', '-', {
            xtype: 'label',
            text: 'Página: 0/0'
        }, {
            xtype: 'numberfield',
            fieldLabel: 'página',
            emptyText: 'nº',
            labelWidth: 40,
            labelAligh: 'right',
            width: 100,
            hideTrigger: true
        }, {
            text: 'Ir',
            name: 'irButton',
            handler: function (b, e, eOpts) {
                var irPage = b.ownerCt.down('numberfield').getValue();
                if ((irPage < 1) || (irPage > total_Pages)) {
                    Ext.MessageBox.show({
                        title: 'Página Inválida',
                        msg: 'A página solicitada não é válida!',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING,
                        width: 300
                    });
                } else {
                    loadData(irPage);
                }
            }
        }, '-', {
            text: 'Primeiro',
            iconCls: 'primeiro_button',
            tooltip: 'Primeiro Lançamento',
            handler: function () {
                loadData(1);
            }
        }, {
            text: 'Anterior',
            iconCls: 'anterior_button',
            tooltip: 'Anterior Lançamento',
            handler: function () {
                loadData(currentPage - 1);
            }
        }, {
            text: 'Próximo',
            iconCls: 'proximo_button',
            tooltip: 'Proximo Lançamento',
            handler: function () {
                loadData(currentPage + 1);
            }
        }, {
            text: 'Último',
            iconCls: 'ultimo_button',
            tooltip: 'Ultimo Lançamento',
            handler: function () {
                loadData(total_Pages);
            }
        }],
        renderTo: 'extraGrid'
    });

    // downloadPanel
    var downloadPanel = Ext.create('Ext.toolbar.Toolbar', {
        dock: 'bottom',
        renderTo: 'downloadPanel',
        items: ['->', {
            xtype: 'tbspacer',
            width: 50
        }, '-', {
            xtype: 'label',
            text: 'Clique aqui para baixar dados do portal'
        }, {
            xtype: 'button',
            iconCls: 'xls_button',
            handler: function () {
                exportContent('xls')
            }
        }, {
            xtype: 'button',
            iconCls: 'txt_button',
            handler: function () {
                exportContent('txt')
            }

        }]
    });

    function exportContent(format) {
        var params = formToBean(currentPage);
        params.values.format = format;
        var form = document.createElement('form');
        form.action = Ext.String.format('{0}EXTRA/dataExport', (tipo == 'despesas') ? 'PAGAMENTO' : 'RECEITA');
        form.method = 'POST';
        form.target = '_self';
        form.style.display = 'none';
        var input = document.createElement('input');
        input.name = 'params';
        input.type = 'hidden';
        input.value = Ext.JSON.encode(params);
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    }

    function renderDocumento(value, p, record) {
        return Ext.String.format('<a href="{0}/{1}extra/{2}">{3}</a>', getURLBaseApp(document, record.data.entidade_id), (tipo == 'despesas') ? 'despesa' : 'receita', record.data.id, value);
    }

    function loadContaData() {
        var params = {
            values: {}
        };
        Ext.Ajax.request({
            headers: {
                'Content-Type': 'application/json'
            },
            url: Ext.String.format('{0}extras/contalist', tipo),
            params: Ext.JSON.encode(params),
            scope: this,
            success: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if (jsonResponse.success) {
                    contaStore.loadData(jsonResponse.data, false);
                } else {
                    Ext.MessageBox.alert('Conta', jsonResponse.message);
                }
            },
            failure: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.alert('Conta', jsonResponse.message);
            }
        });
    }

    // define funcao de carregar dados
    function loadData(page) {
        var params = formToBean(page ? page : -1);
        Ext.Ajax.request({
            headers: {
                'Content-Type': 'application/json'
            },
            url: Ext.String.format('{0}extras/list', tipo),
            params: Ext.JSON.encode(params),
            scope: this,
            success: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if (jsonResponse.success) {
                    extraStore.loadData(jsonResponse.data, false);
                    updateBar(jsonResponse.totalPages, jsonResponse.page);
                } else {
                    Ext.MessageBox.alert('Extras', jsonResponse.message);
                }
            },
            failure: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.alert('Extras', jsonResponse.message);
            }
        });
    }

    function formToBean(page) {
        var bean = {
            values: {
                'page': page
            }
        };
        var tabela = (tipo == 'despesas' ? 'pagamentoextra' : 'receitaextra');
        bean.values[tabela + '.nomeconta'] = formDespesa.down('combobox').getValue();
        bean.values[tabela + '.data'] = [formDespesa.down('datefield[name=dataIni]').getValue(), formDespesa.down('datefield[name=dataFim]').getValue()];
        return bean;
    }

    function clearForm() {
        var d = new Date();
        formDespesa.down('datefield[name=dataIni]').setValue(new Date(d.getFullYear(), d.getMonth(), 1));
        formDespesa.down('datefield[name=dataFim]').setValue(Ext.Date.subtract(d, Ext.Date.DAY, 1));
        formDespesa.down('combobox').clearValue();
    }

    function updateBar(totalPages, page) {
        total_Pages = totalPages;
        currentPage = page;
        grid.down('button[iconCls=primeiro_button]').setDisabled(page == 1);
        grid.down('button[iconCls=anterior_button]').setDisabled(page == 1);
        grid.down('button[iconCls=proximo_button]').setDisabled((page == totalPages) || (totalPages == 0));
        grid.down('button[iconCls=ultimo_button]').setDisabled((page == totalPages) || (totalPages == 0));
        grid.down('button[name=irButton]').setDisabled((totalPages == 0));
        grid.down('label').setText('Página: ' + page + '/' + totalPages);
    }

    // inicio
    clearForm();
    loadContaData();
    loadData();
});
