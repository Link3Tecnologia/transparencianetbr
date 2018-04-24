<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<jsp:useBean id="random" class="java.util.Random" scope="application"/>
<html>

<jsp:include page="imports.jsp"/>
<script type="text/javascript" src="<c:url value="/resources/app/js/despesas.js?v=${random.nextInt()}"/>"></script>

<body>

<div id="wrapper">
    <jsp:include page="header.jsp"/>

    <div id="page">
        <div class="center">
            <div id="consultaDespesasForm"></div>
            <div id="despesaGrid"></div>
            <div id="downloadPanel"></div>
        </div>
    </div>
</div>

<c:if test="${not empty lastUpdate}">
    <p style="text-align: center">
        Atualizando em: <strong><fmt:formatDate pattern="dd/MM/yyyy 'às' HH:mm" value="${lastUpdate}"/></strong>
    </p>
</c:if>

<jsp:include page="footer.jsp"/>

</body>
</html>