 <?php

    require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; ?>
 <!DOCTYPE html>
 <html lang="pt-br">

 <head>
     <?php include_once PATH_URL . './Template/_includes/_head.php' ?>
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <style type="text/css">
         body {
             background-color: #f0f0f0;
             font-family: Arial, sans-serif;
         }

         .container {
             display: flex;
             justify-content: center;
             align-items: center;
             height: 100vh;
         }

         .image {
             float: left;
             width: 200%;
             height: 82%;
             background-image: url("../Template/assets/images/post_login.png");
             background-position: center;
             background-repeat: no-repeat;
             background-size: cover;
         }

         .form-container {
             float: right;
             width: 100%;
             height: 82%;
             display: flex;
             flex-direction: column;
             align-items: center;
             justify-content: center;
             background-color: #fff;
             box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
             border-radius: 5px;
         }

         .form {
             display: flex;
             flex-direction: column;
             align-items: center;
             padding: 20px;
             width: 100%;
             height: 100%;
         }

         .form input[type="email"],
         .form input[type="password"] {
             width: 100%;
             padding: 10px;
             margin-bottom: 10px;
             border-radius: 5px;
             border: 1px solid #006666;
             box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
         }

         .form button[type="submit"] {
             width: 100%;
             padding: 10px;
             border-radius: 5px;
             border: none;
             background-color: #008080;
             color: #fff;
             cursor: pointer;
         }

         .form button[type="submit"]:hover {
             background-color: #006666;
         }

         @media screen and (max-width: 768px) {
             .container {
                 flex-direction: column;
                 height: auto;
             }

             .image {
                 float: none;
                 width: 100%;
                 height: 300px;
             }

             .form-container {
                 float: none;
                 width: 100%;
                 height: auto;
                 margin-top: 20px;
                 border-radius: 0px;
             }
         }
     </style>
 </head>

 <body class="login-layout light-login">

 <div class="container">
         <div class="container">
             <div class="image"></div>
             <div class="form-container">
                 <div class="form">
                     <h1><i class="blue ace-icon fa fa-database fa-1x"></i>&nbsp;&nbsp;Acesse o sistema</h1>
                     <div style="margin-top: 20px;">
                         <form id="form_login_tec" action="login.php" method="post">
                             <h5 style="text-align: center;"><i class="ace-icon fa fa-lock"></i>&nbsp;&nbsp;Acesso para tecnico</h5>
                             <input type="email" class="obg" name="login" id="login" autocomplete="off" placeholder="Email">

                             <input type="password" class="obg" name="senha" id="senha" placeholder="Senha">

                             <button type="submit" name="btn_acessar" onclick="return ValidarAcesso('form_login_tec')"><i class="ace-icon fa fa-key"></i> Entrar</button>
                         </form>


                     </div>
                 </div>
             </div>
         </div>

     <script src="assets/js/jquery-2.1.4.min.js"></script>

     <?php include_once '../Template/_includes/_scripts.php' ?>



     <script src="../Resource/ajax/tecnico-ajx.js"></script>

     <!-- <![endif]-->

     <!--[if IE]>
<script src="assets/js/jquery-1.11.3.min.js"></script>
<![endif]-->

 </body>

 </html>