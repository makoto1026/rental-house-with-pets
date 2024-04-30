<?php
// track-click.php
header('Content-Type: application/json');

// POSTデータを受け取る
$input = json_decode(file_get_contents('php://input'), true);

// データベースへの接続設定
$host = 'mysql57.petchintai.sakura.ne.jp';  // さくらのサーバーのDBホスト
$username = 'petchintai';  // データベースユーザー名
$password = 'hgx31958';  // データベースパスワード
$dbname = 'petchintai_database';  // データベース名

// データベースへの接続
$conn = new mysqli($host, $username, $password, $dbname);

// 接続チェック
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// データをデータベースに挿入
$buttonId = $conn->real_escape_string($input['buttonId']);
$clickedDate = $conn->real_escape_string($input['clickedDate']);
$sql = "INSERT INTO clicks (button_id, clicked_date) VALUES ('$buttonId', '$clickedDate')";

if ($conn->query($sql) === TRUE) {
    $response = ['status' => 'success', 'message' => 'Record added successfully'];
} else {
    $response = ['status' => 'error', 'message' => 'Error: ' . $sql . ' ' . $conn->error];
}

$conn->close();

// JSON形式でレスポンスを返す
echo json_encode($response);
?>
