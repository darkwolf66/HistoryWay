<!DOCTYPE html>
<html>
<head>
	<!-- Begin Cookie Consent plugin by Silktide - http://silktide.com/cookieconsent -->
	<script type="text/javascript">
	    window.cookieconsent_options = {"message":"This website uses cookies to ensure you get the best experience on our website","dismiss":"Got it!","learnMore":"More info","link":"http://hisotoryway.ml/cookiepolice.php","theme":"dark-bottom"};
	</script>

	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.10/cookieconsent.min.js"></script>
	<!-- End Cookie Consent plugin -->

	<title>HisotoryWay</title>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.cookie.js"></script>
	<script src="js/bootstrap.min.js"></script>
	
	<script type="text/javascript" src="game/creator.game.js"></script>

	<link rel="icon" href="../../favicon.ico">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="css/styles.css">
</head>
<body>
	<div class="container">
		<div class="header clearfix">
		    <nav>
		      <ul class="nav nav-pills pull-right">
		        <li id="menu-home" role="presentation"><button class="btn btn-success" onclick="main.startMode()">Carregar história</button></li>
		      </ul>
		    </nav>
		    <h3 class="text-muted" id="main-title">HisotoryWay</h3>
		</div>
		<div class="alert-event"></div>
		<div id="main">
      	</div>
      	<div id="code">
		</div>
	</div>
	<footer class="footer">
      <div class="container">
        <p class="text-muted">Todos direitos reservados. HisotoryWay 2016 - <span class="label label-danger" style="cursor: pointer;" onclick="location.href = './dcma.html';">DCMA</span></p>
      </div>
    </footer>

</body>
</html>