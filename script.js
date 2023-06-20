// window.onload = function() {
//   var hauteurEcran = window.innerHeight;
//   var tableHeight = document.getElementById("table-mat").offsetHeight; // récupère la hauteur du tableau
//   var asideHeight = document.getElementById("aside").offsetHeight;
//   if(asideHeight<hauteurEcran){
//     document.getElementById("aside").style.height = 100 + "vh"; // applique la hauteur de la table à la div
//   }else{
//     document.getElementById("aside").style.height = asideHeight + "px"; // applique la hauteur de la table à la div
//   }
// }

// Affichage du message lors d'une action

if (localStorage.getItem('message') !== null) {
  var monElement = document.getElementById("notif");
  monElement.innerText = localStorage.getItem('message');
  monElement.style.display = "flex";
  localStorage.removeItem('message'); // Supprimer le message du localStorage
}

const addForm = document.querySelector('#form-add');
const modifierForm = document.querySelector('#form-modifier');
const supprimerForm = document.querySelector('#supprimer-form');
const dupliquerForm = document.querySelectorAll('#dupliquer-form');

addForm.addEventListener('submit', function(event) {
  localStorage.setItem('message', "Votre ingrédient a bien été ajouté !");
});
modifierForm.addEventListener('submit', function(event) {
  localStorage.setItem('message', "Votre ingrédient a bien été modifié !");
});
supprimerForm.addEventListener('submit', function(event) {
  localStorage.setItem('message', "Votre ingrédient a bien été supprimé !");
});
dupliquerForm.forEach(function(item) {
  item.addEventListener('submit', function(event) {
    localStorage.setItem('message', "Votre ingrédient a bien été dupliqué !");
  });
});

// Gestion de l'affichage de la pop-up lorsque l'on clique sur les 3 petits points

const modifierLinks = document.querySelectorAll('a.modifier-link');
console.log("modifierBox : ", modifierLinks);
// Ajouter un événement click sur chaque élément
modifierLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    
    // Récupérer l'élément DOM de la ligne sur laquelle le lien a été cliqué
    const row = link.closest('tr');
    
    // Récupérer l'ID stocké dans l'attribut "data-id"
    const id = link.dataset.id;
    
    // Sélectionner le bloc de modification approprié en fonction de l'ID
    const modifierBox = document.querySelector(`#modifier-box-${id}`);
    const modifierBoxAll = document.querySelectorAll(`.modifier-box`);
    // Afficher le bloc de modification
    if (modifierBox.classList.contains('active')) {
      // Si la boîte de modification est déjà active, la désactiver
      modifierBox.classList.remove('active');
    } else {
      // Sinon, l'activer
      modifierBoxAll.forEach(element => {
        if(element.classList.contains('active')){
          console.log("elemnt : ", element.classList.contains('active'));
          element.classList.remove('active');
        }
      });
      modifierBox.classList.add('active');
    }
  });  
});



const modifierFormButton = document.querySelector('#modifier-form');
var id = "0";
// Attribution des valeurs par défaut lors de la modification d'un item

$(document).on("click", "#modifier-button", function() {

  // Récupérer les valeurs des colonnes correspondantes de la ligne sélectionnée
  var ingredient = $(this).closest("tr").find("th:nth-child(1)").text();
  var famille = $(this).closest("tr").find("th:nth-child(2)").text();
  var prix = $(this).closest("tr").find("th:nth-child(7)").text();
  var tva = $(this).closest("tr").find("th:nth-child(4)").text();
  tva = tva.trim().replace(/,/g, ".");
  tva = tva.trim().replace(/%/g, "");
  console.log("tva : ", tva);
  var poids = $(this).closest("tr").find("th:nth-child(5)").text();
  var unite = $(this).closest("tr").find("th:nth-child(6)").text();
  var fournisseur = $(this).closest("tr").find("th:nth-child(8)").text();
  console.log("fournisseur : ", fournisseur);
  id = $(this).data('id');
  modifierFormButton.value = $(this).data('id');
  

  // Insérer les valeurs récupérées comme placeholders pour les champs du formulaire
  $("#modifier-item input[name=nom-ingredient]").attr("value", ingredient);
  $("#modifier-item input[name=famille-ingredient]").attr("value", famille);
  $("#modifier-item input[name=prix-ingredient]").attr("value", prix);
  $("#modifier-item input[name=tva-ingredient-modifier]").attr("value", tva);
  $("#modifier-item input[name=poids-ingredient]").attr("value", poids);
  $("#modifier-item input[name=unite-ingredient]").attr("value", unite);
  $("#modifier-item input[name=prix-unite-ingredient]").attr("value", (prix/poids));
  $("#modifier-item input[name=fournisseur-ingredient]").attr("value", fournisseur);

  openModifier();
});

// Ouverture de la box contenant les boutons modifier-dupliquer-supprimer

var modifierItem = document.getElementById("modifier-item");
var box = document.getElementById("box");
var modifierBtn = document.getElementById("modifier-button");
var closeModifierBtn = document.getElementById("modifier-precedent");

function openModifier() {
  modifierItem.classList.add("active");
  box.classList.add("active");
  aside.style.height = 1200 + "px";
}

function closeModifier() {
  modifierItem.classList.remove("active");
  box.classList.remove("active");
}

// Ouverture de la partie "modifier"

var add = document.getElementById("add-item");
var box = document.getElementById("box");
var addBtn = document.getElementById("button-add");
var closeBtn = document.getElementById("precedent");
var aside = document.getElementById("aside");

if (add && addBtn && closeBtn && aside) {
  addBtn.onclick = openAdd;
  closeBtn.onclick = closeAdd;
} else {
  console.error("One or more elements not found.");
}

function openAdd() {
  add.classList.add("active");
  box.classList.add("active");
  aside.style.height = 1200 + "px";
}

function closeAdd() {
  add.classList.remove("active");
  box.classList.remove("active");
}

// Calcul automatique du prix à l'unité dans la création d'une matière

var prix = document.getElementById("prix-ingredient");
var poids= document.getElementById("poids");
prix.addEventListener("input", prixHTU);
poids.addEventListener("input", prixHTU);

function prixHTU() {
   var prixValue = parseFloat(prix.value) || 0;
   var poidsValue= parseFloat(poids.value) || 0;
   if (!isNaN(prixValue) && !isNaN(poidsValue)) {
      var prixHTUValue= prixValue / poidsValue;
      document.getElementById("prixHTU").value = prixHTUValue;
   } else {
      document.getElementById("prixHTU").value = "";
   }   
}

// Calcul automatique du prix à l'unité dans la modification d'une matière

var prix2 = document.getElementById("prix-ingredient2");
var poids2= document.getElementById("poids2");
prix2.addEventListener("input", prixHTU2);
poids2.addEventListener("input", prixHTU2);

function prixHTU2() {
   var prixValue = parseFloat(prix2.value) || 0;
   var poidsValue= parseFloat(poids2.value) || 0;
   if (!isNaN(prixValue) && !isNaN(poidsValue)) {
      var prixHTUValue= prixValue / poidsValue;
      document.getElementById("prixHTU2").value = prixHTUValue;
   } else {
      document.getElementById("prixHTU2").value = "";
   }   
}

// Calcul automatique de la tva selon la famille (ajouter)

const familleInput = document.getElementById("famille-ingredient");
var menuItems = document.querySelectorAll(".item-deroulant");
const attributInput = document.getElementById("tva-ingredient");

menuItems.forEach(function(item) {
  item.addEventListener("click", function() {
    // Mettre à jour la valeur de l'input avec la valeur du div cliqué
    familleInput.value = item.textContent.trim();
    console.log("familleInput.value : ", familleInput.value);
    if (familleInput.value !== "") {
      console.log("familleInput.value : ", familleInput.value);
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "tva-famille.php?nom=" + familleInput.value);
      xhr.onload = function() {
        // Fill the attribute input with the returned value
        attributInput.value = parseFloat(xhr.responseText.trim());
      };
      xhr.send();
    } else {
      attributInput.value = "";
    }
  });
});

// Calcul automatique de la tva selon la famille (modifier)

const familleInputModifier = document.getElementById("famille-ingredient-modifier");
const menuItemsModifier = document.querySelectorAll(".item-deroulant-modifier");
const attributInputModifier = document.getElementById("tva-ingredient-modifier");

menuItemsModifier.forEach(function(item) {
  item.addEventListener("click", function() {
    // Mettre à jour la valeur de l'input avec la valeur du div cliqué
    familleInputModifier.value = item.textContent;
    console.log("familleInputModifier.value : ", familleInputModifier.value);
    if (familleInputModifier.value !== "") {
      console.log("familleInputModifier.value : ", familleInputModifier.value);
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "tva-famille.php?nom=" + familleInputModifier.value);
      xhr.onload = function() {
        // Fill the attribute input with the returned value
        attributInputModifier.value = parseFloat(xhr.responseText.trim());
        console.log("attributInputModifier.value : ", attributInputModifier.value);
      };
      xhr.send();
    } else {
      attributInputModifier.value = "";
    }
  });
});

// Affichage de la pop-up de suppresion

$(document).on("click", "#supprimer-button", function() {
  const supprimerBtn = document.querySelector('#supprimer-box-button');
  supprimerBtn.value = $(this).data('id');
  openSupp();
});

var openSupprimerBtn = document.querySelector('.supprimer-button');
var modifierBox = document.querySelectorAll(`.modifier-box`);
var supprimerContainer = document.querySelector('.supprimer-box');
var closePopupButton = document.querySelector('.close-supprimer');

if (openSupprimerBtn && modifierBox && supprimerContainer && closePopupButton) {
  openSupprimerBtn.onclick = openSupp;
  closePopupButton.onclick = closeSupp;
}

function openSupp() {
  supprimerContainer.classList.add("active");
  modifierBox.forEach(element => {
    if(element.classList.contains('active')){
      console.log("elemnt : ", element.classList.contains('active'));
      element.classList.remove('active');
    }
  });
  aside.style.height = 1200 + "px";
}

function closeSupp() {
  supprimerContainer.classList.remove("active");
  modifierBox.classList.remove("active");
}

// Affichage de la pop-up de d'ajout de famille (ajouter)

$(document).on("click", "#add-famille", function() {
  openFam();
});

var openFamilleBtn = document.querySelectorAll('.add-famille');
var familleContainer = document.querySelector('.famille-box');
var closeFamilleButton = document.querySelector('.close-famille');
var check = document.querySelector('.check');

if (openFamilleBtn && familleContainer && closeFamilleButton) {
  openFamilleBtn.forEach(function(row) {
    row.onclick = openFam;
  });
  closeFamilleButton.onclick = closeFam;
}

function openFam() {
  familleContainer.classList.add("active");
}

function closeFam() {
  var monElementFamille = document.getElementById("notif-famille");
  var checkFamille = document.getElementById("check-famille");
  monElementFamille.style.display = "none";
  checkFamille.style.display = "none";

  check.classList.remove('active');
  familleContainer.classList.remove("active");
}

// Affichage de la pop-up de d'ajout de famille (modifier)

$(document).on("click", "#add-famille", function() {
  openFam();
});

var openFamilleBtnModifier = document.querySelectorAll('.add-famille-modifier');
var familleContainerModifier = document.querySelector('.famille-box-modifier');
var closeFamilleButtonModifier = document.querySelector('.close-famille-modifier');
var check = document.querySelector('.check');

if (openFamilleBtnModifier && familleContainerModifier && closeFamilleButtonModifier) {
  openFamilleBtnModifier.forEach(function(row) {
    row.onclick = openFam;
  });
  closeFamilleButtonModifier.onclick = closeFam;
}

function openFam() {
  familleContainerModifier.classList.add("active");
}

function closeFam() {
  var monElementFamille = document.getElementById("notif-famille-modifier");
  var checkFamille = document.getElementById("check-famille-modifier");
  monElementFamille.style.display = "none";
  checkFamille.style.display = "none";

  check.classList.remove('active');
  familleContainerModifier.classList.remove("active");
}

// Affichage de la pop-up de de modification de famille (ajouter)

var openFamilleBtnModifier1 = document.querySelectorAll('#crayon-rouge1');
var familleContainerModifier1 = document.querySelector('.famille-box-modifier-ajouter');
var closeFamilleButtonModifier = document.querySelectorAll('.close-famille-modifier');
var check1 = document.querySelector('.check');

// if (openFamilleBtnModifier && familleContainerModifier && closeFamilleButtonModifier) {
//   openFamilleBtnModifier.forEach(function(row) {
//     row.onclick = openFamModifier;
//   });
//   closeFamilleButtonModifier.onclick = closeFamModifier;
// }
closeFamilleButtonModifier.forEach(function(row) {
  row.onclick = closeFamModifier;
});

function openFamModifier() {
  familleContainerModifier1.classList.add("active");
}

function closeFamModifier() {
  check.classList.remove('active');
  familleContainerModifier1.classList.remove("active");
}

// Affichage de la pop-up de de modification de famille (modifier)

var openFamilleBtnModifier = document.querySelectorAll('#crayon-rouge3');
var familleContainerModifier3 = document.querySelector('.famille-box-modifier-modifier');
var check = document.querySelector('.check');

// if (openFamilleBtnModifier && familleContainerModifier && closeFamilleButtonModifier) {
//   openFamilleBtnModifier.forEach(function(row) {
//     row.onclick = openFamModifier;
//   });
//   closeFamilleButtonModifier.onclick = closeFamModifier;
// }
closeFamilleButtonModifier.forEach(function(row) {
  row.onclick = closeFamModifier;
});

function openFamModifier() {
  familleContainerModifier3.classList.add("active");
}

function closeFamModifier() {
  check.classList.remove('active');
  var monElementFamille = document.getElementById("notif-famille-modifier-modifier");
  var checkFamille = document.getElementById("check-famille-modifier-modifier");
  monElementFamille.style.display = "none";
  checkFamille.style.display = "none";
  familleContainerModifier3.classList.remove("active");
}

// Affichage de la pop-up de d'ajout de fournisseur

var openFournisseurBtn = document.querySelectorAll('.add-fournisseur');
var fournisseurContainer = document.querySelector('.fournisseur-box');
var closeFournisseurButton = document.querySelector('.close-fournisseur');

$(document).on("click", "#add-fournisseur", function() {
  openFournisseur();
});

if (openFournisseurBtn && fournisseurContainer && closeFournisseurButton) {
  openFournisseurBtn.forEach(function(row) {
    row.onclick = openFournisseur;
  });
  closeFournisseurButton.onclick = closeFournisseur;
}

function openFournisseur() {
  fournisseurContainer.classList.add("active");
}

function closeFournisseur() {
  var monElementFournisseur = document.getElementById("notif-fournisseur");
  var checkFournisseur = document.getElementById("check-fournisseur");
  monElementFournisseur.style.display = "none";
  checkFournisseur.style.display = "none";
  fournisseurContainer.classList.remove("active");
}

// Affichage de la pop-up de de modification de fournisseur

// var openFamilleBtnModifier = document.querySelectorAll('#crayon-rouge-fournisseur');
// var fournisseurContainerModifier = document.querySelector('#fournisseur-box-modifier');
// var closeFournisseurButtonModifier = document.querySelector('#close-fournisseur-modifier');

// if (openFamilleBtnModifier && fournisseurContainerModifier && closeFournisseurButtonModifier) {
//   openFamilleBtnModifier.forEach(function(row) {
//     row.onclick = openFournisseurModifier;
//   });
//   closeFournisseurButtonModifier.onclick = closeFournisseurModifier;
// }

// function openFournisseurModifier() {
//   fournisseurContainerModifier.classList.add("active");
// }

// function closeFournisseurModifier() {
//   fournisseurContainerModifier.classList.remove("active");
// }

// Mise en place des décimales dans le tableau

var cells = document.querySelectorAll('table td:nth-child(3) td:nth-child(4)');

for (var i = 0; i < cells.length; i++) {
  var value = parseFloat(cells[i].textContent);
  if (!isNaN(value)) {
    cells[i].textContent = value.toFixed(3);
  }
}

// Affichage du menu déroulant lors du clique sur la famille (ajout)

const input = document.getElementById("famille-ingredient");
const dropdown = document.getElementById("menu-famille");
const rechercheFamilleAjouter = document.getElementById("famille-recherche-ajouter");
document.querySelector('.menu-deroulant').addEventListener('click', function(event) {
    if (event.target.classList.contains('item-deroulant')) {
          input.value = event.target.textContent;
          console.log("input.value : ", event.target.value, event.target.textContent);
        }
    // Code à exécuter si l'utilisateur a cliqué sur la flèche
    if (dropdown.classList.contains('active')) {
      dropdown.classList.remove("active");
      rechercheFamilleAjouter.classList.remove("active");
      // Si la boîte de modification est déjà active, la désactiver
      dropdown.classList.remove("active");
    } else {
      rechercheFamilleAjouter.classList.add("active");
      dropdown.classList.add("active");
    }
    event.stopPropagation();
});

rechercheFamilleAjouter.addEventListener('click', function(event) {
  // Empêcher la propagation de l'événement au parent (menu déroulant)
  event.stopPropagation();
});

// Affichage du menu déroulant lors du clique sur la famille (modification)

const inputModifier = document.getElementById("famille-ingredient-modifier");
const dropdownModifier = document.getElementById("menu-famille-modifier");
const rechercheFamilleModifier = document.getElementById("famille-recherche-modifier");

document.querySelector('.menu-deroulant-modifier').addEventListener('click', function(event) {
    if (event.target.classList.contains('item-deroulant-modifier')) {
      inputModifier.value = event.target.textContent;
        }
    // Code à exécuter si l'utilisateur a cliqué sur la flèche
    if (dropdownModifier.classList.contains('active')) {
      // Si la boîte de modification est déjà active, la désactiver
      dropdownModifier.classList.remove("active");
      rechercheFamilleModifier.classList.remove("active");
    } else {
      rechercheFamilleModifier.classList.add("active");
      dropdownModifier.classList.add("active");
    }
    event.stopPropagation();
});

rechercheFamilleModifier.addEventListener('click', function(event) {
  // Empêcher la propagation de l'événement au parent (menu déroulant)
  event.stopPropagation();
});

// Affichage du menu déroulant lors du clique sur Unité (ajouter)

const uniteAjouter = document.getElementById("unite-ingredient");
const dropUniteAjouter = document.getElementById("menu-unite");

document.querySelector('.menu-deroulant-unite').addEventListener('click', function(event) {
    if (event.target.classList.contains('item-deroulant-unite')) {
      uniteAjouter.value = event.target.textContent;
        }
    // Code à exécuter si l'utilisateur a cliqué sur la flèche
    if (dropUniteAjouter.classList.contains('active')) {
      dropUniteAjouter.addEventListener('click', function(event) {
        
      });
      // Si la boîte de modification est déjà active, la désactiver
      dropUniteAjouter.classList.remove("active");
    } else {

      dropUniteAjouter.classList.add("active");
    }
});

// Affichage du menu déroulant lors du clique sur Unité (modification)

const uniteModifier = document.getElementById("unite-ingredient-modifier");
const dropUniteModifier = document.getElementById("menu-unite-modifier");

document.querySelector('.menu-deroulant-unite-modifier').addEventListener('click', function(event) {
    if (event.target.classList.contains('item-deroulant-unite-modifier')) {
      uniteModifier.value = event.target.textContent;
        }
    // Code à exécuter si l'utilisateur a cliqué sur la flèche
    if (dropUniteModifier.classList.contains('active')) {
      dropUniteModifier.addEventListener('click', function(event) {
      });
      // Si la boîte de modification est déjà active, la désactiver
      dropUniteModifier.classList.remove("active");
    } else {
      dropUniteModifier.classList.add("active");
    }
});

// Affichage du menu déroulant lors du clique sur le fournisseur (ajouter)

const fournisseurAjouter = document.getElementById("fournisseur-ingredient");
const dropFournisseurAjouter = document.getElementById("menu-fournisseur");
const rechercheFournisseurAjouter = document.getElementById("fournisseur-recherche-ajouter");
document.querySelector('.menu-deroulant-fournisseur').addEventListener('click', function(event) {
    if (event.target.classList.contains('item-deroulant-fournisseur')) {
      fournisseurAjouter.value = event.target.textContent;
        }
    // Code à exécuter si l'utilisateur a cliqué sur la flèche
    if (dropFournisseurAjouter.classList.contains('active')) {
      dropFournisseurAjouter.classList.remove("active");
      rechercheFournisseurAjouter.classList.remove("active");
      // Si la boîte de modification est déjà active, la désactiver
      dropFournisseurAjouter.classList.remove("active");
    } else {
      rechercheFournisseurAjouter.classList.add("active");
      dropFournisseurAjouter.classList.add("active");
    }
    event.stopPropagation();
});

rechercheFournisseurAjouter.addEventListener('click', function(event) {
  // Empêcher la propagation de l'événement au parent (menu déroulant)
  event.stopPropagation();
});


// Affichage du menu déroulant lors du clique sur le fournisseur (modification)

const fournisseurModifier = document.getElementById("fournisseur-ingredient-modifier");
const dropFournisseurModifier = document.getElementById("menu-fournisseur-modifier");
const rechercheFournisseurModifier = document.getElementById("item-deroulant-rechercher-fournisseur-modifier");
document.querySelector('.menu-deroulant-fournisseur-modifier').addEventListener('click', function(event) {
    if (event.target.classList.contains('item-deroulant-fournisseur-modifier')) {
      fournisseurModifier.value = event.target.textContent;
        }
    // Code à exécuter si l'utilisateur a cliqué sur la flèche
    if (dropFournisseurModifier.classList.contains('active')) {
      dropFournisseurModifier.classList.remove("active");
      rechercheFournisseurModifier.classList.remove("active");
      // Si la boîte de modification est déjà active, la désactiver
      dropFournisseurModifier.classList.remove("active");
    } else {
      rechercheFournisseurModifier.classList.add("active");
      dropFournisseurModifier.classList.add("active");
    }
    event.stopPropagation();
  });
  
  rechercheFournisseurModifier.addEventListener('click', function(event) {
    // Empêcher la propagation de l'événement au parent (menu déroulant)
    event.stopPropagation();
  });

// Gestion de la recherche dans le tableau

const searchBoxTableau = document.querySelector(".recherche");
const dropdownItemsTableau = document.querySelectorAll("tbody tr");

searchBoxTableau.addEventListener('keyup', function() {
  const searchTerm = searchBoxTableau.value.toLowerCase();
  dropdownItemsTableau.forEach(function(row) {
    const firstTwoCellsText = row.querySelectorAll('th:nth-of-type(1), th:nth-of-type(2)');
    let found = false;
    firstTwoCellsText.forEach(function(cell) {
      if (cell.textContent.toLowerCase().indexOf(searchTerm) > -1) {
        found = true;
      }
    });
    if (found) {
      row.classList.remove('hide');
    } else {
      row.classList.add('hide');
    }
  });
});



// Gestion de la recherche dans la famille (ajouter)

const searchBoxAjouterFamille = document.querySelector('.item-deroulant-rechercher-famille-ajouter');
const dropdownItemsAjouterFamille = document.querySelectorAll('.item-deroulant');

searchBoxAjouterFamille.addEventListener('keyup', function() {
  const searchTerm = searchBoxAjouterFamille.value.toLowerCase();
  console.log("searchTerm : ", searchTerm);
  dropdownItemsAjouterFamille.forEach(function(item) {
    const itemText = item.textContent.toLowerCase();
    console.log("itemText : ", itemText);
    if (itemText.indexOf(searchTerm) > -1) {
      item.classList.remove('hide');
      console.log("item : ", item);
    } else {
      item.classList.add('hide');
    }
  });
});

// Gestion de la recherche dans la famille (modifier)

const searchBoxModifierFamille = document.querySelector('.item-deroulant-rechercher-famille-modifier');
const dropdownItemsModifierFamille = document.querySelectorAll('.item-deroulant-modifier');

searchBoxModifierFamille.addEventListener('keyup', function() {
  const searchTerm = searchBoxModifierFamille.value.toLowerCase();
  dropdownItemsModifierFamille.forEach(function(item) {
    const itemText = item.textContent.toLowerCase();
    if (itemText.indexOf(searchTerm) > -1) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
});

// Gestion de la recherche dans les fournisseur (ajouter)

const searchBoxAjouterFournisseur = document.querySelector('.item-deroulant-rechercher-fournisseur-ajouter');
const dropdownItemsAjouterFournisseur = document.querySelectorAll('.item-deroulant-fournisseur');

searchBoxAjouterFournisseur.addEventListener('keyup', function() {
  const searchTerm = searchBoxAjouterFournisseur.value.toLowerCase();
  dropdownItemsAjouterFournisseur.forEach(function(item) {
    const itemText = item.textContent.toLowerCase();
    if (itemText.indexOf(searchTerm) > -1) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
});

// Gestion de la recherche dans les fournisseur (modifier)

const searchBoxModifierFournisseur = document.querySelector('.item-deroulant-rechercher-fournisseur-modifier');
const dropdownItemsModifierFournisseur = document.querySelectorAll('.item-deroulant-fournisseur-modifier');

searchBoxModifierFournisseur.addEventListener('keyup', function() {
  const searchTerm = searchBoxModifierFournisseur.value.toLowerCase();
  dropdownItemsModifierFournisseur.forEach(function(item) {
    const itemText = item.textContent.toLowerCase();
    if (itemText.indexOf(searchTerm) > -1) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
});

// Calculer la hauteur totale des éléments affichés


$(document).ready(function() {
  $('#famille-form').submit(function(event) {
    // Empêcher la soumission du formulaire classique
    event.preventDefault();
    // Récupérer les données du formulaire
    var formData = $(this).serialize();
      // Si la boîte de modification est déjà active, la désactiver
      $.ajax({
        url: 'add-famille-ajouter.php',
        method: 'POST',
        data: formData,
        success: function(response) {
          var monElementFamille = document.getElementById("notif-famille");
          var checkFamille = document.getElementById("check-famille");
          monElementFamille.innerText = "Votre famille a bien été ajouté !";
          monElementFamille.style.display = "flex";
          checkFamille.style.display = "flex";
          
          $('#ajax-famille-ajouter').html(response);
          const familleInput = document.getElementById("famille-ingredient");
          var menuItems = document.querySelectorAll(".item-deroulant");
          const attributInput = document.getElementById("tva-ingredient");

          menuItems.forEach(function(item) {
            item.addEventListener("click", function() {
              // Mettre à jour la valeur de l'input avec la valeur du div cliqué
              familleInput.value = item.textContent.trim();
              console.log("familleInput.value : ", familleInput.value);
              if (familleInput.value !== "") {
                console.log("familleInput.value : ", familleInput.value);
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "tva-famille.php?nom=" + familleInput.value);
                xhr.onload = function() {
                  // Fill the attribute input with the returned value
                  attributInput.value = parseFloat(xhr.responseText.trim());
                };
                xhr.send();
              } else {
                attributInput.value = "";
              }
            });
          });

          // Gestion de la recherche dans la famille (ajouter)

          const searchBoxAjouterFamille = document.querySelector('.item-deroulant-rechercher-famille-ajouter');
          const dropdownItemsAjouterFamille = document.querySelectorAll('.item-deroulant');

          searchBoxAjouterFamille.addEventListener('keyup', function() {
            const searchTerm = searchBoxAjouterFamille.value.toLowerCase();
            console.log("searchTerm : ", searchTerm);
            dropdownItemsAjouterFamille.forEach(function(item) {
              const itemText = item.textContent.toLowerCase();
              console.log("itemText : ", itemText);
              if (itemText.indexOf(searchTerm) > -1) {
                item.classList.remove('hide');
                console.log("item : ", item);
              } else {
                item.classList.add('hide');
              }
            });
          });
        },
        error: function(xhr, status, error) {
          // Gérer les erreurs
          console.log(error);
        }
      });
  });

  $('#famille-form-modifier').submit(function(event) {
    // Empêcher la soumission du formulaire classique
    event.preventDefault();
    // Récupérer les données du formulaire
    var formData = $(this).serialize();
      // Si la boîte de modification est déjà active, la désactiver
      $.ajax({
        url: 'add-famille-modifier.php',
        method: 'POST',
        data: formData,
        success: function(response) {
          var monElementFamille = document.getElementById("notif-famille-modifier");
          var checkFamille = document.getElementById("check-famille-modifier");
          monElementFamille.innerText = "Votre famille a bien été ajouté !";
          monElementFamille.style.display = "flex";
          checkFamille.style.display = "flex";

  
          $('#ajax-famille-modifier').html(response);
          const familleInputModifier = document.getElementById("famille-ingredient-modifier");
          const menuItemsModifier = document.querySelectorAll(".item-deroulant-modifier");
          const attributInputModifier = document.getElementById("tva-ingredient-modifier");

          menuItemsModifier.forEach(function(item) {
            item.addEventListener("click", function() {
              // Mettre à jour la valeur de l'input avec la valeur du div cliqué
              familleInputModifier.value = item.textContent;
              console.log("familleInputModifier.value : ", familleInputModifier.value);
              if (familleInputModifier.value !== "") {
                console.log("familleInputModifier.value : ", familleInputModifier.value);
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "tva-famille.php?nom=" + familleInputModifier.value);
                xhr.onload = function() {
                  // Fill the attribute input with the returned value
                  attributInputModifier.value = parseFloat(xhr.responseText.trim());
                };
                xhr.send();
              } else {
                attributInputModifier.value = "";
              }
            });
          });

          // Gestion de la recherche dans la famille (modifier)

          const searchBoxModifierFamille = document.querySelector('.item-deroulant-rechercher-famille-modifier');
          const dropdownItemsModifierFamille = document.querySelectorAll('.item-deroulant-modifier');

          searchBoxModifierFamille.addEventListener('keyup', function() {
            const searchTerm = searchBoxModifierFamille.value.toLowerCase();
            dropdownItemsModifierFamille.forEach(function(item) {
              const itemText = item.textContent.toLowerCase();
              if (itemText.indexOf(searchTerm) > -1) {
                item.classList.remove('hide');
              } else {
                item.classList.add('hide');
              }
            });
          });
        },
        error: function(xhr, status, error) {
          // Gérer les erreurs
          console.log(error);
        }
      });
  });

  $('#fournisseur-form').submit(function(event) {
    // Empêcher la soumission du formulaire classique
    event.preventDefault();

    // Récupérer les données du formulaire
    var formData = $(this).serialize();

    // // Envoyer les données via une requête AJAX
    $.ajax({
      url: 'add-fournisseur-ajouter.php',
      method: 'POST',
      data: formData,
      success: function(response) {
        var monElementFournisseur = document.getElementById("notif-fournisseur");
        var checkFournisseur = document.getElementById("check-fournisseur");
        monElementFournisseur.innerText = "Votre fournisseur a bien été ajouté !";
        monElementFournisseur.style.display = "flex";
        checkFournisseur.style.display = "flex";        
        // Changer la valeur de l'élément HTML
        
        $('#ajax-fournisseur').html(response);

        // Gestion de la recherche dans les fournisseur (ajouter)

        const searchBoxAjouterFournisseur = document.querySelector('.item-deroulant-rechercher-fournisseur-ajouter');
        const dropdownItemsAjouterFournisseur = document.querySelectorAll('.item-deroulant-fournisseur');

        searchBoxAjouterFournisseur.addEventListener('keyup', function() {
          const searchTerm = searchBoxAjouterFournisseur.value.toLowerCase();
          dropdownItemsAjouterFournisseur.forEach(function(item) {
            const itemText = item.textContent.toLowerCase();
            if (itemText.indexOf(searchTerm) > -1) {
              item.classList.remove('hide');
            } else {
              item.classList.add('hide');
            }
          });
        });
      },
      error: function(xhr, status, error) {
        // Gérer les erreurs
        console.log(error);
      }


    });

    
  });
  $('#fournisseur-form-modifier').submit(function(event) {
    // Empêcher la soumission du formulaire classique
    event.preventDefault();

    // Récupérer les données du formulaire
    var formData = $(this).serialize();

    // // Envoyer les données via une requête AJAX
    $.ajax({
      url: 'add-fournisseur-modifier.php',
      method: 'POST',
      data: formData,
      success: function(response) {
        var monElementFournisseur = document.getElementById("notif-fournisseur");
        var checkFournisseur = document.getElementById("check-fournisseur");
        monElementFournisseur.innerText = "Votre fournisseur a bien été ajouté !";
        monElementFournisseur.style.display = "flex";
        checkFournisseur.style.display = "flex";
        $('#ajax-fournisseur-modifier').html(response);

        // Gestion de la recherche dans les fournisseur (ajouter)

        const searchBoxAjouterFournisseur = document.querySelector('.item-deroulant-rechercher-fournisseur-ajouter');
        const dropdownItemsAjouterFournisseur = document.querySelectorAll('.item-deroulant-fournisseur');

        searchBoxAjouterFournisseur.addEventListener('keyup', function() {
          const searchTerm = searchBoxAjouterFournisseur.value.toLowerCase();
          dropdownItemsAjouterFournisseur.forEach(function(item) {
            const itemText = item.textContent.toLowerCase();
            if (itemText.indexOf(searchTerm) > -1) {
              item.classList.remove('hide');
            } else {
              item.classList.add('hide');
            }
          });
        });
      },
      error: function(xhr, status, error) {
        // Gérer les erreurs
        console.log(error);
      }
    });
  });

  $('#famille-form-modifier-ajouter').submit(function(event) {
  // Empêcher la soumission du formulaire classique
  event.preventDefault();
  // Récupérer les données du formulaire
  var formData = $(this).serialize();
    // Si la boîte de modification est déjà active, la désactiver
    $.ajax({
      url: 'modifier-famille-modifier.php',
      method: 'POST',
      data: formData,
      success: function(response) {
        var monElementFamille = document.getElementById("notif-famille-modifier-ajouter");
        var checkFamille = document.getElementById("check-famille-modifier-ajouter");
        monElementFamille.innerText = "Votre famille a bien été modifiée !";
        monElementFamille.style.display = "flex";
        checkFamille.style.display = "flex";


        $('#ajax-famille-ajouter').html(response);
        const familleInputModifier = document.getElementById("famille-ingredient");
        const menuItemsModifier = document.querySelectorAll(".item-deroulant");
        const attributInputModifier = document.getElementById("tva-ingredient");

        menuItemsModifier.forEach(function(item) {
          item.addEventListener("click", function() {
            // Mettre à jour la valeur de l'input avec la valeur du div cliqué
            familleInputModifier.value = item.textContent;
            console.log("familleInputModifier.value : ", familleInputModifier.value);
            if (familleInputModifier.value !== "") {
              console.log("familleInputModifier.value : ", familleInputModifier.value);
              const xhr = new XMLHttpRequest();
              xhr.open("GET", "tva-famille.php?nom=" + familleInputModifier.value);
              xhr.onload = function() {
                // Fill the attribute input with the returned value
                attributInputModifier.value = parseFloat(xhr.responseText.trim());
              };
              xhr.send();
            } else {
              attributInputModifier.value = "";
            }
          });
        });

        // Gestion de la recherche dans la famille (ajouter)

        const searchBoxAjouterFamille = document.querySelector('.item-deroulant-rechercher-famille-ajouter');
        const dropdownItemsAjouterFamille = document.querySelectorAll('.item-deroulant');

        searchBoxAjouterFamille.addEventListener('keyup', function() {
          const searchTerm = searchBoxAjouterFamille.value.toLowerCase();
          console.log("searchTerm : ", searchTerm);
          dropdownItemsAjouterFamille.forEach(function(item) {
            const itemText = item.textContent.toLowerCase();
            console.log("itemText : ", itemText);
            if (itemText.indexOf(searchTerm) > -1) {
              item.classList.remove('hide');
              console.log("item : ", item);
            } else {
              item.classList.add('hide');
            }
          });
        });

        var button1 = document.querySelectorAll("#crayon-rouge1");
        var inputNom = document.getElementById("input-nom-famille-ajouter");
        button1.forEach(function(row) {
          row.addEventListener("click", function(event) {
            inputNom.value = "";
            // Récupérer les valeurs des colonnes correspondantes de la ligne sélectionnée
            var nom = $(this).closest(".item-deroulant").attr("value");
            console.log("nom1111 : ", nom);
            
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "tva-famille.php?nom=" + nom);
            xhr.onload = function() {
              // Fill the attribute input with the returned value
              var tva = parseFloat(xhr.responseText.trim());
              console.log("tva : ", tva);
              $("input[name=input-tva-famille-modifier]").attr("value", tva);
            };
            xhr.send();

            // Insérer les valeurs récupérées comme placeholders pour les champs du formulaire
            $("input[name=input-nom-famille-ajouter]").attr("value", nom);
            $("input[name=input-nom-famille-modifier2]").attr("value", nom);
          
            
            openFamModifier();
          });
          row.addEventListener("click", function(event) {
            inputNom.value = "";
            event.stopPropagation();
            console.log("Bouton 1 cliqué");
          });
        });
        // Calcul automatique de la tva selon la famille (ajouter)

        // const familleInput = document.getElementById("famille-ingredient");
        // var menuItems = document.querySelectorAll(".item-deroulant");
        // const attributInput = document.getElementById("tva-ingredient");

        // menuItems.forEach(function(item) {
        //   item.addEventListener("click", function() {
        //     // Mettre à jour la valeur de l'input avec la valeur du div cliqué
        //     familleInput.value = item.textContent.trim();
        //     console.log("familleInput.value : ", familleInput.value);
        //     if (familleInput.value !== "") {
        //       console.log("familleInput.value : ", familleInput.value);
        //       const xhr = new XMLHttpRequest();
        //       xhr.open("GET", "tva-famille.php?nom=" + familleInput.value);
        //       xhr.onload = function() {
        //         // Fill the attribute input with the returned value
        //         attributInput.value = parseFloat(xhr.responseText.trim());
        //       };
        //       xhr.send();
        //     } else {
        //       attributInput.value = "";
        //     }
        //   });
        // });
      },
      error: function(xhr, status, error) {
        // Gérer les erreurs
        console.log(error);
      }
    });
  });

  $('#famille-form-modifier-modifier').submit(function(event) {
    // Empêcher la soumission du formulaire classique
    console.log("id : ", id);
    event.preventDefault();
    // Récupérer les données du formulaire
    var formData = $(this).serialize();
      // Si la boîte de modification est déjà active, la désactiver
      $.ajax({
        url: 'modifier-famille-modifier.php',
        method: 'POST',
        data: formData,
        success: function(response) {
          var monElementFamille = document.getElementById("notif-famille-modifier-modifier");
          var checkFamille = document.getElementById("check-famille-modifier-modifier");
          monElementFamille.innerText = "Votre famille a bien été modifiée !";
          monElementFamille.style.display = "flex";
          checkFamille.style.display = "flex";
  
  
          $('#ajax-famille-modifier').html(response);
          const familleInputModifier = document.getElementById("famille-ingredient-modifier");
          const menuItemsModifier = document.querySelectorAll(".item-deroulant-modifier");
          const attributInputModifier = document.getElementById("tva-ingredient-modifier");
  
          menuItemsModifier.forEach(function(item) {
            item.addEventListener("click", function() {
              // Mettre à jour la valeur de l'input avec la valeur du div cliqué
              familleInputModifier.value = item.textContent;
              console.log("familleInputModifier.value : ", familleInputModifier.value);
              if (familleInputModifier.value !== "") {
                console.log("familleInputModifier.value : ", familleInputModifier.value);
                const xhr = new XMLHttpRequest();
                xhr.open("GET", "tva-famille.php?nom=" + familleInputModifier.value);
                xhr.onload = function() {
                  // Fill the attribute input with the returned value
                  attributInputModifier.value = parseFloat(xhr.responseText.trim());
                };
                xhr.send();
              } else {
                attributInputModifier.value = "";
              }
            });
          });
  
          // Gestion de la recherche dans la famille (modifier)

          const searchBoxModifierFamille = document.querySelector('.item-deroulant-rechercher-famille-modifier');
          const dropdownItemsModifierFamille = document.querySelectorAll('.item-deroulant-modifier');

          searchBoxModifierFamille.addEventListener('keyup', function() {
            const searchTerm = searchBoxModifierFamille.value.toLowerCase();
            dropdownItemsModifierFamille.forEach(function(item) {
              const itemText = item.textContent.toLowerCase();
              if (itemText.indexOf(searchTerm) > -1) {
                item.classList.remove('hide');
              } else {
                item.classList.add('hide');
              }
            });
          });
  
          var button3 = document.querySelectorAll("#crayon-rouge3");
          var inputNom = document.getElementById("input-nom-famille-modifier");
          button3.forEach(function(row) {
            row.addEventListener("click", function(event) {
              inputNom.value = "";
              // Récupérer les valeurs des colonnes correspondantes de la ligne sélectionnée
              var nom = $(this).closest(".item-deroulant-modifier").attr("value");
              console.log("nom closest: ", nom);
              console.log("row: ", row);
              console.log("inppzoaezp: ", document.getElementById("input-nom-famille-modifier") );
              
              // const xhr = new XMLHttpRequest();
              // xhr.open("GET", "get-nom.php?nom=" + nom);
              // console.log("izzzd : ", nom);
              // xhr.onload = function() {
              //   // Fill the attribute input with the returned value
              //   var idfam = xhr.responseText;
              //   console.log("nom : ", idfam);
                $("#famille-box-modifier-modifier input[name=input-nom-famille-modifier]").attr("value", nom);
                $("#famille-box-modifier-modifier input[name=input-nom-famille-modifier2]").attr("value", nom);
              // };
              // xhr.send();

              const xhrtva = new XMLHttpRequest();
              xhrtva.open("GET", "tva-famille.php?nom=" + nom);
              xhrtva.onload = function() {
                // Fill the attribute input with the returned value
                var tva = parseFloat(xhrtva.responseText.trim());
                console.log("tva : ", tva);
                $("#famille-box-modifier-modifier input[name=input-tva-famille-modifier]").attr("value", tva);
              };
              xhrtva.send();

              // Insérer les valeurs récupérées comme placeholders pour les champs du formulaire
              
              // console.log("n88om : ", nom);
                

              
              
              openFamModifier();
            });
            row.addEventListener("click", function(event) {
              inputNom.value = "";
              event.stopPropagation();

              console.log("Bouton 3 cliqué");
            });
          });
        },
        error: function(xhr, status, error) {
          // Gérer les erreurs
          console.log(error);
        }
        
      });
  });
});

// Attribution des valeurs par défaut lors de la modification d'une famille (ajotuer)

var button1 = document.querySelectorAll("#crayon-rouge1");
var inputNom = document.getElementById("input-nom-famille-ajouter");
button1.forEach(function(row) {
  row.addEventListener("click", function(event) {
    inputNom.value = "";
    // Récupérer les valeurs des colonnes correspondantes de la ligne sélectionnée
    var nom = $(this).closest(".item-deroulant").attr("value");
    console.log("nom1111 : ", nom);
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "tva-famille.php?nom=" + nom);
    xhr.onload = function() {
      // Fill the attribute input with the returned value
      var tva = parseFloat(xhr.responseText.trim());
      console.log("tva : ", tva);
      $("input[name=input-tva-famille-modifier]").attr("value", tva);
    };
    xhr.send();

    // Insérer les valeurs récupérées comme placeholders pour les champs du formulaire
    $("input[name=input-nom-famille-ajouter]").attr("value", nom);
    $("input[name=input-nom-famille-modifier2]").attr("value", nom);
  
    
    openFamModifier();
  });
  row.addEventListener("click", function(event) {
    inputNom.value = "";
    event.stopPropagation();
    console.log("Bouton 1 cliqué");
  });
});

// Attribution des valeurs par défaut lors de la modification d'une famille (modifier)

// var button3 = document.querySelectorAll("#crayon-rouge3");
// button3.forEach(function(row) {
//   row.addEventListener("click", function(event) {

//     // Récupérer les valeurs des colonnes correspondantes de la ligne sélectionnée
//     var nom = $(this).closest(".item-deroulant-modifier").attr("value");
//     console.log("nom : ", nom);
    
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", "tva-famille.php?nom=" + nom);
//     xhr.onload = function() {
//       // Fill the attribute input with the returned value
//       var tva = parseFloat(xhr.responseText.trim());
//       console.log("tva : ", tva);
//       $("input[name=input-tva-famille-modifier]").attr("value", tva);
//     };
//     xhr.send();

//     // Insérer les valeurs récupérées comme placeholders pour les champs du formulaire
//     $("input[name=input-nom-famille-modifier]").attr("value", nom);
//     $("input[name=input-nom-famille-modifier2]").attr("value", nom);
    
//     event.stopPropagation();
//     openFamModifier();
//   });
//   row.addEventListener("click", function(event) {
//     event.stopPropagation();
//     console.log("Bouton 3 cliqué");
//   });
// });



// button2.addEventListener("click", function() {
//   console.log("Bouton 2 cliqué");
// });

var button3 = document.querySelectorAll("#crayon-rouge3");
var inputNom = document.getElementById("input-nom-famille-modifier");
button3.forEach(function(row) {
  row.addEventListener("click", function(event) {
    inputNom.value = "";
    // Récupérer les valeurs des colonnes correspondantes de la ligne sélectionnée
    var nom = $(this).closest(".item-deroulant-modifier").attr("value");
    console.log("nom closest: ", nom);
    console.log("row: ", row);
    console.log("inppzoaezp: ", document.getElementById("input-nom-famille-modifier") );
    
    // const xhr = new XMLHttpRequest();
    // xhr.open("GET", "get-nom.php?nom=" + nom);
    // console.log("izzzd : ", nom);
    // xhr.onload = function() {
    //   // Fill the attribute input with the returned value
    //   var idfam = xhr.responseText;
    //   console.log("nom : ", idfam);
      $("#famille-box-modifier-modifier input[name=input-nom-famille-modifier]").attr("value", nom);
      $("#famille-box-modifier-modifier input[name=input-nom-famille-modifier2]").attr("value", nom);
    // };
    // xhr.send();

    const xhrtva = new XMLHttpRequest();
    xhrtva.open("GET", "tva-famille.php?nom=" + nom);
    xhrtva.onload = function() {
      // Fill the attribute input with the returned value
      var tva = parseFloat(xhrtva.responseText.trim());
      console.log("tva : ", tva);
      $("#famille-box-modifier-modifier input[name=input-tva-famille-modifier]").attr("value", tva);
    };
    xhrtva.send();

    // Insérer les valeurs récupérées comme placeholders pour les champs du formulaire
    
    // console.log("n88om : ", nom);
      

    
    event.stopPropagation();
    openFamModifier();
  });
  row.addEventListener("click", function(event) {
    inputNom.value = "";
    event.stopPropagation();
    console.log("Bouton 3 cliqué");
  });
});