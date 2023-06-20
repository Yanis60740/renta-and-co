<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
try {
     $db = new PDO('mysql:host=bb1014169-001.eu.clouddb.ovh.net;port=35674;dbname=rentandco', 'admin', 'R3ntAandC02023');
    // $db = new PDO('mysql:host=localhost;dbname=rentandco', 'root', '');
    // Définir le mode d'erreur PDO sur Exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "La connexion à la base de données a échoué : " . $e->getMessage();
}
?>	