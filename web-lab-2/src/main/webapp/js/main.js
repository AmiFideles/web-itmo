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
       // if (validator.validateAllInputValues(graph.xValue, graph.yValue, graph.rValue,xButtons,  yInput, rSelect, xButtons )){
            addHit(graph.xValue, graph.yValue, graph.rValue)
      //  }
    })

    $('#submit').click((event) => {
        event.preventDefault();
        const x = getXValue();
        const y = getYValue();
        const r = getRValue();
        if (!validator.validateAllInputValues(x, y, r, xButtons, yInput, rSelect, xButtons)) return;

        addHit(x, y, r);

    })

    $('#clear').click((event) => {
        console.log($("input[name='radio']:checked").val());
        clearTable();
    })

    $('#reset').click(() => {
        console.log($("input[name='radio']:checked").val());
        xButtons.children(".selected").removeClass("selected");
        graph.resetValues();
        validator.deleteAllErrorMessage(xButtons, yInput, rSelect)
    })

    function addHit(x, y, r) {
        console.log('проверка')
        $.ajax({
            url: 'dispatcher',
            method: 'POST',
            data: "x=" + x + "&y=" + y + "&r=" + r,
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
            error: function (xhr, status, error) {
                alert(xhr.responseText)
            }
        })
    }

    function clearTable() {
        $.ajax({
            url: "dispatcher",
            type: "POST",
            data: "clear=true",
            success: function () {
                console.log("ща будем удалять")
                $("#result-table tbody > tr ").remove();
                $(".true").remove()
                $(".false").remove()
            },
            error: function (xhr, status, error) {
                alert(xhr.responseText)
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
                console.log('Строка ' + row + ', ячейка ' + cell + ', значение: ' + $(this).html());
                list.push($(this).html())
            });
            console.log(list)
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

