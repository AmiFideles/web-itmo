<%@ page import="com.itmo.weblab2.model.ResultStorage" %>
<%@ page import="com.itmo.weblab2.model.Hit" %>
<%@ page import="java.util.List" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%String id = session.getId();%>
<!DOCTYPE html>
<html>
<head>
    <title>web-1</title>
    <style>
        body {
            font-size: 16px;
            font-family: "Century", fantasy;
            background-color: #8484b6;
        }


        form {
            padding: 10px;
        }

        button {
            border-width: 1px;
            border-color: #0a0a38;
            background-color: white;
        }

        input, select {
            border-width: 1px;
            border-color: #0a0a38;
        }

        tr {
            height: 25px;
        }

        .x-button {
            font-size: 16px;
        }

        #x-block {
            margin-bottom: 25px;
        }

        #y-block {
            margin-bottom: 25px;
        }

        .x-button:hover {
            background-color: #8484b6;
        }

        .x-button.selected, .main-button:hover {
            background-color: #0a0a38;
            color: #f6fafb;
        }

        .button-error .x-button, .input-error {
            border-width: 2px;
            border-color: red;
        }

        .coloured-block > span {
            color: #f6fafb;
        }

        #head-area {
            width: 95%;
            padding: 20px;
            margin-bottom: 30px;
            margin-left: 2%;
            margin-right: 2%;
            color: #ffffff;
            font-size: 20px;
            background-color: #0a0a38;
            text-align: center;
        }

        #left-area {
            width: 300px;
            margin: 0 0 5% 7%
        }

        #right-area {
            width: 56.5%;
            height: 563px;
            overflow: auto;
            margin-left: 7%;

        }

        #graph-block {
            width: 300px;
            height: 364px;
            border-color: black;
            margin-bottom: 20px;
        }

        svg {
            cursor: crosshair;
        }

        .graph-point {
            stroke: black;
        }

        .graph-axle-line {
            stroke: black;
        }

        #table-scroll-container {
            bottom: 0;
            right: 0;
            top: 60px;
            width: 100%;
            height: 500px;
            overflow-y: scroll;
        }

        #result-table {
            width: 100%;
            text-align: center;
            border-collapse: collapse;
        }

        #main-button-block {
            padding: 5px;
            text-align: center;
        }

        .coloured-block {
            text-align: center;
            background-color: #0a0a38;
            padding: 1em;
            font-size: 20px;
        }

        .content-plate {
            background-color: white;
        }

        .form-labels {
            display: inline-block;
            width: 20%;
            text-align: center;
        }

        #form-block {
            display: inline-block;
            width: 100%;
            margin-left: 2px;
            text-align: left;
        }

        .content-plate {
            display: inline-block;
        }

        .input-areas {
            display: inline;
            width: 100%;
            margin-left: 1px;
            text-align: left;

        }

        .main-button {
            display: inline-block;
        }

        .floating-areas {
            display: inline-block;
            vertical-align: top;
            overflow: hidden;
        }

        .left-aligned {
            float: left;
        }

        .right-aligned {
            float: right;
        }

        .dotted-line-x,
        .dotted-line-y {
            stroke: black;
            stroke-dasharray: 2;
        }

        .tempCircle {
            stroke: black;
        }




        .dotted-raw-x,
        .dotted-raw-y {
            stroke: #ef5b5b;
            stroke-dasharray: 5;
        }

        #form-block {
            padding: 0 10px 10px 0;
        }

        .x-button {
            padding: 3px;
        }

        #y-input {
            width: 75%;
        }

        .wrong-value {
            color: red;
            border: solid;
        }

        .miss {
            background-color: darkred;
        }

        .hit {
            background-color: darkgreen;
        }

        .true {
            stroke: limegreen;
            fill: limegreen;
        }

        .false {
            stroke: #ef5b5b;
            fill: #ef5b5b;
        }

        #table-header {
            background-color: #d0d0d9;
        }

        #result-table tr:nth-child(n):hover {
            background-color: #d0d0d9;
        }
        .form_radio_group {
            display: inline-block;
            overflow: hidden;
        }
        .form_radio_group-item {
            display: inline-block;
            float: left;
        }
/*        .form_radio_group input[type=radio] {
            display: none;
        }*/
        .form_radio_group label {
            display: inline-block;
            cursor: pointer;
            padding: 0px 5px;
            line-height: 24px;
            border: 1px solid #999;
            border-right: none;
            user-select: none;
        }

        .form_radio_group .form_radio_group-item:first-child label {
            border-radius: 6px 0 0 6px;
        }
        .form_radio_group .form_radio_group-item:last-child label {
            border-radius: 0 6px 6px 0;
            border-right: 1px solid #999;
        }

        /* Checked */
        .form_radio_group input[type=radio]:checked + label {
            background: #b2b2e2;
        }

        /* Hover */
        .form_radio_group label:hover {
            color: #666;
        }

        /* Disabled */
        .form_radio_group input[type=radio]:disabled + label {
            background: #efefef;
            color: #666;
        }

        .r-select{
            padding: 6px;
            width: 50%;
        }


    </style>
</head>
<body>
<div id="main-container">
    <header>
        <div id="head-area" class="coloured-block floating-areas">
            <span class="left-aligned">Искандаров Ш.Х</span>
            <span class="right-aligned">Вариант 33009</span>
            <span class="center-aligned">Группа P32312</span>
        </div>
    </header>


    <div id="left-area" class="floating-areas">

        <div id="graph-block" class="content-plate">
            <div id="graph-heading" class="coloured-block">
                <span>График</span>
            </div>
            <div id="image-container">
                <svg class="svg-graph" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
                    circle

                    <path class="graph-shape" d="M 200 150
                  A 50, 50, 0, 0, 1, 150 200
                  L 150 150
                  Z" fill="#5ba8ef" fill-opacity="0.5"/>

                    <polygon class="graph-shape" points="150,100 150,150 100,150" fill="#5ba8ef" fill-opacity="0.5"/>
                    <polygon class="graph-shape" points="250,150 250,100 150,100 150,150" fill="#5ba8ef"
                             fill-opacity="0.5"/>

                    <text class="graph-axle-text" x="290" y="140">x</text>
                    <line class="graph-axle-line" x1="0" x2="295" y1="150" y2="150"/>
                    <polygon class="graph-axle-arrow" points="299,150 290,155 290,145"/>

                    <text class="graph-axle-text" x="160" y="10">y</text>
                    <line class="graph-axle-line" x1="150" x2="150" y1="5" y2="300"/>
                    <polygon class="graph-axle-arrow" points="150,1 145,10 155,10"/>

                    <line class="graph-point" x1="50" x2="50" y1="145" y2="155"/>
                    <line class="graph-point" x1="100" x2="100" y1="145" y2="155"/>
                    <line class="graph-point" x1="200" x2="200" y1="145" y2="155"/>
                    <line class="graph-point" x1="250" x2="250" y1="145" y2="155"/>

                    <line class="graph-point" x1="145" x2="155" y1="250" y2="250"/>
                    <line class="graph-point" x1="145" x2="155" y1="200" y2="200"/>
                    <line class="graph-point" x1="145" x2="155" y1="100" y2="100"/>
                    <line class="graph-point" x1="145" x2="155" y1="50" y2="50"/>

                    labels
                    <text class="graph-label r-whole-neg" text-anchor="middle" x="50" y="140">-R</text>
                    <text class="graph-label r-half-neg" text-anchor="middle" x="100" y="140">-R/2</text>
                    <text class="graph-label r-half-pos" text-anchor="middle" x="200" y="140">R/2</text>
                    <text class="graph-label r-whole-pos" text-anchor="middle" x="250" y="140">R</text>

                    <text class="graph-label r-whole-neg" text-anchor="start" x="160" y="255">-R</text>
                    <text class="graph-label r-half-neg" text-anchor="start" x="160" y="205">-R/2</text>
                    <text class="graph-label r-half-pos" text-anchor="start" x="160" y="105">R/2</text>
                    <text class="graph-label r-whole-pos" text-anchor="start" x="160" y="55">R</text>


                </svg>
            </div>
        </div>


        <div id="form-block" class="content-plate">


            <form id="values-form" action="/dispatcher" method="POST">
                <div id="x-block">
                    <div id="xlabel" class="form-labels">
                        <label>X</label>
                    </div>
                    <div id="x-buttons" class="input-areas">
                        <input type="text" class="x-button" name="x" autocomplete="off" maxlength="6"
                               placeholder="Значение от -3 до 3">
                    </div>
                </div>
                <div id="y-block">
                    <div id="ylabel" class="form-labels">
                        <label>Y</label>
                    </div>
                    <div class="form_radio_group">
                        <div class="form_radio_group-item">
                            <input id="radio-1" type="radio" name="radio" value="1">
                            <label for="radio-1">-2</label>
                        </div>
                        <div class="form_radio_group-item">
                            <input id="radio-2" type="radio" name="radio" value="2">
                            <label for="radio-2">-1.5</label>
                        </div>
                        <div class="form_radio_group-item">
                            <input id="radio-3" type="radio" name="radio" value="3">
                            <label for="radio-3">-1</label>
                        </div>
                        <div class="form_radio_group-item">
                            <input id="radio-4" type="radio" name="radio" value="4">
                            <label for="radio-4">-0.5</label>
                        </div>
                        <div class="form_radio_group-item">
                            <input id="radio-5" type="radio" name="radio" value="4">
                            <label for="radio-5">0</label>
                        </div>
                        <div class="form_radio_group-item">
                            <input id="radio-6" type="radio" name="radio" value="4">
                            <label for="radio-6">1</label>
                        </div>
                        <div class="form_radio_group-item">
                            <input id="radio-7" type="radio" name="radio" value="4">
                            <label for="radio-7">1.5</label>
                        </div>
                        <div class="form_radio_group-item">
                            <input id="radio-8" type="radio" name="radio" value="4">
                            <label for="radio-8">2</label>
                        </div>
                    </div>
                </div>


                <div id="r-block">
                    <div id="rlabel" class="form-labels">
                        <label>R</label>
                    </div>

                    <div id="rselection" class="input-areas">
                        <input type="text" class="r-select" id="r-options" name="r" autocomplete="off" maxlength="6"
                               placeholder="Значение от 2 до 5">
                    </div>
                </div>

                <div id="main-button-block">
                    <button class="main-button" id="submit" type="submit" form="values-form">Отправить</button>
                    <button class="main-button" id="reset" type="reset" form="values-form">Очистить форму</button>
                    <button class="main-button" id="clear" type="button" form="values-form">Очистить таблицу</button>
                </div>
            </form>

        </div>

    </div>


    <div id="right-area" class="floating-areas content-plate">
        <div id="table-heading" class="coloured-block">
            <span>Таблица результатов</span>
        </div>

        <div id="table-scroll-container">
            <table id="result-table">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Результат попадания</th>
                </tr>
                </thead>
                <tbody>
                <% ResultStorage result =(ResultStorage) application.getAttribute("result");
                    if (result!=null){
                    List<Hit> listHitById = result.getListHitById(session.getId());
                    if (listHitById!=null) {
                        for (Hit hit : listHitById ) {%>
                        <tr>
                            <td><%=hit.getXValue()%></td>
                            <td><%=hit.getYValue()%></td>
                            <td><%=hit.getRValue()%></td>
                            <td><%=hit.isResult()%></td>
                        </tr>
                        <%}}}%>
                </tbody>
            </table>
        </div>
    </div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="module" src="js/main.js"></script>
</body>
</html>