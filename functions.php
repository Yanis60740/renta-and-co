<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
try {
     $db = new PDO('', '', '');
    // $db = new PDO('', '', '');
    // Définir le mode d'erreur PDO sur Exception
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "La connexion à la base de données a échoué : " . $e->getMessage();
}
?>	
