<c:set var="exception" value="${requestScope['java.lang.Throwable']}"/>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>
        <jsp:scriptlet>

              exception.getMessage();

        </jsp:scriptlet>
    </title>
</head>
<body>
Ops
</body>
</html>
