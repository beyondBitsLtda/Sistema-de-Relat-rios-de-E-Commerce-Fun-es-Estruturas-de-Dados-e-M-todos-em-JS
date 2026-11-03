const { catalogoOriginal } = require('./gerenciarCatalogo.js');



function calcularFaturamentoTotal (catalogoOriginal) {
    const faturamento = catalogoOriginal.reduce((acc,valorProduto) => acc + valorProduto.preco, 0);
    return faturamento;

}

module.exports = {
    calcularFaturamentoTotal
};




