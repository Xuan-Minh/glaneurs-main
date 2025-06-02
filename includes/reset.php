<?php
session_start();
session_destroy(); // Détruit la session
header('Location: ../'); // Redirige vers l'index
exit;
