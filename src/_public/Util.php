<?php

namespace Src\_public;

class Util
{


public static function chamarPagina($pag)
    {

        header("location: $pag");
        exit;
    }

}

?>