import {Graph} from "./graph.js";
import {Validator} from "./validator.js";

$(document).ready(function () {
    const xButtons = $('#x-buttons')
    const xButton = $('.x-button');
    const yInput = $('#y-input');
    const rSelect = $('#r-options')
    const graphSVG = $('.svg-graph')


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
        [-5, -4, -3, -2, -1, 0, 1, 2, 3],
        -5,
        3,
        [1, 1.5, 2, 2.5, 3]
    )


    rSelect.change(() => {
        let r = getRValue();
        if (validator.validateR(r)) {
            validator.deleteErrorMessage(rSelect);
            graph.setRValue(r);
        } else {
            graph.setDefaultValueR();
            graph.removeLines();
        }

    })

    yInput.keyup(() => {
        let y = getYValue();
        if (validator.validateY(y)) {
            validator.deleteErrorMessage(yInput);
        }
        graph.setYValue(y)
    })

    xButton.click(function () {
        if (validator.validateX(this.value)) {
            validator.deleteErrorMessage(xButtons)
            if (!$(this).hasClass("selected")) {
                $(this).addClass("selected");
                $(this).siblings("button.selected").removeClass("selected");
                graph.setXValue(Number(this.value));
            }
        }
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
    })


    function addRow(x, y, r) {
        $.ajax({
            url: 'php/index.php',
            method: 'POST',
            timeout: 20000,
            data: "x=" + x + "&y=" + y + "&r=" + r + "&timezone=" + new Date().getTimezoneOffset(),
            success: function (data) {
                let element = $.parseHTML(data);
                $('#result-table').append(element);
                addClassHit(element);
            },
            error: function (jqXHR, exception) {
        /*        if (jqXHR.status === 0) {
                    alert('Not connect. Verify Network.');
                }*/  if (jqXHR.status === 408) {
                    alert('Не удалось получить ответ от сервера. Слишком долгая обработка')
                } else if (jqXHR.status === 400) {
                    alert('Не валидные данные')
                } else if (jqXHR.status === 404) {
                    alert('Requested page not found (404).');
                } else if (jqXHR.status === 500) {
                    alert('Internal Server Error (500).');
                } else if (exception === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    alert('Time out error.');
                } else if (exception === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error. ' + jqXHR.responseText);
                }
            }
        })
    }

    $('#submit').click((event) => {
        event.preventDefault();
        const x = getXValue();
        const y = getYValue();
        const r = getRValue();
        if (!validator.validateAllInputValues(x, y, r, xButtons, yInput, rSelect, xButtons)) return;

        addRow(x, y, r);
    })

    $('#clear').click(() => {
        clearTable();
    })

    $('#reset').click(() => {
        xButtons.children(".selected").removeClass("selected");
        graph.resetValues();
        validator.deleteAllErrorMessage(xButtons, yInput, rSelect)
    })


    function restore() {
        $.ajax({
            url: "php/load.php",
            type: "POST",
            success: function (data) {
                if (typeof data == "string") {
                    console.log(data)
                    data = JSON.parse(data);
                    console.log(data)
                }
                let newRow;
                for (let element of data) {
                    newRow = '<tr>';
                    newRow += '<td>' + element.x + '</td>';
                    newRow += '<td>' + element.y + '</td>';
                    newRow += '<td>' + element.r + '</td>';
                    newRow += '<td>' + element.currentTime + '</td>';
                    newRow += '<td>' + element.executionTime + '</td>';
                    newRow += '<td>' + element.hit + '</td></tr>';
                    let test = $.parseHTML(newRow);
                    addClassHit(test);
                    $('#result-table').append(test);
                }
            }
        });
    }

    function clearTable() {
        $.ajax({
            url: "php/clear.php",
            type: "POST",
            success: function () {
                $("#result-table > tr").remove();
            }
        });
    }

    function addClassHit(element) {
        let result = $(element).find("td:last").text();
        const classResult = result === 'true' ? 'hit' : 'miss';
        $(element).addClass(classResult);
    }

    function getXValue() {
        let x = $('.x-button.selected').val();
        return x != null && x.length !== 0 ?
            x :
            null;
    }

    function getRValue() {
        let r = rSelect.val();
        return r != null && r.length !== 0 ?
            r :
            null;
    }

    function getYValue() {
        const y = yInput.val();
        return y != null && y.length !== 0 ?
            y.replace(',', '.') :
            null;
    }


    restore();

})
