<?php 
include 'functions.php';
var_dump($_POST);
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nom = $_POST['nom-ingredient'];
    $famille = $_POST['famille-ingredient'];
    $prix = floatval($_POST['prix-ingredient']);
    $poids = $_POST['poids-ingredient'];
    $unite = $_POST['unite-ingredient'];
    $fournisseur = $_POST['fournisseur-ingredient'];

                // Récupérer les données
        $query = "INSERT INTO matieres (ingredient, famille, prix, qte, unite, fournisseur) VALUES (:ingredient, :famille, :prix, :qte, :unite, :fournisseur)";
        $stmt = $db->prepare($query);
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