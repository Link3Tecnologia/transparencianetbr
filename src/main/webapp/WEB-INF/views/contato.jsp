<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<jsp:include page="imports.jsp"/>
<body>
	<div id="wrapper">
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
			<div id="content">
				<div class="post">
					<h2 class="title">
						<a href="#">Fale Conosco</a>
					</h2>
					<div style="clear: both;">&nbsp;</div>
					<div class="entry">
						<p>
							Entre em contato conosco diariamente no horário comercial pelo telefone <strong>${entidade.telefone}</strong> ou
							se preferir preencha o formuário abaixo.
						</p>
                        <p>

                        </p>
					</div>
					<div class="center">
						<div id="contatoForm"></div>
					</div>

				</div>
				<div style="clear: both;">&nbsp;</div>
			</div>
			<!-- end #content -->
			<div id="sidebar">
				<ul>
					<li>
						<h2>Consultas</h2>
						<ul>
							<li>Despesas
								<div style="padding-left: 30">
									<a href="<c:url value="/${entidade.id}/despesas"/>">Orçamentárias</a></br>
									<c:if test="${showextras}">
										<a href="<c:url value="/${entidade.id}/despesasextras"/>">Extra-Orçamentárias</a></br>
									</c:if>
								</div>
							</li>
							<li>Receitas
								<div style="padding-left: 30">
									<a href="<c:url value="/${entidade.id}/receitas"/>">Orçamentárias</a></br>
									<c:if test="${showextras}">
										<a href="<c:url value="/${entidade.id}/receitasextras"/>">Extra-Orçamentárias</a></br>
									</c:if>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<!-- end #sidebar -->
			<div style="clear: both;">&nbsp;</div>
			<div style="text-align: center;" id="version">
				<p>Não é recomendado a utilização com Internet Explorer - ${server_version}</p>
			</div>
		</div>
		<!-- end #page -->
	</div>
	<div id="footer">
        <p>Copyright (c) 2013 Link3 Tecnologia - 71 2102-6000 / <a href="mailto:podefalar@link3.com.br?Subject=Portal Transparencia.net.br" target="_top">podefalar@link3.com.br</a>.  Todos os direitos reservados.</p>
	</div>
	<!-- end #footer -->
</body>
</html>