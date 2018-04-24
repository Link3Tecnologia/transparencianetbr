Ext.require(['Ext.form.*', 'Ext.form.*', 'Ext.tip.QuickTipManager']);

Ext.define('Transparencia.overrides.view.Table', {
    override: 'Ext.view.Table',
    checkThatContextIsParentGridView: function(e){
        var target = Ext.get(e.target);
        var parentGridView = target.up('.x-grid-view');
        if (this.el != parentGridView) {
            /* event of different grid caused by grids nesting */
            return false;
        } else {
            return true;
        }
    },
    processItemEvent: function(record, row, rowIndex, e) {
        if (e.target && !this.checkThatContextIsParentGridView(e)) {
            return false;
        } else {
            return this.callParent([record, row, rowIndex, e]);
        }
    }
});

function rendererBrMoney(value, p, record) {
    var value = /* 'R$ ' + */Ext.util.Format.number(value, '0,000.00/i').replace('.', '_').replace(',', '.').replace('_', ',');
    return value;
}

Ext.util.Format.brDateRenderer = function (val) {
    var dt = Ext.Date.parse(val, 'Y-m-d');
    return Ext.util.Format.date(dt, 'd/m/Y');
}

function getURLBaseX(document) {
    return document.location.protocol + '//' + document.location.host + '/' + document.location.pathname.split('/')[1];
}
function getURLBaseApp(document, entidade) {
    if (!entidade) {
        entidade = enduceEntidade(document);
    }
    var index = document.location.href.indexOf(entidade) + entidade.toString().length;
    var path = document.location.href.substr(0, index);
    return path;
}
function getLastURLNode(document) {
    var path = document.location.pathname.split('/');
    var pathSize = path.length;
    return path[(pathSize - 1)];
}
function enduceEntidade(document) {
    var entidade;
    Ext.Array.each(document.location.pathname.split('/'), function (value) {
        if (Ext.isNumeric(value)) {
            entidade = value;
            return false;
        }
    });
    if (entidade) {
        return entidade;
    } else {
    }
}

function mask(element, message) {
    if (element) {
        try {
            element.mask_ = new Ext.LoadMask(element.el, {msg: (!message) ? 'Aguarde...' : message});
            element.mask_.show();

        } catch (err) {
        }
    }
}

function unmask(element) {
    if (element) {
        element.getEl().unmask();
    }
}

function ajaxRequest(args, callback, scope) {
    var headers = null;
    var params = args.params;
    if (args.json) {
        headers = {
            'Content-Type': 'application/json'
        };
        params = Ext.JSON.encode(args.params);
    }
    Ext.Ajax.request({
        headers: headers,
        url: args.url,
        timeout: (args.timeout) ? args.timeout : Ext.Ajax.timeout,
        params: params,
        scope: this,
        success: function (response, opts) {
            var jsonResponse = Ext.JSON.decode(response.responseText);
            if (callback) {
                callback.call(scope || this, jsonResponse, scope);
            }
        },
        failure: function (response, opts) {
            if (callback) {
                callback.call(scope || this, response, scope);
            }
        }
    });
}
