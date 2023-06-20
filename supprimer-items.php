<?php
include 'functions.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['supprimer-box-button'];

    // Mettre à jour les données
    $stmt = $db->prepare("DELETE FROM matieres WHERE id = :id");
    
    $stmt->bindParam(':id', $id);
    try {
        $stmt->execute();
        header('Location: matieres-premieres.php');
    } catch(PDOException $e) {
        $erreur = $e->getMessage();
        echo  json_encode(array('status' => 'error', 'erreur' => $erreur));
    }    
}

?>