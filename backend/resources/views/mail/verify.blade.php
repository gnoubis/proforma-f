<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>User verification</title>
</head>
<body>


        <h2> vérification du compte</h2>
        <p>Bonjouur {{ $user->firstname }},<br> bienvenue sur GEST PRO ERS SARL</p>
        <p>Svp veillez cliquer sur le bouton pour vérifier votre adresse mail</p>
        <a style="height: 40px; color:indigo;" href="{{url("/confirm/$user->id/$user->email")}}">
            Vérifier votre adresse
        </a>
        <p>merci</p>

        <h4>GEST PRO ERS SARL</h4>
</body>
</html>
