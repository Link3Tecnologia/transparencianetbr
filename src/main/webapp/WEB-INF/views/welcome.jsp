<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<jsp:useBean id="random" class="java.util.Random" scope="application"/>
<html>

<jsp:include page="imports.jsp"/>
<script type="text/javascript" src="<c:url value="/resources/app/js/welcome.js?v=${random.nextInt()}"/>"></script>

<body>
<div id="wrapper">
    <jsp:include page="header.jsp"/>
    <div id="page">
        <div id="center">
            <h3 class="title">
                <a href="#">Bem-vindo</a>
            </h3>
            <div style="clear: both;">&nbsp;</div>
            <div class="entry">
                <p>
                    Este é o <strong>Agregador dos Portais de Transparência. </strong> <!-- providos pela <strong> Link3 Tecnologia. </strong> -->
                </p>
                <p>Escolha uma das entidades abaixo para dar início a suas consultas.</p>
            </div>
            <div id="entidadesForm" class="entry"></div>

            <div style="clear: both;">&nbsp;</div>
        </div>
        <div style="clear: both;">&nbsp;</div>
    </div>
</div>
<jsp:include page="footer.jsp"/>
</body>
</html>