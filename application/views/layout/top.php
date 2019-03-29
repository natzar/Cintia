<!DOCTYPE html>
<html lang="<?= $_SESSION['lang']?>">
	<head>		  
	    <title><?= $SEO_TITLE ?> &raquo; <?= $base_title ?></title>
		
		<!-- Basic Metas -->
	    <meta name="title" content="<?= $SEO_TITLE ?> &raquo; <?= $base_title ?>">
	    <meta name="description" content='<?= ($SEO_DESCRIPTION )?>'>
	    <meta name="author" content="<?= $base_title ?>">
   			    
   		<!-- Content type & charset -->	    
	    <meta charset="utf-8">
	    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  		<meta http-equiv="content-language" content="<?= $_SESSION['lang']?>" />
		<link rel="manifest" href="/manifest.json">
		
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">

		<!-- Robots - SEO -->
		<meta name="ROBOTS" content="All,INDEX,FOLLOW">		<!-- No effect, Robots = All is default -->
	    <meta name="keywords" content="<?= $SEO_KEYWORDS ?>">
		<meta name="Language" content="<?= $_SESSION['lang']?>">
		<meta name="Revisit" content="2 days">
		<meta name="Distribution" content="Global">
		
		<!-- Mobile -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	    <meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">	

		<!-- Base Path for all relative src declared files -->
	    <base href="<?= $base_url ?>"></base>
	    		
		<!-- Canonical URL -->	    		
		<link rel="canonical" href="//<?= $_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"] ?>"/>

		<!-- Favicon -->    
		<link rel="icon" type="image/png" href="/public/favicon.png" />
		<link rel="shortcut icon" href="/public/favicon.ipng">
		<link rel="icon" type="image/png" href="/public/favicon.png" />     
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	  	<link href="public/vendor/materialize/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
	  	<link href="public/application.css" type="text/css" rel="stylesheet" media="screen,projection"/>
    </head>    
  	<body class="<?= get_param('p') ?>">
		<?php flush(); ?>
  		<!-- Work hard, and be nice to people  -->
		<? include "top-content.php"; ?>