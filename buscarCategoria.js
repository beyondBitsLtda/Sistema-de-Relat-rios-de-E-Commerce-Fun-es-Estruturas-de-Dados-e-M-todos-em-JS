const { catalogoOriginal } = require('./gerenciarCatalogo.js');

function buscarPorCategoria (catalogoOriginal, termoBusca) {
    const termoLimpo = termoBusca.trim().toLowerCase();

    return catalogoOriginal.filter(produto => {
        const categoriaProduto = produto.categoria.trim().toLowerCase();
        return categoriaProduto.includes(termoLimpo);
    })

}

module.exports = {
    buscarPorCategoria
};



