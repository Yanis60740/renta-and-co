<?php 
include 'functions.php';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nom = $_POST['input-nom-fournisseur'];
    if (($nom == NULL)){
        // header('Location: index.html');
    }
    else{
                // Récupérer les données
        $query = "INSERT INTO fournisseur (nom) VALUES (:nom)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':nom', $nom);
        try {
            $stmt->execute();
            $query = "SELECT nom FROM fournisseur";
            $result = $db->query($query);
            $rows = $result->fetchAll();
            if ($rows === null) {
                echo 'Aucun résultat trouvé.';
            } else {
                foreach ($rows as $row) {
                    echo  '<div class="item-deroulant-fournisseur" value="' . $row['nom'] . '">' . $row['nom'] . '</div>';
                }
            }
    } catch(PDOException $e) {
            $erreur = $e->getMessage();
            
        }
} 
}
?>