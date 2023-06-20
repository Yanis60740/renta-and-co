<?php 
include 'functions.php';

$nom = $_GET["nom"];
$query = "SELECT id FROM famille WHERE nom = :nom";
$stmt = $db->prepare($query);
$stmt->bindParam(':nom', $nom);
$stmt->execute();
$rows = $stmt->fetchAll();
if (count($rows) > 0) {
    $row = $rows[0];
    echo $row["id"];
} else {
    echo "";
}
?>