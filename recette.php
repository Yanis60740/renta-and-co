<!DOCTYPE html>

<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <!-- <meta name="HandheldFriendly" content="true"> -->
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title> Renta & Co</title>
        <link type="text/css" rel="stylesheet" href="style1.css">
    </head>
    <body>
        <main>
            <aside id="aside">
                <div class="box">
                    <a href="index.html"><div  class="titre">Renta & Co</div></a>
                    <div class="user">
                        <a href="">
                            <div class="user-logo"><img src="assets/boulanger.png" style="height: 56px; width: 56px; border-radius: 50%;"></div>
                        </a>
                        <div class="user-box">
                            <a href="">
                                <div class="user-name">La Petite Boulangerie</div>
                            </a>
                            <a href="">
                                <div class="user-info">Modifier mes informations</div>
                            </a>
                        </div>
                    </div>
                    <div class="menu">


                        <a href=""><div class="content">Mon tableaux de bord</div></a>
                        <a href="matieres-premieres.php"><div class="content" >Mes matières premières</div></a>
                        <a href=""><div class="content">Mes préparations</div></a>
                        <a href="recettes.php"><div class="content"style="font-weight: 800;">Mes recettes </div></a>
                        
                    </div>
                </div>
            </aside>
            <div id="box" class="box">
                <div class="box-titre">
                    <div class="titre">Mes Recettes🧑‍🍳 </div>
                    <div class="sous-titre">Ajoutez ici toutes vos recettes, dans les moindres détails ✍🏻 </div>
                    <div class="recherche-box">
                        <input class="recherche" placeholder="Rechercher">
                        
                    </div>
                </div>
                <a href="#" id="button-add" class="add-mat">Créer ma recette<div class="add-mat-plus"><span class="cross"></span></div></a> 
                <table id="table-mat" class="table-mat">
                    <thead>
                        <tr>
                            <th>Famille Produit</th>
                            <th>Nom recette</th>
                            <th>Marge brut</th>
                            <th>Coût MP au Kg</th>
                            <th>Date création</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            include 'functions.php';
                            $query = "SELECT * FROM recette";
                            $result = $db->query($query);
                            $rows = $result->fetchAll();


                            if ($rows === null) {
                                
                            } else {
                                foreach ($rows as $row) {
                            
                            
                        ?>
                        <tr>
                            <th><?php echo $row['famille']; ?></th>
                            <th><?php echo $row['nom']; ?></th>
                            <th><?php echo number_format(($row['marge']), 3)."%"; ?></th>
                            <th><?php echo number_format($row['coutmp'], 3); ?></th>
                          
                            <th>
                                <a href="#" id="modifier-link" class="modifier-link" data-id="<?php echo $row['id']; ?>"><img src="assets/btnModifier.svg"></a>
                                <div class="modifier-box" id="modifier-box-<?php echo $row['id']; ?>" data-id="<?php echo $row['id'];  ?>">
                                    <div id="modifier-button" class="modifier-button" data-id="<?php echo $row['id']; ?>">Modifier <img src="assets/crayon.svg" style="margin-left:26px;"></div>
                                    <form id="dupliquer-form" action="dupliquer-items.php" method="post"> 
                                        <button type="submit" id="dupliquer-button" name="dupliquer-button" class="dupliquer-button" value="<?php echo $row['id']; ?>">Dupliquer </button>
                                    </form>
                                    <div id="supprimer-button" class="supprimer-button" data-id="<?php echo $row['id']; ?>">Supprimer <img src="assets/poubelle.svg" style="margin-left:13px;"></div>
                                </div>
                            </th>
                        </tr>
                        <?php }} ?>
                    </tbody>
                </table>
                <div class="notif" id="notif"></div>
            </div>
            
            <div id="add-item" class="add-item">
                <div class="box-titre">
                    <div class="titre">Mes Recettes🧑‍🍳   </div>
                    <div class="sous-titre">Ajouter tous les éléments de votre recette en remplissant le formulaire ci-dessous 📝</div>
                    <a href="" id="precedent" class="precedent"><img src="assets/arrow-left-gray.png"> <span style="margin-left: 10px;">Précédent</span></a>
            
                </div>
                <div class="main-box">
                    <form id="form-add" action="add-items-recette.php" method="post">
                        <div class="box-items">Nom de votre recette<input class="item-input" name="nom" placeholder="Nom de la recette"></div>
                        <div class="menu-deroulant" id="menu-deroulant">
                            <div class="box-items">Famille Produit
                                <input class="item-input" id="famille" name="famille" placeholder="Famille produit" >
                                
                                
                            </div>
                            <div class="box-items" id="liste-matieres">Mes matières premières
                               
                                    <input class="item-input-m" id="matiere" name="matiere" placeholder="Ajouter une matière première" readonly >
                                    <div class="menu-famille" id="menu-famille">
                                <?php
                                            include 'functions.php';
                                            $query = "SELECT * FROM matieres";
                                            $result = $db->query($query);
                                            $rows = $result->fetchAll();
                                            if ($rows === null) {

                                            } else {
                                                foreach ($rows as $row) {
                                        ?>
                                        <div class="ligne" >
                                            <div class="ligne-container" >
                                                <div class="bulle"><?php echo $row['ingredient']; ?></div>
                                                </div>
                                            <div class="ligne-titre1" > Quantité
                                                <div class="ligne-container" >
                                                <div class="bulle"><?php echo $row['qte']; ?></div>
                                                </div>
                                            </div>
                                            <div class="ligne-titre2" > Total HT
                                                <div class="ligne-container" >
                                                <div class="bulle"> <?php echo ($row['prix']) * ($row['qte']); ?></div>
                                                </div>
                                            </div>
                                            <div class="ligne-titre3" >
                                                <div class="ligne-container" >
                                                <div class="bulle"> <?php echo "PROPORTION"; ?></div>
                                                </div>
                                            </div>
                                        </div>
                                        <?php }} ?>
                                    

                                </div>
                                    
                            </div> 
                            
                        </div>
                        <div class="box-items">Coût Total NOM RECETTE <input type="number" id="coutht" class="item-input" name="coutht" placeholder="Prix recette HT €" step="0.001"></div>
                        <div class="box-items">Quantité totale fabriquée <input type="number" id="quantiteT" class="item-input" name="quantiteT" placeholder="KG" ></div>
                        <div class="box-items">Quantité perte<input type="number" id="quantiteP" class="item-input" name="quantiteP" placeholder="%"></div>
                        <div class="box-items">Charges entreprises<input type="number"class="item-input" name="charge" placeholder="%"></div>
                        <div class="box-items" style="height: 116px;">Coût MP/Unités ou KG<br>
                         <input type="number" id="coutmp" class="item-input" name="coutmp" ></div>
                        <div class="box-items">Prix de vente HT<input type="number" class="item-input" name="pvht" placeholder="Prix de vente"></div>
                        <div class="box-items" style="height: 116px;">TVA %<br>
                            <span>Ce chiffre a été enregistré automatiquement lors de la saisie de la famille produit.</span><input type="number" class="item-input" name="tva" placeholder="TVA %" step="0.001"></div>
                            <div class="box-items">Prix de vente TTC<input type="number" id="pvttc" class="item-input" name="pvttc" placeholder=""></div>
                            <div class="box-items">Marge Brut <input type="number"class="item-input" name="marge" placeholder="%"></div>
                            <div class="box-items">Coefficient <input type="number"class="item-input" name="coef" placeholder=""></div>
                            <button type="submit" class="add-items-button">Ajouter ma fiche produit</button>
                        </div>
                    </form>
                </div>
            </div>

            
            
        </main>
        
    </body>
</html>	
<script src="script2.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
				