<?php require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

  
 // Criar uma nova instância do PhpSpreadsheet
$spreadsheet = new Spreadsheet();
$sheet = $spreadsheet->getActiveSheet();
if (isset($_POST['desc_filtro']) && isset($_POST['dados'])) {
    $desc_filtro = $_POST['desc_filtro'];
    $dados = json_decode($_POST['dados'], true);
// Preencher os cabeçalhos da planilha
$sheet->setCellValue('A1', 'Equipamento');
$sheet->setCellValue('B1', 'Série');
$sheet->setCellValue('C1', 'Lote');
$sheet->setCellValue('D1', 'Versão');
$sheet->setCellValue('E1', 'Insumo/Material');
$sheet->setCellValue('F1', 'Serviço');
$sheet->setCellValue('G1', 'Valor Total');
// Inicializar a variável para o total geral
$totalGeral = 0.00;
// Preencher os dados
$row = 2;
foreach ($dados as $registro) {
    $sheet->setCellValue('A' . $row, $registro['descricao']);
    $sheet->setCellValue('B' . $row, $registro['numero_serie_equipamento']);
    $sheet->setCellValue('C' . $row, $registro['numero_lote']);
    $sheet->setCellValue('D' . $row, $registro['versao']);
    $sheet->setCellValue('E' . $row, $registro['insumos_nome']);
    $sheet->setCellValue('F' . $row, $registro['servicos_nome']);
    // Formatando o campo de valor com R$
    $cellValue = number_format($registro['total_geral'], 2, ',', '.');
    $sheet->setCellValue('G' . $row, 'R$ ' . $cellValue);
    
     
    // Somando ao total geral
    $totalGeral += $registro['total_geral'];

    $row++;
}

// Auto dimensionar o tamanho das colunas
foreach (range('A', 'G') as $col) {
    $sheet->getColumnDimension($col)->setAutoSize(true);
}


$sheet->getStyle('A1:G1')->applyFromArray([
    'font' => [
        'name' => 'Calibri',
        'size' => 11,
        'color' => ['rgb' => 'FFFFFF'],
    ],
    'fill' => [
        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
        'startColor' => ['rgb' => '0000FF'],
    ],
    'borders' => [
        'allBorders' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
            'color' => ['rgb' => '000000'],
        ],
    ],
]);

// Adicionar bordas às células preenchidas
$lastRow = $row - 1;
$sheet->getStyle('A2:G' . $lastRow)->applyFromArray([
    'font' => [
        'name' => 'Calibri',
        'size' => 11,
    ],
    'borders' => [
        'allBorders' => [
            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
            'color' => ['rgb' => '000000'],
        ],
    ],
]);

// Inserir a linha com o total geral
$row++;

$sheet->setCellValue('F' . $row, 'Total Geral:');
$sheet->setCellValue('G' . $row, 'R$ ' . number_format($totalGeral, 2, ',', '.'));
// Aplicar estilo de negrito à célula do total geral
$sheet->getStyle('F' . $row . ':G' . $row)->applyFromArray([
    'font' => [
        'bold' => true,
    ],
]);


}else{
    echo "dados invalidos";
} ?>
<?php 
// Criar um escritor para formato XLSX
$writer = new Xlsx($spreadsheet);

// Definir o cabeçalho para o download do Excel
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="relatorio_lote.xlsx"');
header('Cache-Control: max-age=0');

// Enviar a saída do escritor para o navegador
$writer->save('php://output');
