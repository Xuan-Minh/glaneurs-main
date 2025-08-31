<?php foreach ($archives as $i => $archive): ?>
  <div class="archive-thumb">
    <img
      class="archive-gallery-item content-anim"
      data-index="<?php echo $i; ?>"
      data-titre="<?php echo htmlspecialchars($archive['archives_titre']); ?>"
      data-src="<?php echo htmlspecialchars($archive['archives_src']); ?>"
      data-date="<?php echo htmlspecialchars($archive['archives_date']); ?>"
      data-auteur="<?php echo htmlspecialchars($archive['archives_auteur']); ?>"
      src="<?php echo htmlspecialchars($archive['archives_src']); ?>"
      alt="<?php echo htmlspecialchars($archive['archives_titre']); ?>"
    >
  </div>
<?php endforeach; ?>