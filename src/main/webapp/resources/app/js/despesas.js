Ext.require(['Ext.form.*', 'Ext.form.*', 'Ext.tip.QuickTipManager']);
Ext.onReady(function () {
    // define Unidade Gestora Model
    Ext.define('UnidGestoraModel', {
        extend: 'Ext.data.Model',
        fields: ['codigo', 'nome']
    });
    // define Unidade Gestora Store
    var unidGestoraStore = Ext.create('Ext.data.Store', {
        id: 'UnidGestoraStore',
        model: 'UnidGestoraModel',
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
        title: 'Consultar Despesas',
        renderTo: 'consultaDespesasForm',
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
                boxLabel: 'Grupo de Despesas',
                name: 'modalidadeItem',
                inputValue: 'codificacao',
                width: 198
            }, {
                boxLabel: 'Despesa Analítica',
                name: 'modalidadeItem',
                inputValue: 'despesa',
                width: 198
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
            xtype: 'radiogroup',
            name: 'faseDespesa',
            fieldLabel: 'Fase da Despesa',
            items: [{
                boxLabel: 'Empenho',
                name: 'faseDespesaItem',
                inputValue: 'empenho',
                width: 100
            }, {
                boxLabel: 'Liquidação',
                name: 'faseDespesaItem',
                inputValue: 'liquidacao',
                width: 100
            }, {
                boxLabel: 'Pagamento',
                name: 'faseDespesaItem',
                inputValue: 'pagamento',
                width: 100
            }]
        }, {
            xtype: 'fieldcontainer',
            name: 'elemento',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'textfield',
                name: 'classeconomica',
                fieldLabel: 'Elemento',
                emptyText: 'Elemento da Despesa'
            }, {
                xtype: 'label',
                text: 'Apenas números e sem pontos',
                margin: '5 0 0 20'
            }],
            visible: false
        }, {
            xtype: 'fieldcontainer',
            name: 'favorecido',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'textfield',
                name: 'favorecido',
                fieldLabel: 'Favorecido',
                emptyText: 'CNPJ ou CPF'
            }, {
                xtype: 'label',
                text: 'CNPJ ou CPF do Fornecedor',
                margin: '5 0 0 20'
            }],
            visible: false
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

    // create despesaGrid
    var despesaGrid = Ext.create('Ext.grid.Panel', {
        height: 500,
        collapsible: true,
        title: 'Resultado da Consulta',
        store: Ext.create('Ext.data.Store', {
            fields: ['entidade_id',
                {
                    name: 'data',
                    type: 'date',
                    dateFormat: 'd/m/Y',
                    allowBlank: false
                },
                'fase', 'numero', 'especie', 'unidgestoranome', 'unidorcamentarianome', 'classeconomica', 'classeconomicanome', 'fornecedornome', 'valor']
        }),
        loadMask: true,
        selModel: {
            pruneRemoved: false
        },
        multiSelect: false,
        viewConfig: {
            trackOver: false,
            emptyText: '<h1 style="margin:20px">Nenhum resultado encontrado</h1>'
        },
        // despesaGrid columns
        columns: [{
            text: 'Data',
            dataIndex: 'data',
            width: 80,
            type: 'date',
            renderer: Ext.util.Format.dateRenderer('d/m/Y'),
            align: 'center',
            allowBlank: false
        }, {
            text: 'Fase',
            dataIndex: 'fase',
            width: 80,
            align: 'center',
            name: 'faseColumn'
        }, {
            text: 'Documento',
            dataIndex: 'numero',
            width: 90,
            align: 'center',
            renderer: renderDocumento
        }, {
            text: 'Espécie',
            dataIndex: 'especie',
            width: 80,
            align: 'center'
        }, {
            text: 'Unid. Gestora',
            dataIndex: 'unidgestoranome',
            width: 150,
            align: 'center'
        }, {
            text: 'Unid. Orçamentária',
            dataIndex: 'unidorcamentarianome',
            width: 150,
            align: 'center'
        }, {
            text: 'Elemento',
            dataIndex: 'classeconomica',
            align: 'center',
            width: 100
        }, {
            text: 'Favorecido',
            dataIndex: 'fornecedornome',
            align: 'center',
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
        renderTo: 'despesaGrid'
    });

    var despesaCodificacaoGrid = Ext.create('Ext.grid.Panel', {
        title: 'Despesas por Grupos',
        id: 'gridCodificacao',
        store: Ext.create('Ext.data.Store', {
            fields: ['grupo', 'gruponome', 'classeconomica', 'classeconomicanome', 'valor']
        }),
        columns: [{
            text: 'Grupo',
            dataIndex: 'grupo',
            width: 80,
            align: 'center'
        }, {
            text: 'Descrição do Grupo',
            flex: 1,
            dataIndex: 'gruponome'
        }, {
            text: 'Elemento',
            dataIndex: 'classeconomica',
            width: 80,
            align: 'center'
        }, {
            text: 'Descrição do Elemento',
            dataIndex: 'classeconomicanome',
            flex: 1
        }, {
            text: 'Total',
            dataIndex: 'valor',
            align: 'right',
            renderer: rendererBrMoney
        }], bbar: ['->', '-', {
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
        renderTo: 'despesaGrid'
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
        var tipo = params.values.fase.toUpperCase();
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

    function renderDocumento(value, p, record) {
        var fase = formDespesa.down('radiogroup[name=faseDespesa]').getValue().faseDespesaItem;
        if (fase == 'empenho' && record.data.especie != 'Original') {
            fase = 'alteracao';
        }
        return Ext.String.format('<a href="{0}/{1}/{2}">{3}</a>', getURLBaseApp(document, record.data.entidade_id), fase, record.data.id, value);
    }

    // define funcao de carregar dados
    function loadData(page) {
        mask(despesaGrid, 'Aguarde, Consultando dados...');
        mask(despesaCodificacaoGrid, 'Aguarde, Consultando dados...');
        despesaGrid.columns[3].setVisible(formDespesa.down('radiogroup[name=faseDespesa]').getValue().faseDespesaItem == 'empenho');
        var modalidade = formDespesa.down('radiogroup[name=modalidade]').getValue().modalidadeItem;
        var params = formToBean(page ? page : -1);
        Ext.Ajax.request({
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'despesas/list',
            params: Ext.JSON.encode(params),
            scope: this,
            success: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if (jsonResponse.success) {

                    if (modalidade == 'codificacao') {
                        renderDespesaCodificacaoGrid(jsonResponse.data);
                        updateBar(jsonResponse.totalPages, jsonResponse.page, despesaCodificacaoGrid);
                    } else {
                        renderDespesaGrid(jsonResponse.data);
                        updateBar(jsonResponse.totalPages, jsonResponse.page, despesaGrid);
                    }

                } else {
                    // Ext.MessageBox.alert('Entidades', jsonResponse.message);
                }
                unmask(despesaGrid);
                unmask(despesaCodificacaoGrid);

            },
            failure: function (response, opts) {
                unmask(despesaGrid);
                unmask(despesaCodificacaoGrid);

                if (response.responseText) {
                    var jsonResponse = Ext.JSON.decode(response.responseText);
                    // Ext.MessageBox.alert('Entidades', jsonResponse.message);
                }
            }
        });
    }

    function renderDespesaCodificacaoGrid(data) {
        despesaCodificacaoGrid.getStore().loadData(data, false);
        despesaCodificacaoGrid.setVisible(true);
        despesaGrid.setVisible(false);
    }

    function renderDespesaGrid(data) {
        try {
            despesaGrid.getStore().loadData(data, false);
            despesaGrid.setVisible(true);
            despesaCodificacaoGrid.setVisible(false);
        } catch (e) {
            console.log(e);
        }
    }


    function loadUnidGestoraData() {
        var params = {
            values: {}
        };
        Ext.Ajax.request({
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'unidgestora/list',
            params: Ext.JSON.encode(params),
            scope: this,
            success: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if (jsonResponse.success) {
                    unidGestoraStore.loadData(jsonResponse.data, false);
                } else {
                    Ext.MessageBox.alert('UnidGestora', jsonResponse.message);
                }
            },
            failure: function (response, opts) {
                if (response.responseText) {
                    var jsonResponse = Ext.JSON.decode(response.responseText);
                    // Ext.MessageBox.alert('Entidades', jsonResponse.message);
                }
            }
        });
    }

    function formToBean(page) {
        var faseData = formDespesa.down('radiogroup[name=faseDespesa]').getValue().faseDespesaItem + '.data';
        var bean = {
            values: {
                'fase': formDespesa.down('radiogroup[name=faseDespesa]').getValue().faseDespesaItem,
                // 'unidgestora.codigo': formDespesa.down('combobox').getValue(),
                'fornecedor.cnpjcpf': formDespesa.down('textfield[name=favorecido]').getValue(),
                'dotacao.classeconomica': formDespesa.down('textfield[name=classeconomica]').getValue(),
                'page': (page) ? page : null,
                'modalidade': formDespesa.down('radiogroup[name=modalidade]').getValue().modalidadeItem
            }
        };
        bean.values[faseData] = [formDespesa.down('datefield[name=dataIni]').getValue(), formDespesa.down('datefield[name=dataFim]').getValue()]
        return bean;
    }

    function clearForm() {
        var d = new Date();
        formDespesa.down('datefield[name=dataIni]').setValue(new Date(d.getFullYear(), d.getMonth(), 1));
        formDespesa.down('datefield[name=dataFim]').setValue(d);
        formDespesa.down('radio[boxLabel=Empenho]').setValue(true);
        formDespesa.down('radio[boxLabel=Grupo de Despesas]').setValue(true);
        // formDespesa.down('combobox').clearValue();
        formDespesa.down('textfield[name=favorecido]').reset();
        formDespesa.down('textfield[name=classeconomica]').reset();
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

    function onChangeModalidade(radioGroup, newValue, oldValue, eOpts) {
        formDespesa.down('fieldcontainer[name=elemento]').setVisible(newValue.modalidadeItem == 'despesa')
        formDespesa.down('fieldcontainer[name=favorecido]').setVisible(newValue.modalidadeItem == 'despesa')
        loadData();
    }

    // inicio
    clearForm();
});
