<?php
session_start();
session_destroy(); // Détruit la session
header('Location: ../index.php'); // Redirige vers l'index
exit;
