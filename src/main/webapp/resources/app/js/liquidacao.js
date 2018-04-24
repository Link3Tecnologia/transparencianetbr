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
					dateFormat : 'd/m/Y'
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
	// create grid
	var pagamentosGrid = Ext.create('Ext.grid.Panel', {
		height : 250,
		collapsible : true,
		title : 'Documentos Relacionados',
		store : despesaStore,
		loadMask : true,
		selModel : {
			pruneRemoved : false
		},
		multiSelect : false,
		viewConfig : {
			trackOver : false,
			emptyText : '<h1 style="margin:20px">Nenhum resultado encontrado</h1>'
		},
		// grid columns
		columns : [{
				text : 'Data',
				dataIndex : 'data',
				width : 80,
				type : 'date',
				renderer : Ext.util.Format.dateRenderer('d/m/Y'),
				align : 'center',
				allowBlank: false
		}, {
			text : 'Fase',
			dataIndex : 'fase',
			width : 80,
			align : 'center',
			name : 'faseColumn'
		}, {
			text : 'Documento',
			dataIndex : 'numero',
			width : 90,
			align : 'center',
			renderer : renderDocumento
		},{
			text : 'OBS',
			dataIndex : 'obs',
			flex:1
		}, {
			text : 'Valor',
			dataIndex : 'valor',
			width : 100,
			align : 'right',
			renderer : rendererBrMoney
		}],
		bbar : ['->', '-', {
			xtype : 'label',
			text : 'Página: 0/0'
		}, {
			xtype : 'numberfield',
			fieldLabel : 'página',
			emptyText : 'nº',
			labelWidth : 40,
			labelAligh : 'right',
			width : 100,
			hideTrigger : true
		}, {
			text : 'Ir',
			name : 'irButton',
			handler : function(b, e, eOpts) {
				var irPage = b.ownerCt.down('numberfield').getValue();
				if ((irPage < 1) || (irPage > total_Pages)) {
					Ext.MessageBox.show({
						title : 'Página Inválida',
						msg : 'A página solicitada não é válida!',
						buttons : Ext.MessageBox.OK,
						icon : Ext.MessageBox.WARNING,
						width : 300
					});
				} else {
					 loadPagamentos(irPage);
				}
			}
		}, '-', {
			text : 'Primeiro',
			iconCls : 'primeiro_button',
			tooltip : 'Primeiro Lançamento',
			handler : function() {
				 loadPagamentos(1);
			}
		}, {
			text : 'Anterior',
			iconCls : 'anterior_button',
			tooltip : 'Anterior Lançamento',
			handler : function() {
				 loadPagamentos(currentPage - 1);
			}
		}, {
			text : 'Próximo',
			iconCls : 'proximo_button',
			tooltip : 'Proximo Lançamento',
			handler : function() {
				 loadPagamentos(currentPage + 1);
			}
		}, {
			text : 'Último',
			iconCls : 'ultimo_button',
			tooltip : 'Ultimo Lançamento',
			handler : function() {
				 loadPagamentos(total_Pages);
			}
		}],
		renderTo : 'pagamentosGrid'
	});
	function renderDocumento(value, p, record) {
		return Ext.String.format('<a href="{0}/pagamento/{1}">{2}</a>', getURLBaseApp(document, record.data.entidade_id), record.data.id, value);
	}
	function loadLiquidacao() {
		var liquidacao = getLastURLNode(document);
		Ext.Ajax.request({
			headers : {
				'Content-Type' : 'application/json'
			},
			url : Ext.String.format('{0}/liquidacaodetalhe/{1}', getURLBaseApp(document), liquidacao),
			scope : this,
			success : function(response, opts) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				if (jsonResponse.success) {
					updatePanels(jsonResponse.data);
				} else {
					Ext.MessageBox.alert('Liquidacao', jsonResponse.message);
				}
			},
			failure : function(response, opts) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				Ext.MessageBox.alert('Liquidacao', jsonResponse.message);
			}
		});
	}
	function updatePanels(liquidacao) {
		// basico
		dadosBasicoPanel.down('label[name=faseLabel]').setText(liquidacao.fase);
		dadosBasicoPanel.down('label[name=documentoLabel]').setText(liquidacao.numero);
		dadosBasicoPanel.down('label[name=tipoDocumentoLabel]').setText('Nota de Liquidação (NL)');
		dadosBasicoPanel.down('label[name=dataLabel]').setText(liquidacao.data);
		dadosBasicoPanel.down('label[name=unidadeGestoraLabel]').setText(liquidacao.unidgestora + ' - ' + liquidacao.unidorcamentarianome);
		dadosBasicoPanel.down('label[name=favorecidoLabel]').setText(liquidacao.cnpjcpf + ' - ' + liquidacao.fornecedornome);
		dadosBasicoPanel.down('label[name=valorLabel]').setText('R$ ' + Ext.util.Format.brMoney(liquidacao.valor));

		// detalhes
		dadosDetalhadosPanel.down('label[name=obsLabel]').setText(liquidacao.obs);
		dadosDetalhadosPanel.down('label[name=categoriaDespesaLabel]').setText(liquidacao.categoriaeconomica);
		dadosDetalhadosPanel.down('label[name=grupoDespesaLabel]').setText(liquidacao.grupodespesa);
		dadosDetalhadosPanel.down('label[name=modalidadeAplicacaoLabel]').setText(liquidacao.modalidadeaplicacao);
		dadosDetalhadosPanel.down('label[name=elementoDespesaLabel]').setText(liquidacao.elementodespesa);
	}
	// define funcao de carregar dados
	function loadPagamentos(page) {
		var lparams = {
			values : {
				'fase' : 'pagamento',
				'liquidacao.id' : getLastURLNode(document),
				'page' : page ? page : 1
			}
		};
		Ext.Ajax.request({
			headers : {
				'Content-Type' : 'application/json'
			},
			url : Ext.String.format('{0}/despesas/list', getURLBaseApp(document)),
			params : Ext.JSON.encode(lparams),
			scope : this,
			success : function(response, opts) {
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
		});
	}
	function updateBar(totalPages, page) {
		total_Pages = totalPages;
		currentPage = page;
		pagamentosGrid.down('button[iconCls=primeiro_button]').setDisabled(page == 1);
		pagamentosGrid.down('button[iconCls=anterior_button]').setDisabled(page == 1);
		pagamentosGrid.down('button[iconCls=proximo_button]').setDisabled((page == totalPages) || (totalPages == 0));
		pagamentosGrid.down('button[iconCls=ultimo_button]').setDisabled((page == totalPages) || (totalPages == 0));
		pagamentosGrid.down('button[name=irButton]').setDisabled((totalPages == 0));
		pagamentosGrid.down('label').setText('Página: ' + page + '/' + totalPages);
	}
	loadLiquidacao();
	loadPagamentos();
	
});
