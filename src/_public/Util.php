<?php

namespace Src\_public;

class Util
{

    public static function chamarPagina($pag)
    {
        header("location: $pag");
        exit;
    }

    private static function SetarFusoHorarioTecnico()
    {
        date_default_timezone_set('America/Sao_Paulo');
    }

    public static function DataAtualTecnico()
    {
        self::SetarFusoHorarioTecnico();
        return date('d/m/Y');
    }
}
