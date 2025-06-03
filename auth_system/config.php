<?php
$host = 'localhost';
$db = 'auth_systeme';
$user = 'root';
$pass = '';
$port = '8889';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

$options =[
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOExeption $e) {
    throw new \PDOExecption($e->getMessage(), (int)$e->getCode());
}
?>