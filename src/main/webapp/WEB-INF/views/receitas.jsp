<%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix = "fmt" uri = "http://java.sun.com/jsp/jstl/fmt" %>
<%@ page session="false"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<jsp:include page="imports.jsp"/>
<script type="text/javascript" src="<c:url value="/resources/app/js/receitas.js"/>"></script>

<body>
	<div id="header-wrapper">
		<div id="header" class="container">
			<div id="logo">
				<img alt="transparencia" src="<c:url value="/resources/app/images/logo_transp_140513.png"/>">
			</div>
			<div id="menu">
					<ul>
						<li class="current_page_item"><a href="<c:url value="/${entidade.id}"/>">Início</a></li>
						<li><a href="<c:url value="/${entidade.id}/links"/>">Links</a></li>
						<li><a href="<c:url value="/${entidade.id}/duvidas"/>">Dúvidas</a></li>
						<li><a href="<c:url value="/${entidade.id}/contato"/>">Contato</a></li>
					</ul>
			</div>
		</div>
		<div style="text-align: center;">
			<h3>${entidade.nome}</h3>
		</div>
	</div>
	<!-- end #header -->

	<div id="page">
		<div class="center">
			<div id="consultaReceitaForm"></div>
			</br>
			<div id="ReceitaGrid"></div>
            <div id="downloadPanel"></div>
		</div>
	</div>
	<!-- end #page -->
	</div>
	<c:if test="${not empty lastUpdate}">
		<p style="text-align: center">
			Atualizando em: <strong><fmt:formatDate pattern="dd/MM/yyyy 'às' HH:mm" value="${lastUpdate}"/></strong>
		</p>
	</c:if>

	<div id="footer">
        <p>Copyright (c) 2013 Link3 Tecnologia - 71 2102-6000 / <a href="mailto:podefalar@link3.com.br?Subject=Portal Transparencia.net.br" target="_top">podefalar@link3.com.br</a>.  Todos os direitos reservados.</p>
	</div>
	<!-- end #footer -->
</body>
</html>