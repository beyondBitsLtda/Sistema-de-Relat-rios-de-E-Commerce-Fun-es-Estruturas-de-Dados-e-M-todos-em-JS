const { catalogoOriginal } = require('./gerenciarCatalogo.js');

function criarCalculadoraDeDesconto(taxaDesconto) {
    // Normaliza a taxa para formato decimal
    const taxaNormalizada = taxaDesconto > 1 ? taxaDesconto / 100 : taxaDesconto;

    return function(parametro) {
        let preco = 0;

        // Se passar um ID ou string, busca o produto correspondente no catálogo original
        if (typeof parametro === 'number' || typeof parametro === 'string') {
            const produtoEncontrado = catalogoOriginal.find(p => p.id === parametro || p.nome === parametro);
            preco = produtoEncontrado ? produtoEncontrado.preco : 0;
        } else if (typeof parametro === 'object' && parametro !== null) {
            // Se passar o objeto diretamente, pega a propriedade de preço
            preco = parametro.preco || 0;
        }

        const valorDesconto = preco * taxaNormalizada;
        return preco - valorDesconto;
    };
}

module.exports = {
    criarCalculadoraDeDesconto
};