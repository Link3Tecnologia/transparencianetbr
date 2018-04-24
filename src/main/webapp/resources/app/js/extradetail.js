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
				text : 'Conta:',
				margin : '5 0 0 20',
				width : 200,
				style : 'text-align:right; font-weight:bold;'
			}, {
				xtype : 'label',
				name : 'contaLabel',
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
		},{
			xtype : 'fieldcontainer',
			style : 'background-color:#F0F0F0;',
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
		}]
	});
	
	// despesa model
	Ext.define('DespesaModel', {
		extend : 'Ext.data.Model',
		fields : ['entidade_id',
		          {
					name : 'data',
					type : 'date',
					dateFormat : 'd/m/Y'
		          },
//		          'data',
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
	function loadExtra() {
		console.log(tipo);
		var extra = getLastURLNode(document);
		Ext.Ajax.request({
			headers : {
				'Content-Type' : 'application/json'
			},
			url : Ext.String.format('{0}/{1}extradetalhe/{2}', getURLBaseApp(document), (tipo == 'despesas') ? 'despesa' : 'receita', extra),
			scope : this,
			success : function(response, opts) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				if (jsonResponse.success) {
					updatePanels(jsonResponse.data);
				} else {
					Ext.MessageBox.alert('Extra', jsonResponse.message);
				}
			},
			failure : function(response, opts) {
				var jsonResponse = Ext.JSON.decode(response.responseText);
				Ext.MessageBox.alert('Extra', jsonResponse.message);
			}
		});
	}
	function updatePanels(pagamento) {
		// basico
		dadosBasicoPanel.down('label[name=faseLabel]').setText(pagamento.fase);
		dadosBasicoPanel.down('label[name=documentoLabel]').setText(pagamento.numero);
		dadosBasicoPanel.down('label[name=tipoDocumentoLabel]').setText(pagamento.tipodocumento);
		dadosBasicoPanel.down('label[name=dataLabel]').setText(pagamento.data);
		dadosBasicoPanel.down('label[name=contaLabel]').setText(pagamento.conta + ' - ' + pagamento.nomeconta);
		dadosBasicoPanel.down('label[name=valorLabel]').setText( Ext.util.Format.brMoney(pagamento.valor));
		dadosBasicoPanel.down('label[name=obsLabel]').setText(pagamento.obs);
	}
	loadExtra();
	
});
