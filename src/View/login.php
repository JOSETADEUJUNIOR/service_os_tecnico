 <?php

    require_once dirname(__DIR__, 2) . '/vendor/autoload.php'; ?>
 <!DOCTYPE html>
 <html lang="pt-br">

 <head>
     <?php include_once PATH_URL . './Template/_includes/_head.php' ?>
 </head>

 <body class="login-layout light-login">
     <div class="main-container">
         <div class="main-content">
             <div class="row">
                 <div class="col-sm-10 col-sm-offset-1">
                     <div class="login-container">
                         <div class="center">
                             <h1>
                                 <i class="ace-icon fa fa-ticket white"></i>
                                 <span class="white">JRA - </span>
                                 <span class="white" id="id-text2">Service OS</span>
                             </h1>
                             <h4 class="white" id="id-company-text">&copy; Acesso para técnicos</h4>
                         </div>

                         <div class="space-6"></div>

                         <div class="position-relative">
                             <div id="login-box" class="login-box visible widget-box no-border">
                                 <div class="widget-body">
                                     <div class="widget-main">
                                         <h4 class="header blue lighter bigger">
                                             <i class="orange ace-icon fa fa-key green"></i>
                                             Insira seus dados de acesso
                                         </h4>

                                         <div class="space-6"></div>

                                         <form id="form_login_func" action="login.php" method="post">
                                             <fieldset>
                                                 <label class="block clearfix">
                                                     <span class="block input-icon input-icon-right">
                                                         <input type="email" class="form-control obg" id="login" autocomplete="off" placeholder="E-mail" />
                                                         <i class="ace-icon fa fa-user"></i>
                                                     </span>
                                                 </label>

                                                 <label class="block clearfix">
                                                     <span class="block input-icon input-icon-right">
                                                         <input type="password" class="form-control obg" name="senha" id="senha" placeholder="Senha" />
                                                         <i class="ace-icon fa fa-lock"></i>
                                                     </span>
                                                 </label>

                                                 <div class="space"></div>

                                                 <div class="clearfix col-md-12">

                                                     <button name="btn_acessar" onclick="return ValidarAcesso()" class="width-100 pull-right btn btn-sm btn-primary">
                                                         <i class="ace-icon fa fa-key"></i>
                                                         <span class="bigger-110">Logar</span>
                                                     </button>
                                                 </div>

                                                 <div class="space-4"></div>
                                             </fieldset>
                                         </form>


                                     </div><!-- /.widget-main -->


                                 </div><!-- /.widget-body -->
                             </div><!-- /.login-box -->




                         </div><!-- /.position-relative -->


                     </div>
                 </div><!-- /.col -->
             </div><!-- /.row -->
         </div><!-- /.main-content -->
     </div><!-- /.main-container -->

     <!-- basic scripts -->

     <!--[if !IE]> -->
     <script src="assets/js/jquery-2.1.4.min.js"></script>

     <?php include_once '../Template/_includes/_scripts.php' ?>



     <script src="../Resource/ajax/tecnico-ajx.js"></script>

     <!-- <![endif]-->

     <!--[if IE]>
<script src="assets/js/jquery-1.11.3.min.js"></script>
<![endif]-->
    
 </body>

 </html>