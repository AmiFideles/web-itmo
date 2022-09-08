<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    sleep(30);
    $offset = $_POST["timezone"];
    $valid = validate($_POST["x"], $_POST["y"], $_POST["r"]);
    $x= 0;
    $y= 0;
    $r= 0;
    if ($valid) {
        $x= (float) $_POST["x"];
        $y= (float) str_replace(",", ".", $_POST["y"]);
        $r= (float) $_POST["r"];
    }


    $is_hit = pointInArea($x, $y, $r);
    $hit_result = $is_hit ? "true" : "false";

    date_default_timezone_set('UTC');
    $current_time = date('Y/m/d H:i:s', time() - $offset*60);
    $execution_time = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 4);

    $data = '{' .
        "\"x\": \"$x\", " .
        "\"y\": \"$y\"," .
        "\"r\": \"$r\", " .
        "\"currentTime\": \"$current_time\", " .
        "\"executionTime\": \"$execution_time\", " .
        "\"hit\": $hit_result" .
        "}";



    if (!isset($_SESSION['results'])) {
        $_SESSION['results'] = array();
    }
    if ($valid) {
        array_push($_SESSION['results'], $data);
        echo "
                <tr >
                    <td>$x</td>
                    <td>$y</td>
                    <td>$r</td>
                    <td>$current_time</td>
                    <td>$execution_time c</td>
                    <td>$hit_result</td>
                </tr>";
    }else{
        http_response_code(400);
        echo 'Не валидные данны';
    }


}

function validate($x, $y, $r)
{
    $MAX_Y = 3;
    $MIN_Y = -5;
    $xs = array(-5, -4, -3, -2, -1, 0, 1, 2, 3);
    $rs = array(1, 1.5, 2, 2.5, 3);
    if (is_numeric($x) && is_numeric(str_replace(",", ".", $y)) && is_numeric($r)) {
        $x = (float)$x;
        $y = (float)str_replace(",", ".", $y);
        $r = (float)$r;
        if ($y >= $MIN_Y && $y <= $MAX_Y && in_array($x, $xs) && in_array($r, $rs)) {
            return true;
        }
    }
    return false;
}

function check_hit_triangle($x, $y, $r)
{
    return $x >= 0 && $y <= 0 && $y >= -$r + 2 * $x;
}

function check_hit_rectangle($x, $y, $r)
{
    return $x <= 0 && $y >= 0 && $x >= -$r && $y <= $r / 2;
}

function check_hit_circle($x, $y, $r)
{
    return $x <= 0 && $y <= 0 && $y >= -sqrt(($r * $r) / 4 - $x * $x);
}

function pointInArea($x, $y, $r) {
    return check_hit_triangle($x, $y, $r) || check_hit_rectangle($x, $y, $r) || check_hit_circle($x, $y, $r);
}
