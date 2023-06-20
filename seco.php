<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $email = $_POST['mail'];
  $password = $_POST['pswd'];

  if (($email === 'bapt.briquet@gmail.com' && $password === 'rentanco2023')||($email === 'fredfernandesfut@gmail.com' && $password === 'mayan')) {
    header('Location: matieres-premieres.php');
    exit();
  }
  else{
    header('Location:connexion_false.html');
  }
}

if(isset($_POST['pswd'])){
    $password = $_POST['pswd'];
}else{
    $password = "";
}

?>