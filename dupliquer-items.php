<?php 
include 'functions.php';
var_dump($_POST);
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['dupliquer-button'];
    $query = "INSERT INTO matieres (ingredient, famille, prix, qte, unite, fournisseur) SELECT ingredient, famille, prix, qte, unite, fournisseur FROM matieres WHERE id=:id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id);
    try {
        $stmt->execute();
        header('Location: matieres-premieres.php');
    } catch(PDOException $e) {
        $erreur = $e->getMessage();
        header('Location: matieres-premieres.php');
    }    
}
?>