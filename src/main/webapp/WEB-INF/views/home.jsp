<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page session="false" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<jsp:include page="imports.jsp"/>

<style>
    .ui-datepicker-calendar {
        display: none;
    }
</style>

<body>
<div id="wrapper">
    <jsp:include page="header.jsp"/>

    <div id="page">
        <div id="content">
            <div class="post">
                <h2 class="title" style="text-align: center">
                    <a href="#">Bem-vindo</a>
                </h2>
                <div style="clear: both;">&nbsp;</div>
                <div class="entry" style="text-align: center">
                    <p>
                        Este é o <strong>Portal da Transparência </strong> - <strong> ${entidade.nome}. </strong><br/>
                        Atualizando em: <strong><fmt:formatDate pattern="dd-MM-yyyy - HH:mm"
                                                                value="${lastUpdate}"/></strong>
                    </p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                </div>
            </div>

            <div style="clear: both;">&nbsp;</div>
        </div>
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
                        <li>Transferências Financeiras
                            <div style="padding-left: 30">
                                <a href="<c:url value="/${entidade.id}/tf/0"/>">Entradas</a></br>
                                <c:if test="${showextras}">
                                    <a href="<c:url value="/${entidade.id}/tf/1"/>">Saídas</a></br>
                                </c:if>
                            </div>
                        </li>

                        <c:if test="${not empty entidade}">
                            <li>Relatórios
                                <div style="padding-left: 30">
                                    <a id="listaClassCredores" entidade="${entidade}"
                                       entidade_gestora="${entidade.gestora}"
                                       entidade_ocf="${entidade.id}"
                                       style="cursor: pointer; text-decoration: underline;">Lista Classificatória de
                                        Credores</a></br>
                                </div>
                            </li>
                        </c:if>
                    </ul>
                </li>
            </ul>
        </div>


        <div id="dialog-confirm" title="Selecione o período">
            <div style="padding-top: 20px; padding-left: 20px">
                <label for="selectMonth">Período :</label>
                <select id='selectMonth'>
                </select>
                <select id='selectYear' style="padding-left: 10px">
                </select>
            </div>
        </div>

        <!-- end #sidebar -->
        <div style="clear: both;">&nbsp;</div>
        <div style="text-align: center;" id="version">
            <p>Não é recomendado a utilização com Internet Explorer - ${server_version}</p>
        </div>
    </div>
    <!-- end #page -->
</div>
<jsp:include page="footer.jsp">
    <jsp:param name="lastUpdate" value="${lastUpdate}"/>
</jsp:include>

</body>
</html>