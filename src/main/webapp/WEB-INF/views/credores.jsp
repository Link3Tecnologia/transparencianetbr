<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<jsp:useBean id="random" class="java.util.Random" scope="application"/>
<html>

<jsp:include page="imports.jsp"/>
<script type="text/javascript"
        src="<c:url value="/resources/app/js/credores.js?v=${random.nextInt()}"/>"></script>

<body>

<div id="wrapper">

    <jsp:include page="header.jsp"/>
    <div style="width: 75%; margin: 0 auto;	padding: 30px 0px;">
        <h3 style="padding-bottom: 15px; text-align: center;">Listas Consolidadas de Credores</h3>
        <p>Listas consolidadas de credores,
            classificadas por fonte diferenciada de recursos e organizadas pela ordem cronológica de antiguidade
            dos referidos créditos, estabelecida mediante a apresentação de notas fiscais, faturas ou documentos
            equivalentes de cobrança e demais documentos exigidos no contrato, a serem confirmados em liquidação
            de despesa conforme <a href="http://antigo.tce.se.gov.br/sgw/resolucao.ler.php?r=296/2016"
                                   target="_blank">Resolução TCE Nº 296</a>.
        </p>
        <div id="consultaCredoresForm"></div>
        <div id="credores"></div>
    </div>
</div>

<c:if test="${not empty lastUpdate}">
    <p style="text-align: center">
        Atualizando em: <strong><fmt:formatDate pattern="dd/MM/yyyy às HH:mm" value="${lastUpdate}"/></strong>
    </p>
</c:if>

<jsp:include page="footer.jsp"/>

<style>
    .x-column-header {
        font-size: 10px;
    }

    .x-grid-row .x-grid-cell {
        font-size: 11px;
    }

</style>

</body>
</html>