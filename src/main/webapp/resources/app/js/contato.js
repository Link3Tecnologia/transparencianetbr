Ext.require(['Ext.form.*', 'Ext.form.*', 'Ext.tip.QuickTipManager']);
Ext.onReady(function() {
	var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
	var tipoStore = Ext.create('Ext.data.Store', {
		fields : ['nome'],
		data : [{
			'nome' : 'Dúvidas'
		}, {
			'nome' : 'Sugestões'
		}, {
			'nome' : 'Críticas'
		}]
	});
	var contatoForm = Ext.create('Ext.form.Panel', {
		renderTo : 'contatoForm',
		title : 'Formulário para contato',
		bodyPadding : 5,
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		fieldDefaults : {
			labelAlign : 'top'
		},
		items : [{
			xtype : 'fieldcontainer',
			layout : 'hbox',
			items : [{
				xtype : 'textfield',
				fieldLabel : 'Nome',
				afterLabelTextTpl : required,
				allowBlank : false,
				name : 'contato_nome',
				margins : '0 5 0 0',
				flex : 3,
				maxLength : 80,
				enforceMaxLength : true
			}, {
				xtype : 'textfield',
				fieldLabel : 'Telefone',
				name : 'contato_telefone',
				flex : 1,
				afterLabelTextTpl : required
			}]
		}, {
			xtype : 'fieldcontainer',
			layout : 'hbox',
			items : [{
				xtype : 'textfield',
				fieldLabel : 'Email',
				afterLabelTextTpl : required,
				allowBlank : false,
				name : 'contato_email',
				vtype : 'email',
				anchor : '95%',
				flex : 1,
				maxLength : 50,
				enforceMaxLength : true,
			}, {
				xtype : 'combo',
				fieldLabel : 'Tipo',
				afterLabelTextTpl : required,
				allowBlank : false,
				name : 'contato_tipo',
				store : tipoStore,
				queryMode : 'local',
				displayField : 'nome',
				valueField : 'nome',
				anchor : '95%',
				editable : false,
				flex : 1,
				margins : '0 0 0 5'
			}]
		}, {
			xtype : 'textareafield',
			name : 'contato_msg',
			fieldLabel : 'Escreva aqui sua mensagem:',
			height : 200,
			anchor : '100%',
			afterLabelTextTpl : required,
			allowBlank : false,
			maxLength : 1000,
			enforceMaxLength : true,
			listeners : {
				change : {
					fn : function(field, newValue, oldValue, eOpts) {
						field.ownerCt.down('label').setText(Ext.String.format('{0}/{1}', newValue.length, 1000))
					}
				}
			}
		}],
		bbar : [{
			xtype : 'label',
			text : '0/1000',
			iconCls : 'checked',
		}, '->', '-', {
			text : 'Limpar',
			handler : function() {
				this.up('form').getForm().reset();
			}
		}, {
			text : 'Enviar',
			handler : enviarMensagem
		}]
	});
	function enviarMensagem(button, e, eOpts) {
		if (!contatoForm.getForm().isValid()) {
			Ext.MessageBox.alert('Contato', 'É necessário que todos os campos marcados com um "*" sejam preenchidos!');
		} else {
			console.log('enviando...');
			var bean = {
				values : contatoForm.getForm().getValues()
			};
			mask(contatoForm, 'Aguarde! Enviando sua mensagem...');
			
			Ext.Ajax.request({
				headers : {
					'Content-Type' : 'application/json'
				},
				url : Ext.String.format('{0}/contato/send', getURLBaseApp(document)),
				params : Ext.JSON.encode(bean),
				scope : this,
				success : function(response, opts) {
					var jsonResponse = Ext.JSON.decode(response.responseText);
					unmask(contatoForm);
					if (jsonResponse.success) {
						Ext.MessageBox.alert('Contato', jsonResponse.message, function showResultText(btn, text) {
							window.location = getURLBaseApp(document);
						});
					} else {
						Ext.MessageBox.alert('Contato', jsonResponse.message);
					}
				},
				failure : function(response, opts) {
					unmask(contatoForm);
					var jsonResponse = Ext.JSON.decode(response.responseText);
					Ext.MessageBox.alert('Contato', jsonResponse.message);
				}
			});
		}
	}
});