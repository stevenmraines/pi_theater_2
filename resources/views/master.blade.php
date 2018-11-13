<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
	<head>
		<title>{{ config('app.name', 'Laravel') }}</title>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<link rel="shortcut icon" href="{{ asset('img/favicon.png') }}" />
		<link href="{{ asset('css/bootstrap_pi.css') }}" rel="stylesheet">
		<script>
			window.Laravel = {
				csrfToken: '{{ csrf_token() }}'
			};
		</script>
		<script src="js/app.js"></script>
	</head>
	<body>
		<div id="vue-wrapper" class='container-fluid px-0'>
			@yield('browse')
		</div>
	</body>
</html>
