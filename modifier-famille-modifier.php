<?php
include 'functions.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nom = $_POST['input-nom-famille-modifier'];
    $nom2 = $_POST['input-nom-famille-modifier2'];
    $tva = floatval($_POST['input-tva-famille-modifier']);

    // Mettre à jour les données
    $query = "UPDATE famille SET nom=:nom, tva=:tva WHERE nom=:nom2";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':nom', $nom);
    $stmt->bindParam(':nom2', $nom2);
    $stmt->bindParam(':tva', $tva);
    try {
        $stmt->execute();
        $succes = "succes";
        $query = "SELECT nom FROM famille";
        $result = $db->query($query);
        $rows = $result->fetchAll();
        if ($rows === null) {
            echo 'Aucun résultat trouvé.';
        } else {
            foreach ($rows as $row) {
                echo '<div class="item-deroulant-modifier" value="' . $row['nom'] . '">' . $row['nom'] . '<div class="crayon-rouge" id="crayon-rouge3" ><img src="assets/crayonRouge.svg"></div></div>';
            }
        }
        // header('Location: matieres-premieres.php');
    } catch(PDOException $e) {
        $erreur = $e->getMessage();
        // header('Location: matieres-premieres.php');
    }
}

?>