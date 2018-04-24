Ext.require(['Ext.form.*', 'Ext.form.*', 'Ext.tip.QuickTipManager']);
Ext.onReady(function() {
	var dadosBasicoPanel = Ext.create('Ext.panel.Panel', {
		title : 'Dados Básicos',
		renderTo : 'dadosBasicoPanel',
		layout : {
			type : 'vbox',
			align : 'stretch',
			pack : 'start'
		},
		fieldDefaults : {
			labelAlign : 'right',
			labelWidth : 320,
			msgTarget : 'side'
		},
		items : [{
			xtype : 'fieldcontainer',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [{
				xtype : 'label',
				text : 'Fase:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'faseLabel',
				margin : '5 0 0 20',
				width : 200
			}]
		}, {
			xtype : 'fieldcontainer',
			style : 'background-color:#F0F0F0;',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [{
				xtype : 'label',
				text : 'Documento:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'documentoLabel',
				margin : '5 0 0 20',
				width : 200
			}, {
				xtype : 'label',
				text : 'Tipo de Documento:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'tipoDocumentoLabel',
				margin : '5 0 0 20',
				width : 200
			}]
		}, {
			xtype : 'fieldcontainer',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [{
				xtype : 'label',
				text : 'Data:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'dataLabel',
				margin : '5 0 0 20',
				width : 200
			}]
		}, {
			xtype : 'fieldcontainer',
			style : 'background-color:#F0F0F0;',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [{
				xtype : 'label',
				text : 'Unidade Gestora:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'unidadeGestoraLabel',
				margin : '5 0 0 20',
				flex : 1
			}]
		}, {
			xtype : 'fieldcontainer',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [{
				xtype : 'label',
				text : 'Favorecido:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'favorecidoLabel',
				margin : '5 0 0 20',
				flex : 1
			}]
		}, {
			xtype : 'fieldcontainer',
			style : 'background-color:#F0F0F0;',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [{
				xtype : 'label',
				text : 'Valor:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'valorLabel',
				margin : '5 0 0 20',
				flex : 1
			}]
		}]
	});
	
	var dadosDetalhadosPanel = Ext.create('Ext.panel.Panel', {
		title : 'Dados Detalhados',
		renderTo : 'dadosDetalhadosPanel',
		layout : {
			type : 'vbox',
			align : 'stretch',
			pack : 'start'
		},
		fieldDefaults : {
			labelAlign : 'right',
			labelWidth : 320,
			msgTarget : 'side'
		},
		items : [{
			xtype : 'fieldcontainer',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [{
				xtype : 'label',
				text : 'Observação do Documento:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'obsLabel',
				margin : '5 0 0 20',
				flex : 1
			}]
		},  {
			xtype : 'fieldcontainer',
			style : 'background-color:#F0F0F0;',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [{
				xtype : 'label',
				text : 'Categoria de Despesa:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'categoriaDespesaLabel',
				margin : '5 0 0 20',
				width : 200
			}, {
				xtype : 'label',
				text : 'Grupo de Despesa:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'grupoDespesaLabel',
				margin : '5 0 0 20',
				width : 200
			}]
		}, {
			xtype : 'fieldcontainer',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [{
				xtype : 'label',
				text : 'Modalidade de Aplicação:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'modalidadeAplicacaoLabel',
				margin : '5 0 0 20',
				flex : 1
			}]
		}, {
			xtype : 'fieldcontainer',
			style : 'background-color:#F0F0F0;',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			items : [{
				xtype : 'label',
				text : 'Elemento de Despesa:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'elementoDespesaLabel',
				margin : '5 0 0 20',
				flex : 1
			}]
		}]
	});
	// despesa model
	Ext.define('DespesaModel', {
		extend : 'Ext.data.Model',
		fields : [ 'entidade_id',
		           {
					name : 'data',
					type : 'date',
					dateFormat : 'Y-m-d'
		           },
		           'fase', 'numero', 'valor', 'obs']
	});
	// create the Data Store
	var despesaStore = Ext.create('Ext.data.Store', {
		model : 'DespesaModel',
		autoLoad : false,
		proxy : {
			type : 'rest',
			url : Ext.String.format('{0}/despesa/list'),
			reader : {
				type : 'json',
				root : 'data'
			}
		}
	});
	function loadPagamento() {
		var pagamento = getLastURLNode(document);
		Ext.Ajax.request({
			headers : {
				'Content-Type' : 'application/json'
			},
			url : Ext.String.format('{0}/pagamentodetalhe/{1}', getURLBaseApp(document), pagamento),
			scope : this,
			success : function(response, opts) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				if (jsonResponse.success) {
					updatePanels(jsonResponse.data);
				} else {
					Ext.MessageBox.alert('Pagamento', jsonResponse.message);
				}
			},
			failure : function(response, opts) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				Ext.MessageBox.alert('Pagamento', jsonResponse.message);
			}
		});
	}
	function updatePanels(pagamento) {
		// basico
		dadosBasicoPanel.down('label[name=faseLabel]').setText(pagamento.fase);
		dadosBasicoPanel.down('label[name=documentoLabel]').setText(pagamento.numero);
		dadosBasicoPanel.down('label[name=tipoDocumentoLabel]').setText('Ordem Bancária (OB)');
		dadosBasicoPanel.down('label[name=dataLabel]').setText(pagamento.data);
		dadosBasicoPanel.down('label[name=unidadeGestoraLabel]').setText(pagamento.unidgestora + ' - ' + pagamento.unidorcamentarianome);
		dadosBasicoPanel.down('label[name=favorecidoLabel]').setText(pagamento.cnpjcpf + ' - ' + pagamento.fornecedornome);
		dadosBasicoPanel.down('label[name=valorLabel]').setText('R$ ' + Ext.util.Format.brMoney(pagamento.valor));

		// detalhes
		dadosDetalhadosPanel.down('label[name=obsLabel]').setText(pagamento.obs);
		dadosDetalhadosPanel.down('label[name=categoriaDespesaLabel]').setText(pagamento.categoriaeconomica);
		dadosDetalhadosPanel.down('label[name=grupoDespesaLabel]').setText(pagamento.grupodespesa);
		dadosDetalhadosPanel.down('label[name=modalidadeAplicacaoLabel]').setText(pagamento.modalidadeaplicacao);
		dadosDetalhadosPanel.down('label[name=elementoDespesaLabel]').setText(pagamento.elementodespesa);
	}
	loadPagamento();
	
});