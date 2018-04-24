Ext.require(['Ext.form.*', 'Ext.form.*', 'Ext.tip.QuickTipManager']);
Ext.onReady(function () {

    // define o formulario
    var formTransferenciaFinanceira = Ext.create('Ext.form.Panel', {
        title: 'Consultar Transferências Financeiras',
        renderTo: 'consultaTransferenciaFinanceiraForm',
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
                submitFormat: 'd/m/Y',
                maxValue: Ext.Date.subtract(new Date(), Ext.Date.DAY, 1)
            }, {
                xtype: 'datefield',
                name: 'dataFim',
                emptyText: 'Data Final',
                fieldLabel: 'a',
                labelWidth: 20,
                labelSeparator: '',
                format: 'd/m/Y',
                submitFormat: 'd/m/Y',
                maxValue: Ext.Date.subtract(new Date(), Ext.Date.DAY, 1),
                labelPad: 10
            }]
        }, {
            xtype: 'radiogroup',
            name: 'tipoOperacao',
            fieldLabel: 'Operação',
            flex: 1,
            items: [{
                boxLabel: 'Entrada',
                name: 'tipoOperacaoItem',
                inputValue: '0',
                width: 198
            }, {
                boxLabel: 'Saída',
                name: 'tipoOperacaoItem',
                inputValue: '1',
                width: 198
            }],
            listeners: {
                change: onChangeTipoOperacao
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

    Ext.define('TransferenciaFinanceiraModel', {
        extend: 'Ext.data.Model',
        fields: ['codigo',
            {
                name: 'data',
                type: 'date',
                dateFormat: 'd/m/Y',
                allowBlank: false
            },
            'numero', 'data', 'operacao', 'unidadegestorarelacionada', 'obs', 'valor']
    });
    // create the Data Store
    var transferenciaFinanceiraStore = Ext.create('Ext.data.Store', {
        id: 'TransferenciaFinanceiraStore',
        model: 'TransferenciaFinanceiraModel',
        proxy: {
            type: 'rest',
            url: '${entidade.codigo}/transferenciaFinanceira/list',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    });
    var transferenciaFinanceiraGrid = Ext.create('Ext.grid.Panel', {
        height: 500,
        collapsible: true,
        title: 'Transferência Financeiras',
        store: transferenciaFinanceiraStore,
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
            text: 'Número',
            dataIndex: 'numero',
            width: 80,
            align: 'center'
        }, {
            text: 'Data',
            width: 80,
            dataIndex: 'data',
            align: 'center'
        }, {
            text: 'Operação',
            dataIndex: 'operacao',
            width: 100,
            type: 'date',
            align: 'center'
        }, {
            text: (getLastURLNode(document) == 0) ? 'De' : 'Para',
            dataIndex: 'unidadegestorarelacionada',
            flex: 1
        }, {
            text: 'Descrição',
            dataIndex: 'obs',
            flex: 1
        }, {
            text: 'Valor',
            dataIndex: 'valor',
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
        renderTo: 'TransferenciaFinanceiraGrid'
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
        params.values.format=format;
        var tipo = 'TF';
        var form = document.createElement('form');
        form.action = '/'+enduceEntidade(document)+'/'+tipo + '/dataExport';
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

    function loadData(page) {
        mask(transferenciaFinanceiraGrid, 'Aguarde, Consultando dados...');

        var params = formToBean(page ? page : -1);
        Ext.Ajax.request({
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'loaddata',
            params: Ext.JSON.encode(params),
            scope: this,
            success: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if (jsonResponse.success) {
                    renderTransferenciaFinanceiraGrid(jsonResponse.data);
                    updateBar(jsonResponse.totalPages, jsonResponse.page, transferenciaFinanceiraGrid);
                } else {
                    Ext.MessageBox.alert('TransferenciaFinanceira', jsonResponse.message);
                }
                unmask(transferenciaFinanceiraGrid);
                unmask(transferenciaFinanceiraGrid);
            },
            failure: function (response, opts) {
                unmask(transferenciaFinanceiraGrid);
                unmask(transferenciaFinanceiraGrid);
                var jsonResponse = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.alert('TransferenciaFinanceira', jsonResponse.message);
            }
        });
    }

    function renderTransferenciaFinanceiraGrid(data) {
        transferenciaFinanceiraStore.loadData(data, false);
    }

    function updateBar(totalPages, page, grid) {
        total_Pages = totalPages;
        currentPage = page;
        grid.down('button[iconCls=primeiro_button]').setDisabled(page == 1);
        grid.down('button[iconCls=anterior_button]').setDisabled(page == 1);
        grid.down('button[iconCls=proximo_button]').setDisabled((page == totalPages) || (totalPages == 0));
        grid.down('button[iconCls=ultimo_button]').setDisabled((page == totalPages) || (totalPages == 0));
        grid.down('button[name=irButton]').setDisabled((totalPages == 0));
        grid.down('label').setText('Página: ' + page + '/' + totalPages);
    }

    function formToBean(page) {
        var bean = {
            values: {
                'transferenciaFinanceira.data': [formTransferenciaFinanceira.down('datefield[name=dataIni]').getValue(), formTransferenciaFinanceira.down('datefield[name=dataFim]').getValue()],
                'transferenciafinanceira.tipoOperacao': formTransferenciaFinanceira.down('radiogroup').getValue().tipoOperacaoItem,
                'page': page ? page : 1
            }
        };
        return bean;
    }

    function clearForm() {
        var d = new Date();
        formTransferenciaFinanceira.down('datefield[name=dataIni]').setValue(new Date(d.getFullYear(), d.getMonth(), 1));
        formTransferenciaFinanceira.down('datefield[name=dataFim]').setValue(Ext.Date.subtract(d, Ext.Date.DAY, 1));
        formTransferenciaFinanceira.down('radiogroup').items.items[0].setValue(getLastURLNode(document) == 0);
        formTransferenciaFinanceira.down('radiogroup').items.items[1].setValue(getLastURLNode(document) == 1);
    }

    function onChangeTipoOperacao(radioGroup, newValue, oldValue, eOpts) {
        loadData();
    }

    // inicio
    clearForm();

    // loadData();


});