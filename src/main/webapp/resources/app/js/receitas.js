Ext.require(['Ext.form.*', 'Ext.form.*', 'Ext.tip.QuickTipManager']);
Ext.onReady(function () {
    // define Exercicio Model
    var exercicioModel = Ext.define('ExercicioModel', {
        extend: 'Ext.data.Model',
        fields: ['ano']
    });
    // define Exercicio Store
    var exercicioStore = Ext.create('Ext.data.Store', {
        id: 'ExercicioStore',
        model: 'ExercicioModel',
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
    var formReceita = Ext.create('Ext.form.Panel', {
        title: 'Consultar Receitas',
        renderTo: 'consultaReceitaForm',
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
            xtype: 'radiogroup',
            name: 'modalidade',
            fieldLabel: 'Modalidade',
            flex: 1,
            items: [{
                boxLabel: 'Codificação da Natureza',
                name: 'modalidadeItem',
                inputValue: 'codificacao',
                width: 198,
                checked: true,
            }, {
                boxLabel: 'Receita Analítica',
                name: 'modalidadeItem',
                inputValue: 'receita',
                width: 198,
                checked: false
            }],
            listeners: {
                change: onChangeModalidade
            }
        }, {
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
                maxValue: new Date()
            }, {
                xtype: 'datefield',
                name: 'dataFim',
                emptyText: 'Data Final',
                fieldLabel: 'a',
                labelWidth: 20,
                labelSeparator: '',
                format: 'd/m/Y',
                submitFormat: 'd/m/Y',
                maxValue: new Date(),
                labelPad: 10
            }, {
                xtype: 'label',
                text: 'Altere a data e clique em consultar para ver outro período!',
                margin: '5 0 5 10',
                style: {color: '#157fcc'}
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'textfield',
                name: 'classeconomica',
                fieldLabel: 'Classificação',
                emptyText: 'Classificação'
            }, {
                xtype: 'label',
                text: 'Apenas números e sem pontos',
                margin: '5 0 0 20'
            }]
        }
        ],
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

    Ext.define('ReceitaCodificacaoModel', {
        extend: 'Ext.data.Model',
        fields: ['codigo', 'mes', 'nome', 'obs', 'total', 'gr', 'previsao']
    });
    var receitaCodificacaoStore = Ext.create('Ext.data.Store', {
        id: 'ReceitaCodificacaoStore',
        model: 'ReceitaCodificacaoModel',
        autoLoad: false,
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    });

    Ext.define('ReceitaModel', {
        extend: 'Ext.data.Model',
        fields: ['codigo',
            {
                name: 'data',
                type: 'date',
                dateFormat: 'd/m/Y',
                allowBlank: false
            },
            'nome', 'obs', 'total', 'gr', 'previsao']
    });
    // create the Data Store
    var receitaStore = Ext.create('Ext.data.Store', {
        id: 'ReceitaStore',
        model: 'ReceitaModel',
        proxy: {
            type: 'rest',
            url: '${entidade.codigo}/receita/list',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    });
    var receitaCodificacaoGrid = Ext.create('Ext.grid.Panel', {
        height: 500,
        collapsible: true,
        title: 'Receitas por Codificação da Natureza',
        store: receitaCodificacaoStore,
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
            text: 'Código',
            dataIndex: 'codigo',
            width: 150,
            align: 'center'
        }, {
            text: 'Previsão',
            width: 120,
            dataIndex: 'previsao',
            align: 'right',
            renderer: rendererBrMoney
        }, {
            text: 'Mês',
            dataIndex: 'mes',
            width: 80,
            type: 'date',
            align: 'center',
            allowBlank: false
        }, {
            text: 'Descrição',
            dataIndex: 'nome',
            flex: 1
        }, {
            text: 'Total',
            dataIndex: 'total',
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
        renderTo: 'ReceitaGrid'
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
        var tipo = 'RECEITA';
        var form = document.createElement('form');
        form.action = tipo + '/dataExport';
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

    var receitaGrid = Ext.create('Ext.grid.Panel', {
        height: 500,
        collapsible: true,
        title: 'Receitas por Arrecadação',
        store: receitaStore,
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
            text: 'Código',
            dataIndex: 'codigo',
            width: 150,
            align: 'center'
        }, {
            text: 'Previsão',
            width: 120,
            dataIndex: 'previsao',
            align: 'right',
            renderer: rendererBrMoney
        }, {
            text: 'Data',
            dataIndex: 'data',
            width: 80,
            type: 'date',
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
            align: 'center',
            allowBlank: false
        }, {
            text: 'GR',
            dataIndex: 'gr',
            width: 80,
            align: 'center'
        }, {
            text: 'Descrição',
            dataIndex: 'nome',
            flex: 1
        }, {
            text: 'Obs',
            dataIndex: 'obs',
            width: 250
        }, {
            text: 'Total',
            dataIndex: 'total',
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
        renderTo: 'ReceitaGrid'

    });

    function loadExercicioData(callback, scope) {
        var params = {
            values: {}
        };
        Ext.Ajax.request({
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'receita/exerciciolist',
            params: Ext.JSON.encode(params),
            scope: this,
            success: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if (jsonResponse.success) {
                    exercicioStore.loadData(jsonResponse.data, false);
                    // formReceita.down('combobox').setValue(exercicioStore.last().data.ano);
                } else {
                    Ext.MessageBox.alert('Exercicio', jsonResponse.message);
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
                Ext.MessageBox.alert('Exercicio', jsonResponse.message);

            }
        });
    }

    function loadData(page) {
        mask(receitaGrid, 'Aguarde, Consultando dados...');
        mask(receitaCodificacaoGrid, 'Aguarde, Consultando dados...');
        var modalidade = formReceita.down('radiogroup').getValue().modalidadeItem;
        var params = formToBean(page ? page : -1);
        Ext.Ajax.request({
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'receita/loaddata',
            params: Ext.JSON.encode(params),
            scope: this,
            success: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if (jsonResponse.success) {
                    if (modalidade == 'codificacao') {
                        renderReceitaCodificacaoGrid(jsonResponse.data);
                        updateBar(jsonResponse.totalPages, jsonResponse.page, receitaCodificacaoGrid);
                    } else {
                        renderReceitaGrid(jsonResponse.data);
                        updateBar(jsonResponse.totalPages, jsonResponse.page, receitaGrid);
                    }
                } else {
                    Ext.MessageBox.alert('Receita', jsonResponse.message);
                }
                unmask(receitaGrid);
                unmask(receitaCodificacaoGrid);
            },
            failure: function (response, opts) {
                unmask(receitaGrid);
                unmask(receitaCodificacaoGrid);
                var jsonResponse = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.alert('Receita', jsonResponse.message);
            }
        });
    }

    function renderReceitaCodificacaoGrid(data) {
        receitaCodificacaoStore.loadData(data, false);
        receitaCodificacaoGrid.setVisible(true);
        receitaGrid.setVisible(false);
    }

    function renderReceitaGrid(data) {
        receitaStore.loadData(data, false);
        receitaGrid.setVisible(true);
        receitaCodificacaoGrid.setVisible(false);
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
                'receita.data': [formReceita.down('datefield[name=dataIni]').getValue(), formReceita.down('datefield[name=dataFim]').getValue()],
                'receita.codigo': formReceita.down('textfield[name=classeconomica]').getValue(),
                'modalidade': formReceita.down('radiogroup').getValue().modalidadeItem,
                'page': page ? page : 1
            }
        };
        return bean;
    }

    function clearForm() {
        var d = new Date();
        formReceita.down('datefield[name=dataIni]').setValue(new Date(d.getFullYear(), d.getMonth(), 1));
        formReceita.down('datefield[name=dataFim]').setValue(d);
        formReceita.down('textfield[name=classeconomica]').reset();
    }

    function onChangeModalidade(radioGroup, newValue, oldValue, eOpts) {
        formReceita.down('textfield[name=classeconomica]').reset();
        loadData();
    }

    receitaGrid.setVisible(false);

    // inicio
    clearForm();
    loadExercicioData(function () {
        loadData();
    });


});