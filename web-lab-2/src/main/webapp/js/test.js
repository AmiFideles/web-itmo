/*
    $('table tr').each(function(row){
        $(this).find('td').each(function(cell){
            console.log('Строка ' + row + ', ячейка ' + cell + ', значение: ' + $(this).html());
        });
    });*/
let $svg = $("svg");

function drawDot(xValue, yValue, rValue, centreY, centreX) {
    if (xValue == null || yValue == null) return;
    const y = centreY - yValue * 100 / rValue;
    const x = centreX + xValue * 100 / rValue;

    const dot = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
    dot.attr({
        cx: x,
        cy: y,
        r: 2
    }).add('circle')

    dot.css("stroke: red")

    $svg.append(dot)

}

$('.submit').click((event) => {
    event.preventDefault();
    let r = $("input[type='radio'].radioBtn:checked").val()
    let x = $('.buttonX').val();
    let y = $('.buttonY').val();
    console.log(x)
    console.log(y)
    console.log(r)
    $.ajax({
        url: "dispatcher",
        type: "POST",
        data: "x=" + x + "&y=" + y + "&r=" + r,
        success: function (data) {
            console.log(data)
            let element = JSON.parse(data)
            let newRow;
            newRow = '<tr>';
            newRow += '<td>' + element.xValue + '</td>';
            newRow += '<td>' + element.yValue + '</td>';
            newRow += '<td>' + element.rValue + '</td>';
            newRow += '<td>' + element.result + '</td>';
            let test = $.parseHTML(newRow);
            $(".table").append(test);
            redrawDot()
        },
        error: function (xhr, status, error) {
            alert(xhr.responseText);
        }
    });
})

$('.clearr').click(() => {
    $.ajax(
        {
            url: "dispatcher",
            method: "POST",
            data: "clear=true",
            success: function () {
                console.log("ща будем удалять")
                $(".table tbody > tr ").remove();
                $("svg  circle").remove()
            },
            error: function (xhr, status, error) {
                alert(xhr.responseText);
            }
        })
})

function redrawDot() {

    $('table tr').each(function (row) {
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

        drawDot(x, y, r, 150, 150)

    })
}

redrawDot()