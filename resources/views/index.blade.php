<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Security-Policy" content="default-src * data: https://ssl.gstatic.com 'unsafe-eval'; script-src 'unsafe-inline' 'self' data: https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; media-src *; img-src * data: https://maps.gstatic.com content:;">
    <title>GPS</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script id="config">
        window.API_KEY = "{{ $apiKey }}";
        (function(){ var e = document.querySelector('#config');e.parentNode.removeChild(e);})();
    </script>
</head>
<body>
<div id="app"></div>
<script src="{{ asset('js/app.js') }}" defer></script>
</body>
</html>
