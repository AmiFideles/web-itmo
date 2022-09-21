import {Graph} from "./graph.js";
import {Validator} from "./validator.js";

$(document).ready(function () {
    const xButtons = $('#x-buttons')
    const xButton = $('.x-button');
    const yInput = $("input[name='radio']");
    const radioBlock = $(".form_radio_group");
    const rSelect = $('#r-options');
    const graphSVG = $('.svg-graph');


    const graph = new Graph({
        $graphSvg: graphSVG,
        $rHalfPos: $('.r-half-pos'),
        $rWholePos: $('.r-whole-pos'),
        $rHalfNeg: $('.r-half-neg'),
        $rWholeNeg: $('.r-whole-neg '),
        $centreX: 150,
        $centreY: 150,
    })

    const validator = new Validator(
        -3,
        3,
        [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2],
        2,
        5
    )

    rSelect.keyup(() => {
        let r = getRValue();
        if (validator.validateR(r)) {
            validator.deleteErrorMessage(rSelect);
            graph.setRValue(r);
        } else {
            graph.setDefaultValueR();
            graph.removeLines();
        }

    })

    yInput.change(() => {
        let y = getYValue();
        if (validator.validateY(y)) {
            validator.deleteErrorMessage(yInput);
        }
        graph.setYValue(y)
    })

    xButton.keyup(function () {
        let x = getXValue();
        if (validator.validateX(x)) {
            validator.deleteErrorMessage(xButtons)
        }
        graph.setXValue(x)
    });

    graphSVG.mousemove(event => {
        if (!validator.validateR(getRValue()) && !rSelect.siblings().hasClass("wrong-value")) {
            validator.showErrorMessage(rSelect, validator.CHOOSE_R_LABEL);
            return;
        }

        graph.setRawValueX(event.offsetX, xButton);
        graph.setRawValueY(event.offsetY, yInput);
    })

    graphSVG.mouseleave(() => {
        graph.resetRawValues();
        validator.deleteErrorMessage(rSelect);
    })

    graphSVG.click(() => {
        graph.saveRawValue(xButton, yInput)
        if (validator.validateAllInputValues(graph.xValue, graph.yValue, graph.rValue, xButtons, radioBlock, rSelect, xButtons)) {
            addHit(graph.xValue, graph.yValue, graph.rValue)
        }

    })

    $('#submit').click((event) => {
        event.preventDefault();
        const x = getXValue();
        const y = getYValue();
        const r = getRValue();
        if (!validator.validateAllInputValues(x, y, r, xButtons, radioBlock, rSelect, xButtons)) return;

        addHit(x, y, r);

    })

    $('#clear').click((event) => {
        clearTable();
    })

    $('#reset').click(() => {
        graph.resetValues();
        validator.deleteAllErrorMessage(xButtons, radioBlock, rSelect)
    })

    function addHit(x, y, r) {
        $.ajax({
            url: 'dispatcher',
            method: 'POST',
            data: "x=" + x + "&y=" + y + "&r=" + r,
            timeout: 3000,
            success: function (data) {
                let element = JSON.parse(data);
                let newRow;
                newRow = '<tr>';
                newRow += '<td>' + element.xValue + '</td>';
                newRow += '<td>' + element.yValue + '</td>';
                newRow += '<td>' + element.rValue + '</td>';
                newRow += '<td>' + element.result + '</td>';
                let htmlElement = $.parseHTML(newRow);
                addClassHit(htmlElement);
                $('#result-table').append(htmlElement);
                redrawDot()
            },
            error: function (jqXHR, error) {
                if (jqXHR.status === 0) {
                    if (error === 'timeout') {
                        alert('Time out error. We apologize. The server is tired. Try again later');
                    } else {
                        alert('Not connect. Verify Network.');
                    }
                } else if (jqXHR.status === 400) {
                    alert(jqXHR.responseText);
                } else if (jqXHR.status === 404) {
                    alert('Requested page not found (404).');
                } else if (jqXHR.status === 500) {
                    alert('Internal Server Error (500).');
                } else if (error === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (error === 'timeout') {
                    alert('Time out error. We apologize. The server is tired. Try again later');
                } else if (error === 'abort') {
                    alert('Ajax request aborted.');
                }
            }
        })
    }

    function clearTable() {
        $.ajax({
            url: "dispatcher",
            type: "POST",
            data: "clear=true",
            timeout: 3000,
            success: function () {
                $("#result-table tbody > tr ").remove();
                $(".true").remove()
                $(".false").remove()
            },
            error: function (jqXHR, error) {
                if (jqXHR.status === 0) {
                    alert('Not connect. Verify Network.');
                } else if (jqXHR.status === 400) {
                    alert(jqXHR.responseText);
                } else if (jqXHR.status === 404) {
                    alert('Requested page not found (404).');
                } else if (jqXHR.status === 500) {
                    alert('Internal Server Error (500).');
                } else if (error === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (error === 'timeout') {
                    alert('Time out error. We apologize. The server is tired. Try again later');
                } else if (error === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error. ' + jqXHR.responseText);
                }
            }
        });
    }

    function addClassHit(element) {
        let result = $(element).find("td:last").text();
        const classResult = result === 'true' ? 'hit' : 'miss';
        $(element).addClass(classResult);
    }

    function getXValue() {
        let x = $('.x-button').val();
        return x != null && x.length !== 0 ?
            x.replace(',', '.') :
            null;
    }

    function getRValue() {
        let r = rSelect.val();
        return r != null && r.length !== 0 ?
            r.replace(',', '.') :
            null;
    }

    function getYValue() {
        const y = $("input[name='radio']:checked").val();
        return y != null && y.length !== 0 ?
            y.replace(',', '.') :
            null;
    }

    function drawDot(xValue, yValue, rValue, result, centreY, centreX) {
        if (xValue == null || yValue == null) return;
        const y = centreY - yValue * 100 / rValue;
        const x = centreX + xValue * 100 / rValue;

        const dot = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
        dot.attr({
            cx: x,
            cy: y,
            r: 3
        }).add('circle')
        dot.addClass(result)
        graphSVG.append(dot)
    }

    function redrawDot() {

        $('#result-table tr').each(function (row) {
            let list = []
            $(this).find('td').each(function (cell) {
                list.push($(this).html())
            });
            // TODO из массива достать числа и добавить в график . Для этого нужно вычилсить координаты
            let x = list[0];
            let y = list[1];
            let r = list[2];
            let result = list[3];

            drawDot(x, y, r, result, 150, 150)

        })
    }


    redrawDot();

})

