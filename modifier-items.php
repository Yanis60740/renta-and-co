<?php
include 'functions.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = $_POST['modifier-form'];
    $nom = $_POST['nom-ingredient'];
    $famille = $_POST['famille-ingredient'];
    $prix = floatval($_POST['prix-ingredient']);
    $poids = $_POST['poids-ingredient'];
    $unite = $_POST['unite-ingredient'];
    $fournisseur = $_POST['fournisseur-ingredient'];

    // Mettre à jour les données
    $query = "UPDATE matieres SET ingredient=:ingredient, famille=:famille, prix=:prix, qte=:qte, unite=:unite, fournisseur=:fournisseur WHERE id=:id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':ingredient', $nom);
    $stmt->bindParam(':famille', $famille);
    $stmt->bindParam(':prix', $prix);
    $stmt->bindParam(':qte', $poids);
    $stmt->bindParam(':unite', $unite);
    $stmt->bindParam(':fournisseur', $fournisseur);
    try {
        $stmt->execute();

        header('Location: matieres-premieres.php');
    } catch(PDOException $e) {
        $erreur = $e->getMessage();
        header('Location: matieres-premieres.php');
    }
}

?>