<?php
include 'functions.php';
$query = "SELECT nom FROM famille";
$result = $db->query($query);
$rows = $result->fetchAll();
if ($rows === null) {
    echo 'Aucun résultat trouvé.';
} else {
    foreach ($rows as $row) {
        echo  $row['nom'] ;
    }
}
?>