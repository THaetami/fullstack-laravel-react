<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Itungin</title>
    @vite(['resources/sass/app.scss', 'resources/css/app.css'])
    @vite(['resources/js/app.tsx'])
</head>

<body>
    <div id="root"></div>
</body>

</html>
