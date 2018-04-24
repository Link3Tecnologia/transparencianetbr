Ext.onReady(function () {

    var _host = 'localhost:8443';

    $(function () {
        $("#dialog-confirm").dialog();
        $("#dialog-confirm").dialog("close");

        var today = new Date();
        var currentYear = today.getFullYear();
        for (i = currentYear - 5; i <= currentYear; i++) {
            var option = $('<option/>', {'value': i, 'text': i});
            $('#selectYear').append(option);
        }
        $('#selectYear').val(currentYear);

        var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        $.each(months, function (k, v) {
            var option = $('<option/>', {'value': k , 'text': v});
            $('#selectMonth').append(option);
        });
        $('#selectMonth').val(today.getMonth() );
    });

    function showReportClick(e) {

        $("#dialog-confirm").dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            show: true,
            position: {my: "right center", at: "left bottom", of: $("#listaClassCredores")},
            buttons: {
                Imprimir: function () {
                    $(this).dialog("close");
                    console.log($("#selectMonth").val())
                    console.log($("#selectYear").val())
                    var selectedDate = new Date($("#selectYear").val(),$("#selectMonth").val(),1);
                    selectedDate = Ext.Date.format(selectedDate, 'Y-m-d'),

                        console.log(selectedDate);
                    waitForToken(selectedDate);
                },
                Cancelar: function () {
                    $(this).dialog("close");
                }
            }
        });


    }

    function showReport(token, selectedDate) {
        console.log('showreport');
        console.log(selectedDate);
        $.blockUI({
            message: '<h3>Aguarde ... </h3>'
        });

        // var selectedDate = $(".date-picker").datepicker("getDate");
        //
        // selectedDate = Ext.Date.format(selectedDate, 'Y-m-d');
        console.log('selectedDate');
        console.log(selectedDate);

        $.ajax({
            url: 'https://' + _host + '/portal/imprimirListaClassificatoriaCredores',
            type: 'GET',
            xhrFields: {responseType: "arraybuffer"},
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            },
            data: {data_logada: selectedDate},
            success: function (reportReq) {
                var file = new Blob([reportReq], {type: 'application/pdf'});
                var fileURL = URL.createObjectURL(file);
                window.open(fileURL);

                $.unblockUI();
            },
            error: function () {
                $.unblockUI();
            }
        });
    }

    function waitForToken(selectedDate) {
        var _params = {
            entidade: listaClassCredoresMenu.getAttribute('entidade'),
            ocfEntidade: listaClassCredoresMenu.getAttribute('entidade_ocf'),
            ug: listaClassCredoresMenu.getAttribute('entidade_gestora')
        };

        var token = Ext.util.Cookies.get('anon_token_' + _params.entidade + _params.ug);
        if (!token) {

            ajaxRequest({
                url: 'https://' + _host + '/spr/portal/loginAnonymous',
                json: true,
                params: _params
            }, function (jsonResponse) {
                if (jsonResponse.data) {
                    Ext.util.Cookies.set('anon_token_' + _params.entidade + _params.ug, jsonResponse.data);
                }
                console.log('wait');
                console.log(selectedDate);
                showReport(jsonResponse.data, selectedDate);

            }, this);

        } else {
            showReport(token,selectedDate);
        }

    }

    var listaClassCredoresMenu = Ext.get(Ext.dom.Query.select('#listaClassCredores')[0]);
    if (listaClassCredoresMenu) {
        listaClassCredoresMenu.on('click', showReportClick);
    }

});

