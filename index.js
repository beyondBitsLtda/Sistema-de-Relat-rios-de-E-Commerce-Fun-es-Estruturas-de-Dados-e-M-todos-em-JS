/* Uma loja virtual precisa de um módulo em JavaScript para gerenciar seu catálogo de produtos, 
aplicar cupons de desconto personalizados e gerar relatórios financeiros a partir dos dados das vendas.*/

/* 1 - Criar uma função fábrica criarCalculadorDeDesconto que recebe uma taxa e 
retorna uma arrow function (closure) para aplicar a porcentagem de desconto sobre o valor de um produto. (X)*/

/* 2 - Criar uma lista de produtos (array de objetos) e uma função adicionarProduto que utilize desestruturação de parâmetros e o operador spread para retornar uma nova lista sem mutar a original. (x)*/

/* 3 - Implementar a função buscarPorCategoria que receba o catálogo e o termo de busca, limpando espaços com .trim() e ignorando maiúsculas/minúsculas antes de filtrar os produtos com .filter() - (x) */

/* 4 - Implementar a função calcularFaturamentoTotal que receba o catálogo e utilize o método .reduce() para somar o valor total de todos os itens cadastrados. (x)*/

/* 5 - Implementar a função formatarExibicao que utilize .map() para transformar cada produto em uma string formatada NOME - R$ PRECO e junte os itens com .join() - (x). */


const fs = require('fs');
const { catalogoOriginal } = require('./gerenciarCatalogo.js');  
const { adicionarProduto } = require('./gerenciarCatalogo.js'); 
const { formatarExibicao } = require('./gerenciarCatalogo.js'); 
const { criarCalculadoraDeDesconto } = require('./calcularDesconto.js');
const { buscarPorCategoria } = require('./buscarCategoria.js');
const { calcularFaturamentoTotal } = require('./calcularFaturamento.js');

// aqui como não temos tela as variaveis vão gravadas aqui com o resultado, a depender  da opção do usuário , vamos gravar aqui os resultados.
let opcao = 'faturamento' ;
let id = 1;
let porcentagem =0.20;
let categoria = 'Móveis';


function executarAcaoLog(opcao) {
    switch (opcao){
        case 'adicionar':
        const catalogo = catalogoOriginal;
        const catalogoAtualizado = adicionarProduto(catalogo, { 
        id: 3, 
        nome: 'Headset 7.1', 
        preco: 250 
    });
    console.log(catalogoAtualizado);
        break;
    }

    switch (opcao){
        case 'formatar':
        const catalogo = catalogoOriginal;
        const catalogoFormatado = formatarExibicao(catalogo);
        console.log(catalogoFormatado);
        
    }

    switch (opcao){
        
        case 'desconto':
            // Cria a função de desconto com a porcentagem informada
            const calcularDesconto = criarCalculadoraDeDesconto(porcentagem);
            // Executa passando o ID do produto buscado no catálogo
            const precoFinal = calcularDesconto(id);
            console.log(`Produto ID ${id} com ${porcentagem}% de desconto: R$ ${precoFinal}`);
            break;
        
    }

    switch (opcao){
        case 'buscar':
        const catalogo = catalogoOriginal;
        const catalogoFiltrado = buscarPorCategoria(catalogo,categoria);
        console.log(catalogoFiltrado);
        
    }

    switch (opcao){
        case 'faturamento':
        const catalogo = catalogoOriginal;
        const valorTotalFaturado = calcularFaturamentoTotal(catalogo);
        console.log(valorTotalFaturado);
        
    }
}


    
executarAcaoLog(opcao);