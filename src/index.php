<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>

		<script src="assets/js/main.js" defer></script>
		<link href="assets/css/main.css" rel="stylesheet" />
	</head>
	<body>
		<header>
		<?php include "templates/menu.php"; ?>
		</header>
		<main>
			<h1>Lorem ipsum dolor sit amet.</h1>
			<h2>Lorem ipsum dolor sit amet. V2</h2>
			<section>
				<h2>Lorem ipsum dolor sit amet consectetur.</h2>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Placeat tempora maxime veniam blanditiis. Perspiciatis sint
					repellat doloribus commodi velit quaerat atque, porro
					asperiores dolorum voluptate, itaque aliquam animi natus
					recusandae.
				</p>
				<picture class="illustration">
					<source
						type="image/webp"
						srcset="assets/images/flower.webp"
					/>
					<source
						type="image/jpeg"
						srcset="assets/images/flower.jpg"
					/>
					<img src="assets/images/flower.jpg" alt="" />
				</picture>
			</section>
		</main>
		<?php include "templates/footer.php"; ?>
	</body>
</html>
