<?php 
include 'functions.php';
var_dump($_POST);
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nom = $_POST['nom'];
    $famille = $_POST['famille'];
    $matiere = $_POST['matiere']; 
    $marge = ($_POST['marge']);  
    $coutmp = floatval($_POST['coutmp']);
    $coutht = floatval($_POST['coutht']);
    $quantiteT = ($_POST['quantiteT']);
    $quantiteP = ($_POST['quantiteP']);
    $charge = ($_POST['charge']);
    $pvht = floatval($_POST['pvht']);
    $tva=floatval($_POST['tva']);
    $pvttc=floatval($_POST['pvttc']);
    $coef=($_POST['coef']);




                // Récupérer les données
        $query = "INSERT INTO recette (nom, famille, marge,coutmp,matiere,coutht, quantiteT,quantiteP,charge, pvht,tva,pvttc,coef) VALUES (:nom, :famille, :marge, :coutmp ,:matiere, :coutht, :quantiteT,:quantiteP,:charge,:pvht,:tva,:pvttc,:coef)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':nom', $nom);
        $stmt->bindParam(':famille', $famille);
        $stmt->bindParam(':matiere', $matiere);
        $stmt->bindParam(':quantiteT', $quantiteT);
        $stmt->bindParam(':quantiteP', $quantiteP);
        $stmt->bindParam(':charge', $charge);
        $stmt->bindParam(':coutht', $coutht);
        $stmt->bindParam(':marge', $marge);
        $stmt->bindParam(':coutmp', $coutmp);
        $stmt->bindParam(':pvht', $pvht);
        $stmt->bindParam(':pvttc', $pvttc);
        $stmt->bindParam(':coef', $coef);

        $stmt->bindValue(':tva', $tva, PDO::PARAM_INT);
     
    
        try {
            $stmt->execute();
        
            header('Location: recette.php');
        } catch(PDOException $e) {
            $erreur = $e->getMessage();
            echo  json_encode(array('status' => 'error', 'erreur' => $erreur));
        }
}

    

?>