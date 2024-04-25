<?php


require_once dirname(__DIR__, 3) . '/vendor/autoload.php';

?>


<div id="sidebar" class="sidebar                  responsive                    ace-save-state">
    <script type="text/javascript">
        try {
            ace.settings.loadState('sidebar')
        } catch (e) {}
    </script>
<script src="../Resource/ajax/tecnico-ajx.js"></script>
    <div class="sidebar-shortcuts" id="sidebar-shortcuts">
        <div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
            <a href="index.php" class="btn btn-success">
                <i class="ace-icon fa fa-home"></i>
            </a>

            <a href="meus_dados.php" class="btn btn-info">
                <i class="ace-icon fa fa-user"></i>
            </a>

            <a href="chamados.php" class="btn btn-warning">
                <i class="ace-icon fa fa-envelope"></i>
            </a>

            <a href="#" onclick="Sair()" class="btn btn-danger">
                <i class="ace-icon fa fa-power-off"></i>
            </a>
        </div>

        <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
            <span class="btn btn-success"></span>

            <span class="btn btn-info"></span>

            <span class="btn btn-warning"></span>

            <span class="btn btn-danger"></span>
        </div>
    </div><!-- /.sidebar-shortcuts -->

    <ul class="nav nav-list">
        <!-- <li class="">
            <a href="index.php">
                <i class="menu-icon fa fa-tachometer"></i>
                <span class="menu-text"> Dashboard </span>
            </a>

            <b class="arrow"></b>
        </li> -->
        <li class="">
            <a href="#" class="dropdown-toggle">
                <i class="menu-icon fa fa-list"></i>
                <span class="menu-text"> Cadastros </span>

                <b class="arrow fa fa-angle-down"></b>
            </a>

            <b class="arrow"></b>

            <ul class="submenu">
                <li class="">
                    <a href="meus_dados.php">
                        <i class="menu-icon fa fa-caret-right"></i>
                        Meus dados
                    </a>

                    <b class="arrow"></b>
                </li>

                <li class="">
                    <a href="mudar_senha.php">
                        <i class="menu-icon fa fa-caret-right"></i>
                        Alterar Senha
                    </a>

                    <b class="arrow"></b>
                </li>



            </ul>
        </li>

        <li class="">
            <a href="chamados.php">
                <i class="menu-icon fa fa-envelope"></i>
                <span class="menu-text"> Chamados </span>
            </a>

            <b class="arrow"></b>
        </li>
        <li class="">
            <a href="listar_lote.php">
                <i class="menu-icon fa fa-envelope"></i>
                <span class="menu-text"> Lotes </span>
            </a>

            <b class="arrow"></b>
        </li>

    </ul><!-- /.nav-list -->

    <div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
        <i id="sidebar-toggle-icon" class="ace-icon fa fa-angle-double-left ace-save-state" data-icon1="ace-icon fa fa-angle-double-left" data-icon2="ace-icon fa fa-angle-double-right"></i>
    </div>
</div>