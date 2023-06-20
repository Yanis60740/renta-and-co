<?php 
include 'functions.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nom = $_POST['input-nom-famille'];
    $tva = floatval($_POST['input-tva-famille']);
    if (($nom == NULL) or ($tva == NULL)){
        header('Location: matieres-premieres.php');
    }
    else{
                // Récupérer les données
        $query = "INSERT INTO famille (nom, tva) VALUES (:nom, :tva)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':nom', $nom);
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
                    echo '<div class="item-deroulant" value="' . $row['nom'] . '">' . $row['nom'] . '<div class="crayon-rouge" id="crayon-rouge1" ><img src="assets/crayonRouge.svg"></div></div>';
                }
            }
            // header('Location: matieres-premieres.php');
        } catch(PDOException $e) {
            $erreur = $e->getMessage();
            // header('Location: matieres-premieres.php');
        }
} 
}
?>