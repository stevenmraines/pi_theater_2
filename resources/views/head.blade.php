<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
	<head>
		<title>{{ config('app.name', 'Laravel') . (env('APP_ENV', 'production') !== 'production' ? ' (Dev)' : '') }}</title>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
		<meta name="csrf-token" content="{{ csrf_token() }}" />
		<link rel="shortcut icon" href="{{ asset('img/favicon.png') }}" />
		<link href="{{ asset('css/bootstrap_pi.css') }}" rel="stylesheet" />
		<link rel="stylesheet" href="{{ asset('css/browse.css') }}" />
	</head>
	<body class="scrollbar">
		@yield('content')
        
        @if(env('APP_ENV', 'production') !== 'production')
            <div id="dev-tag">
                DEV
            </div>

            <style>
                #dev-tag {
                    background-color: red;
                    color: white;
                    padding: 10px 15px;
                    z-index: 1100;
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    font-size: 24px;
                    border-radius: 7px 0 0 0;
                }
            </style>
        @endif
	</body>
</html>
