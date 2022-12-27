<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>User verification</title>
</head>
<body>


        <h1>Votre demande de Réinitialisation du mot de passe</h1>
        <p>Bonjouur {{ $membership->firstname }}, <br> bienvenue sur PICSTUDIO</p>
        <p>Svp veillez cliquer sur le bouton pour vérifier votre adresse mail</p><br>
        <a style="height: 40px; color:indigo;" href="{{url("/reset-password/$membership->id/$membership->usermail")}}">
            Vérifier votre adresse
        </a>
        <p>merci</p>

        <h4>PICSTUDIO</h4>
</body>
</html>
