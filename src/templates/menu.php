<style>
.current {
  text-decoration: underline;
}
</style>

<?php
$menu = array(
  'index' => 'Accueil',
  'about' => 'À propos',
  'contact' => 'Contactez-nous'
); // Liste des pages du menu avec les noms à afficher

$current_page = basename($_SERVER['PHP_SELF'], ".php");

echo '<ul>';
foreach ($menu as $page => $name) {
  if ($page == $current_page) {
    echo '<li class="current">';
  } else {
    echo '<li>';
  }
  if (file_exists($page . '.php')) {
    echo '<a href="' . $page . '.php">' . $name . '</a></li>';
  } else {
    echo '<a href="' . $page . '.html">' . $name . '</a></li>';
  }
}
echo '</ul>';
