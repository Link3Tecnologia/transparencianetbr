Ext.require(['Ext.form.*', 'Ext.form.*', 'Ext.tip.QuickTipManager']);
Ext.onReady(function () {
    console.log('empenho.js');
    var dadosBasicoPanel = Ext.create('Ext.panel.Panel', {
        title: 'Dados Básicos',
        renderTo: 'dadosBasicoPanel',
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 320,
            msgTarget: 'side'
        },
        items: [{
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'label',
                text: 'Fase:',
                margin: '5 0 0 20',
                width: 200,
                style: 'text-align:right; font-weight:bold;'
            }, {
                xtype: 'label',
                name: 'faseLabel',
                margin: '5 0 0 20',
                width: 200
            }, {
                xtype: 'label',
                name: 'documentoOriginalLabelTile',
                text: 'Documento Original:',
                margin: '5 0 0 20',
                width: 200,
                style: 'text-align:right; font-weight:bold;'
            }, {
                xtype: 'label',
                name: 'documentoOriginalLabel',
                margin: '5 0 0 20',
                width: 200
            }]
        }, {
            xtype: 'fieldcontainer',
            style: 'background-color:#F0F0F0;',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'label',
                text: 'Documento:',
                margin: '5 0 0 20',
                width: 200,
                style: 'text-align:right; font-weight:bold;'
            }, {
                xtype: 'label',
                name: 'documentoLabel',
                margin: '5 0 0 20',
                width: 200
            }, {
                xtype: 'label',
                text: 'Tipo de Documento:',
                margin: '5 0 0 20',
                width: 200,
                style: 'text-align:right; font-weight:bold;'
            }, {
                xtype: 'label',
                name: 'tipoDocumentoLabel',
                margin: '5 0 0 20',
                width: 200
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'label',
                text: 'Data:',
                margin: '5 0 0 20',
                width: 200,
                style: 'text-align:right; font-weight:bold;'
            }, {
                xtype: 'label',
                name: 'dataLabel',
                margin: '5 0 0 20',
                width: 200
            }]
        }, {
            xtype: 'fieldcontainer',
            style: 'background-color:#F0F0F0;',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'label',
                text: 'Tipo de Empenho:',
                margin: '5 0 0 20',
                width: 200,
                style: 'text-align:right; font-weight:bold;'
            }, {
                xtype: 'label',
                name: 'tipoEmpenhoLabel',
                margin: '5 0 0 20',
                width: 200
            }, {
                xtype: 'label',
                text: 'Espécie de Empenho:',
                margin: '5 0 0 20',
                width: 200,
                style: 'text-align:right; font-weight:bold;'
            }, {
                xtype: 'label',
                name: 'especieEmpenhoLabel',
                margin: '5 0 0 20',
                width: 200
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'label',
                text: 'Unidade Gestora:',
                margin: '5 0 0 20',
                width: 200,
                style: 'text-align:right; font-weight:bold;'
            }, {
                xtype: 'label',
                name: 'unidadeGestoraLabel',
                margin: '5 0 0 20',
                flex: 1
            }]
        }, {
            xtype: 'fieldcontainer',
            style: 'background-color:#F0F0F0;',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'label',
                text: 'Favorecido:',
                margin: '5 0 0 20',
                width: 200,
                style: 'text-align:right; font-weight:bold;'
            }, {
                xtype: 'label',
                name: 'favorecidoLabel',
                margin: '5 0 0 20',
                flex: 1
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'label',
                text: 'Valor:',
                margin: '5 0 0 20',
                width: 200,
                style: 'text-align:right; font-weight:bold;'
            }, {
                xtype: 'label',
                name: 'valorLabel',
                margin: '5 0 0 20',
                flex: 1
            }]
        }]
    });
    var dadosDetalhadosPanel = Ext.create('Ext.tab.Panel', {
        renderTo: 'dadosDetalhadosPanel',
        // height:
        items: [{
            name: 'detalhesTab',
            title: 'Dados Detalhados',
            layout: {
                type: 'vbox',
                align: 'stretch',
                pack: 'start'
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 320,
                msgTarget: 'side'
            },
            items: [{
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'label',
                    text: 'Observação do Documento:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'obsLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                style: 'background-color:#F0F0F0;',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'label',
                    text: 'Tipo de Crédito:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'tipoCreditoLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'label',
                    text: 'Fonte de Recurso:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'fonteRecursoLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                style: 'background-color:#F0F0F0;',
                items: [{
                    xtype: 'label',
                    text: 'Unidade Orçamentárica:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'unidOrcamentariaLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'label',
                    text: 'Ação:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'acaoLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                style: 'background-color:#F0F0F0;',
                items: [{
                    xtype: 'label',
                    text: 'Função:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'funcaoLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'label',
                    text: 'Subfunção:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'subFuncaoLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                style: 'background-color:#F0F0F0;',
                items: [{
                    xtype: 'label',
                    text: 'Programa:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'programaLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'label',
                    text: 'Categoria de Despesa:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'categoriaDespesaLabel',
                    margin: '5 0 0 20',
                    width: 200
                }, {
                    xtype: 'label',
                    text: 'Grupo de Despesa:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'grupoDespesaLabel',
                    margin: '5 0 0 20',
                    width: 200
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                style: 'background-color:#F0F0F0;',
                items: [{
                    xtype: 'label',
                    text: 'Modalidade de Aplicação:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'modalidadeAplicacaoLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'label',
                    text: 'Elemento de Despesa:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'elementoDespesaLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'label',
                    text: 'Subelemento:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'subelementoLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]

            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                style: 'background-color:#F0F0F0;',
                items: [{
                    xtype: 'label',
                    text: 'Dados da Licitação:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'dadosdalicitacaoLabel',
                    margin: '5 0 0 20',
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'label',
                    text: ' Licitação:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'licitacaoLabel',
                    margin: '5 0 0 20',
                    width: 200
                }, {
                    xtype: 'label',
                    text: ' Ano Licitação :',
                    margin: '5 0 0 20',
                    width: 400,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'anolicitacaoLabel',
                    margin: '5 0 0 20',
                    width: 400

                }]

            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'label',
                    text: 'Dispensa Licitação:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'dispensalicitacaoLabel',
                    margin: '5 0 0 20',
                    width: 200
                }, {
                    xtype: 'label',
                    text: 'Dis.Lic Ano:',
                    margin: '5 0 0 20',
                    width: 400,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'disp.licanoLabel',
                    margin: '5 0 0 20',
                    width: 400

                }]

            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                style: 'background-color:#F0F0F0;',
                items: [{
                    xtype: 'label',
                    text: 'Contrato:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'contratoLabel',
                    margin: '5 0 0 20',
                    width: 200
                }, {
                    xtype: 'label',
                    text: 'Ano Contrato:',
                    margin: '5 0 0 20',
                    width: 400,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'anocontratoLabel',
                    margin: '5 0 0 20',
                    width: 400
                }]

            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'label',
                    text: 'Convenio:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'convenioLabel',
                    margin: '5 0 0 20',
                    width: 200
                }, {
                    xtype: 'label',
                    text: 'Ano Convenio :',
                    margin: '5 0 0 20',
                    width: 400,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'anoconvenioLabel',
                    margin: '5 0 0 20',
                    width: 400
                }]

            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                style: 'background-color:#F0F0F0;',
                items: [{
                    xtype: 'label',
                    text: 'Obra:',
                    margin: '5 0 0 20',
                    width: 200,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'obraLabel',
                    margin: '5 0 0 20',
                    width: 200
                }, {
                    xtype: 'label',
                    text: 'Ano Obra:',
                    margin: '5 0 0 20',
                    width: 400,
                    style: 'text-align:right; font-weight:bold;'
                }, {
                    xtype: 'label',
                    name: 'anoobraLabel',
                    margin: '5 0 0 20',
                    width: 400
                }]


            }]

        }, {
            title: 'Itens do Empenho',
            name: 'ItensTab',
            xtype: 'gridpanel',
            store: Ext.create('Ext.data.Store', {
                fields: ['item', 'nome', 'qtd', 'unidade', 'valorunitario', 'valortotal']
            }),
            columns: [
                {text: 'Item', dataIndex: 'item', width: 60, align: 'center'},
                {text: 'Nome', dataIndex: 'nome', flex: 1},
                {text: 'Qtd', dataIndex: 'qtd', align: 'right'},
                {text: 'Unitário', dataIndex: 'valorunitario', align: 'right'},
                {text: 'Total', dataIndex: 'valortotal', renderer: rendererBrMoney, align: 'right'}
            ],
            viewConfig: {
                trackOver: false,
                emptyText: '<h1 style="margin:20px">Nenhum resultado encontrado</h1>'
            }

        }]
    });

    // despesa model
    Ext.define('DespesaModel', {
        extend: 'Ext.data.Model',
        fields: ['entidade_id',
            {
                name: 'data',
                type: 'date',
                dateFormat: 'd/m/Y',
                allowBlank: false
            },
            'fase', 'numero', 'valor', 'obs']
    });
    // create the Data Store
    var despesaStore = Ext.create('Ext.data.Store', {
        model: 'DespesaModel'
    });
    // create grid
    var liquidacoesGrid = Ext.create('Ext.grid.Panel', {
        height: 250,
        collapsible: true,
        title: 'Documentos Relacionados',
        store: despesaStore,
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
                    loadLiquidacoes(irPage);
                }
            }
        }, '-', {
            text: 'Primeiro',
            iconCls: 'primeiro_button',
            tooltip: 'Primeiro Lançamento',
            handler: function () {
                loadLiquidacoes(1);
            }
        }, {
            text: 'Anterior',
            iconCls: 'anterior_button',
            tooltip: 'Anterior Lançamento',
            handler: function () {
                loadLiquidacoes(currentPage - 1);
            }
        }, {
            text: 'Próximo',
            iconCls: 'proximo_button',
            tooltip: 'Proximo Lançamento',
            handler: function () {
                loadLiquidacoes(currentPage + 1);
            }
        }, {
            text: 'Último',
            iconCls: 'ultimo_button',
            tooltip: 'Ultimo Lançamento',
            handler: function () {
                loadLiquidacoes(total_Pages);
            }
        }],
        renderTo: 'liquidacoesGrid'
    });

    function renderDocumento(value, p, record) {
        return Ext.String.format('<a href="{0}/liquidacao/{1}">{2}</a>', getURLBaseApp(document, record.data.entidade_id), record.data.id, value);
    }

    function loadEmpenho() {
        var empenho = getLastURLNode(document);
        Ext.Ajax.request({
            headers: {
                'Content-Type': 'application/json'
            },
            url: Ext.String.format('{0}/{1}detalhe/{2}', getURLBaseApp(document), (especie == 'Original') ? 'empenho' : 'alteracao', empenho),
            scope: this,
            success: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                if (jsonResponse.success) {
                    updatePanels(jsonResponse.data);
                    loadItens(jsonResponse.data.id);
                } else {
                    Ext.MessageBox.alert('Empenho', jsonResponse.message);
                }
            },
            failure: function (response, opts) {
                var jsonResponse = Ext.JSON.decode(response.responseText);
                Ext.MessageBox.alert('Empenho', jsonResponse.message);
            }
        });
    }

    function updatePanels(data) {
        // basico
        dadosBasicoPanel.down('label[name=faseLabel]').setText(data.fase);
        dadosBasicoPanel.down('label[name=documentoOriginalLabelTile]').setVisible((especie != 'Original'));
        dadosBasicoPanel.down('label[name=documentoOriginalLabel]').setVisible((especie != 'Original'));
        dadosBasicoPanel.down('label[name=documentoOriginalLabel]').update(
            Ext.String.format('<a href="{0}/empenho/{1}">{2}</a>', getURLBaseApp(document, data.entidade_id), data.empenho_id, data.empenho));
        dadosBasicoPanel.down('label[name=documentoLabel]').setText(data.numero);
        dadosBasicoPanel.down('label[name=tipoDocumentoLabel]').setText('Nota de Empenho (NE)');
        dadosBasicoPanel.down('label[name=dataLabel]').setText(data.data);
        dadosBasicoPanel.down('label[name=tipoEmpenhoLabel]').setText(data.tipoempenho);
        dadosBasicoPanel.down('label[name=especieEmpenhoLabel]').setText(data.especie);
        dadosBasicoPanel.down('label[name=unidadeGestoraLabel]').setText(data.unidgestora + ' - ' + data.unidorcamentarianome);
        dadosBasicoPanel.down('label[name=favorecidoLabel]').setText(data.cnpjcpf + ' - ' + data.fornecedornome);
        dadosBasicoPanel.down('label[name=valorLabel]').setText('' + Ext.util.Format.brMoney(data.valor));

        // detalhes
        dadosDetalhadosPanel.down('label[name=obsLabel]').setText(data.obs);
        dadosDetalhadosPanel.down('label[name=tipoCreditoLabel]').setText(data.tipocredito);
        dadosDetalhadosPanel.down('label[name=fonteRecursoLabel]').setText(data.fonterecurso + ' - ' + data.fonterecursonome);
        dadosDetalhadosPanel.down('label[name=unidOrcamentariaLabel]').setText(data.unidorcamentaria + ' - ' + data.unidorcamentarianome);
        dadosDetalhadosPanel.down('label[name=acaoLabel]').setText(data.acao + ' - ' + data.acaonome);
        dadosDetalhadosPanel.down('label[name=funcaoLabel]').setText(data.funcao);
        dadosDetalhadosPanel.down('label[name=subFuncaoLabel]').setText(data.subfuncao);
        dadosDetalhadosPanel.down('label[name=programaLabel]').setText(data.programa);
        dadosDetalhadosPanel.down('label[name=categoriaDespesaLabel]').setText(data.categoriaeconomica);
        dadosDetalhadosPanel.down('label[name=grupoDespesaLabel]').setText(data.grupodespesa);
        dadosDetalhadosPanel.down('label[name=modalidadeAplicacaoLabel]').setText(data.modalidadeaplicacao);
        dadosDetalhadosPanel.down('label[name=elementoDespesaLabel]').setText(data.elementodespesa);
        dadosDetalhadosPanel.down('label[name=subelementoLabel]').setText(data.subelemento);
        dadosDetalhadosPanel.down('label[name=dadosdalicitacaoLabel]').setText(data.tipolicitacao_nome);
        dadosDetalhadosPanel.down('label[name=licitacaoLabel]').setText(data.licitacao);
        dadosDetalhadosPanel.down('label[name=anolicitacaoLabel]').setText(data.licitacaoano);
        dadosDetalhadosPanel.down('label[name=dispensalicitacaoLabel]').setText(data.dispensalicitacao);
        dadosDetalhadosPanel.down('label[name=disp.licanoLabel]').setText(data.dispensalicitacao_ano);
        dadosDetalhadosPanel.down('label[name=contratoLabel]').setText(data.contrato);
        dadosDetalhadosPanel.down('label[name=anocontratoLabel]').setText(data.contratoano);
        dadosDetalhadosPanel.down('label[name=convenioLabel]').setText(data.convenio);
        dadosDetalhadosPanel.down('label[name=anoconvenioLabel]').setText(data.convenioano);
        dadosDetalhadosPanel.down('label[name=obraLabel]').setText(data.obra);
        dadosDetalhadosPanel.down('label[name=anoobraLabel]').setText(data.obraano);

        dadosDetalhadosPanel.down('component[name=ItensTab]').setHeight(dadosDetalhadosPanel.down('component[name=detalhesTab]').getHeight());
    }

    function loadItens(id) {
        Ext.Ajax.request({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: Ext.String.format('{0}/despesas/empenhoitens/{1}', getURLBaseApp(document), id),
                scope: this,
                success: function (response, opts) {
                    var jsonResponse = Ext.JSON.decode(response.responseText);
                    if (jsonResponse.success) {

                        var itensGrid = dadosDetalhadosPanel.down('component[name=ItensTab]');
                        itensGrid.getStore().loadData(jsonResponse.data, false);


                    }
                }
            }
        );
    }

    // define funcao de carregar dados
    function loadLiquidacoes(page) {
        var lparams = {
            values: {
                'fase': 'liquidacao',
                'empenho.id': empenhoId, // getLastURLNode(document),
                'page': page ? page : 1
            }
        };
        Ext.Ajax.request({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: Ext.String.format('{0}/despesas/list', getURLBaseApp(document)),
                params: Ext.JSON.encode(lparams),
                scope: this,
                success: function (response, opts) {
                    var jsonResponse = Ext.JSON.decode(response.responseText);
                    if (jsonResponse.success) {
                        despesaStore.loadData(jsonResponse.data, false);
                        updateBar(jsonResponse.totalPages, jsonResponse.page);
                    } else {
                        // Ext.MessageBox.alert('Entidades', jsonResponse.message);
                    }
                },
                failure: function (response, opts) {
                    if (response.responseText) {
                        var jsonResponse = Ext.JSON.decode(response.responseText);
                        // Ext.MessageBox.alert('Entidades', jsonResponse.message);
                    }
                }
            }
        );
    }

    function updateBar(totalPages, page) {
        total_Pages = totalPages;
        currentPage = page;
        liquidacoesGrid.down('button[iconCls=primeiro_button]').setDisabled(page == 1);
        liquidacoesGrid.down('button[iconCls=anterior_button]').setDisabled(page == 1);
        liquidacoesGrid.down('button[iconCls=proximo_button]').setDisabled((page == totalPages) || (totalPages == 0));
        liquidacoesGrid.down('button[iconCls=ultimo_button]').setDisabled((page == totalPages) || (totalPages == 0));
        liquidacoesGrid.down('button[name=irButton]').setDisabled((totalPages == 0));
        liquidacoesGrid.down('label').setText('Página: ' + page + '/' + totalPages);
    }

    loadEmpenho();
    loadLiquidacoes();
    dadosBasicoPanel.down('label[name=documentoOriginalLabelTile]').setVisible(false);
    dadosBasicoPanel.down('label[name=documentoOriginalLabel]').setVisible(false);


})
;
