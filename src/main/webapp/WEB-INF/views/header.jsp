<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div id="header-wrapper">
    <div id="header">
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
    <div style="text-align: center;"><h3>${entidade.nome}</h3></div>
</div>
