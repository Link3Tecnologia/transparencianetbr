Ext.onReady(function () {

    // define o formulario
    var credoresForm = Ext.create('Ext.form.Panel', {
        title: 'Consultar Credores',
        renderTo: 'consultaCredoresForm',
        layout: {
            type: 'vbox',
            padding: '5',
            align: 'stretch'
        },
        items: [{
            xtype: 'radiogroup',
            name: 'grupoCredores',
            layout: {
                type: 'hbox',
                padding: '5',
                pack: 'center',
                align: 'middle'
            },
            items: [{
                boxLabel: 'Pequenos Credores',
                name: 'grupoCredoresItem',
                inputValue: 'pequenosCredores',
                width: 200
            }, {
                boxLabel: 'Grandes Credores',
                name: 'grupoCredoresItem',
                inputValue: 'grandesCredores',
                width: 200
            }, {
                boxLabel: 'Cessão de Mão de Obra',
                name: 'grupoCredoresItem',
                inputValue: 'cessaoMaoObra',
                width: 200
            }],
            listeners: {
                change: onChangeGrupoCredores
            }
        }, {
            xtype: 'fieldcontainer',
            name: 'pesquisa',
            layout: {
                type: 'hbox',
                padding: '5',
                align: 'middle'
            },
            fieldDefaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'combobox',
                name: 'ano',
                store: Ext.create('Ext.data.Store', {
                    fields: ['ano']
                }),
                fieldLabel: 'Ano',
                queryMode: 'local',
                valueField: 'ano',
                displayField: 'ano',
                emptyText: 'Ano',
                editable: false,
                width: 200,
                labelWidth: 30
            }, {
                xtype: 'textfield',
                name: 'fornecedor',
                fieldLabel: 'Credor',
                emptyText: 'CNPJ / CPF / Nome',
                labelWidth: 60,
                flex: 1
            }, {
                xtype: 'combobox',
                name: 'fonteRecurso',
                store: Ext.create('Ext.data.Store', {
                    fields: ['fonterecurso', 'fonterecursonome', {
                        name: 'fullDescription',
                        type: 'string',
                        convert: function (newValue, model) {
                            return model.get('fonterecurso').toString() + ' - ' + model.get('fonterecursonome');
                        }
                    }]
                }),
                fieldLabel: 'Fonte de Recurso',
                queryMode: 'local',
                valueField: 'ano',
                displayField: 'fullDescription',
                emptyText: 'Fonte de Recurso',
                editable: false,
                labelWidth: 130,
                flex: 1
            }]
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
                    init();
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

    var bBar = ['->', '-', {
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
    }];

    var subGrids = new Ext.util.MixedCollection();
    var credoresGrid = Ext.create('Ext.grid.Panel', {
        renderTo: 'credores',
        title: 'Resultado da Consulta',
        store: Ext.create('Ext.data.Store', {
            fields: ['id', 'entidade_id', 'numero', 'liquidacao', 'fornecedor',
                {
                    name: 'data',
                    type: 'date',
                    dateFormat: 'd/m/Y'
                },
                {
                    name: 'vencimento',
                    type: 'date',
                    dateFormat: 'd/m/Y'
                },
                {
                    name: 'pagamento',
                    type: 'date',
                    dateFormat: 'd/m/Y'
                },
                'status', 'valor']
        }),
        viewConfig: {
            emptyText: '<h1 style="margin:20px">Nenhum resultado encontrado</h1>',
            stripeRows: true
        },
        columns: [{
            text: 'Número',
            dataIndex: 'numero',
            width: 80,
            align: 'center'
        }, {
            text: 'Liquidação',
            dataIndex: 'liquidacao',
            width: 80,
            align: 'center'
        }, {
            text: 'Credor',
            dataIndex: 'fornecedor',
            flex: 1
        }, {
            text: 'Data',
            dataIndex: 'data',
            width: 80,
            type: 'date',
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
            align: 'center'
        }, {
            text: 'Vencimento',
            dataIndex: 'vencimento',
            width: 80,
            type: 'date',
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
            align: 'center'
        }, {
            text: 'Pagamento',
            dataIndex: 'pagamento',
            width: 80,
            type: 'date',
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
            align: 'center'
        }, {
            text: 'Doc.',
            dataIndex: 'documento',
            width: 80,
            align: 'center'
        }, {
            text: 'Valor',
            dataIndex: 'valor',
            width: 100,
            align: 'right',
            renderer: rendererBrMoney
        }, {
            text: 'Situação',
            dataIndex: 'status',
            width: 150
        }],
        stripeRows: true,
        plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl: new Ext.XTemplate(
                '<div id="{id}"></div>'
            )
        }],
        collapsible: true,
        bbar: bBar
    });

    credoresGrid.view.on('expandbody', function (rowNode, record, expandRow, eOpts) { // OK
        if (!subGrids.getByKey('subGrid_' + record.data.id)) {
            var subGrid = Ext.create('Ext.grid.Panel', {
                store: Ext.create('Ext.data.Store', {
                    fields: ['item', 'justificativa', 'statuscode', 'status', {
                        name: 'data',
                        type: 'date',
                        dateFormat: 'd/m/Y'
                    }]
                }),
                columns: [
                    {text: 'Item', dataIndex: 'item'},
                    {text: 'Data', dataIndex: 'data', renderer: Ext.util.Format.dateRenderer('d/m/Y')},
                    {text: 'Justificativa', dataIndex: 'justificativa', flex: 1},
                    {text: 'Situação', dataIndex: 'status'}
                ],
                viewConfig: {
                    emptyText: '<h1 style="margin:20px">Nenhum resultado encontrado</h1>',
                    stripeRows: true
                },
                renderTo: record.data.id
            });
            subGrids.add('subGrid_' + record.data.id, subGrid);
            ajaxRequest({
                url: 'credores/details/' + record.data.id,
                json: true
            }, function (jsonResponse) {
                if (jsonResponse.data) {
                    subGrid.getStore().loadData(jsonResponse.data, false);
                }
            }, this);
        }
    });


    function init() {
        loadComboData(function () {
            credoresForm.down('radio[name=grupoCredoresItem]').setValue(true);
        });
    };

    function loadComboData(callback, scope) {
        var params = {
            values: {}
        };
        Ext.Ajax.request({
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'credores/combosdata',
            params: Ext.JSON.encode(params),
            scope: this,
            success: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if (jsonResponse.success) {

                    var anoStore = credoresForm.down('combobox[name=ano]').getStore();
                    anoStore.loadData(jsonResponse.anos, false);
                    credoresForm.down('combobox[name=ano]').setValue(anoStore.last().data.ano);

                    var fonteRecursoStore = credoresForm.down('combobox[name=fonteRecurso]').getStore();
                    fonteRecursoStore.loadData(jsonResponse.fonteRecursos, false);
                    credoresForm.down('combobox[name=fonteRecurso]').setValue(fonteRecursoStore.first().data.fonterecurso);
                    credoresForm.down('combobox[name=fonteRecurso]').setRawValue(fonteRecursoStore.first().data.fullDescription);

                } else {
                    Ext.MessageBox.alert('Combos', jsonResponse.message);
                }

                if (callback) {
                    callback.call(scope || this, jsonResponse, scope);
                }
            },
            failure: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if (callback) {
                    callback.call(scope || this, jsonResponse, scope);
                }
                Ext.MessageBox.alert('Combos', jsonResponse.message);

            }
        });
    }

    function formToBean(page) {
        var bean = {
            values: {
                'grupo': credoresForm.down('radiogroup[name=grupoCredores]').getValue().grupoCredoresItem,
                'fornecedor': credoresForm.down('textfield[name=fornecedor]').getValue(),
                'ano': credoresForm.down('textfield[name=ano]').getValue(),
                'page': (page) ? page : null,
                'fonterecurso': credoresForm.down('textfield[name=fonteRecurso]').getValue(),
                'rowsPerPage': 10
            }
        };
        return bean;
    }

    function onChangeGrupoCredores() {
        loadData();
    }

    function loadData(page) {

        mask(credoresForm, 'Aguarde, Consultando dados...');
        mask(credoresGrid, 'Aguarde, Consultando dados...');
        var grupo = credoresForm.down('radiogroup[name=grupoCredores]').getValue().grupoCredoresItem;
        var params = formToBean(page ? page : 1);
        Ext.Ajax.request({
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'credores/list',
            params: Ext.JSON.encode(params),
            scope: this,
            success: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);

                if (jsonResponse.success) {
                    credoresGrid.getStore().loadData(jsonResponse.data, false);
                    updateBar(jsonResponse.totalPages, jsonResponse.page, credoresGrid);
                } else {
                    // Ext.MessageBox.alert('Entidades', jsonResponse.message);
                }
                unmask(credoresForm);
                unmask(credoresGrid);

            },
            failure: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);

                unmask(credoresForm);
                unmask(credoresGrid);

                if (response.responseText) {
                    var jsonResponse = Ext.JSON.decode(response.responseText);
                }
            }
        });
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

    // inicio
    init();

});