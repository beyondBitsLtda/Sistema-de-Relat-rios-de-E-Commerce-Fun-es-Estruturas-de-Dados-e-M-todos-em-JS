# README - Projeto de Estudos de JavaScript (Loja Virtual)
> Projeto Produto Lisa · gerado pela Lisa em 2026-11-03 · a partir de "Arquitetura do Sistema de Loja Virtual (JS)"

## Visão Geral e Objetivos

Este repositório consiste em um sistema de estudo e consolidação de conceitos fundamentais do JavaScript moderno (ES6+), simulando as operações do backend/módulo de relatórios de uma Loja Virtual de e-commerce.

O objetivo do projeto é demonstrar a manipulação imutável de dados, cálculo dinâmico de descontos através de *closures*, filtragem e agregação de dados em memória a partir de um catálogo contendo 100 produtos cadastrados.

### Escopo das Funcionalidades
1. **Gestão de Catálogo de Produtos**: Adição de novos itens sem mutação do array original e formatação textual para exibição de vitrine.
2. **Cálculo Dinâmico de Desconto**: Função fábrica que gera *closures* para aplicação proporcional de cupons sobre o preço unitário do produto.
3. **Busca e Filtragem**: Localização de itens por categoria com normalização de maiúsculas/minúsculas e remoção de espaços nas extremidades.
4. **Relatório de Faturamento**: Soma acumulada do valor de todos os itens em estoque.

---

## Estrutura do Repositório e Módulos

O código está organizado de forma modular em arquivos Node.js no repositório `beyondBitsLtda/Sistema-de-Relat-rios-de-E-Commerce-Fun-es-Estruturas-de-Dados-e-M-todos-em-JS`:

* `index.js`: Ponto de entrada do sistema. Controla a variável `opcao` e dispara a execução de cada operação através da função `executarAcaoLog`.
* `gerenciarCatalogo.js`: Armazena a base de dados em memória (`catalogoOriginal`) com 100 produtos e exporta as funções `adicionarProduto` e `formatarExibicao`.
* `calcularDesconto.js`: Exporta a fábrica de funções `criarCalculadoraDeDesconto`, responsável por gerar a closure de cálculo de taxa.
* `buscarCategoria.js`: Exporta a função `buscarPorCategoria` para pesquisa textual na propriedade `categoria`.
* `calcularFaturamento.js`: Exporta a função `calcularFaturamentoTotal` para agregação de valores.

---

## Arquitetura e Fluxo de Dados

O fluxo funcional do sistema segue rigorosamente a sequência mapeada na aba "Fluxo do Sistema" do desenho de arquitetura "Arquitetura do Sistema de Loja Virtual (JS)":

1. **"Início: Recepção de Produtos e Descontos"**: O sistema inicializa carregando a lista base de produtos de `gerenciarCatalogo.js` e os parâmetros de entrada em `index.js`.
2. **"Gerar Calculadora de Desconto (Closure)"**: A função `criarCalculadoraDeDesconto` é instanciada com uma taxa percentual (ex: `0.20`), retornando uma função interna especializada.
3. **"Clonar e Desestruturar Objetos (Spread)"**: A função `adicionarProduto` utiliza desestruturação de parâmetros `{ id, nome, preco }` e o operador *spread* (`[...listaProduto, novoProduto]`) para garantir imutabilidade.
4. **"Filtrar por Categorias Desejadas (filter)"**: A função `buscarPorCategoria` processa o catálogo e filtra os itens correspondentes ao termo limpo com `.trim().toLowerCase()`.
5. **"Calcular Faturamento Acumulado (reduce)"**: A função `calcularFaturamentoTotal` utiliza `.reduce()` para somar a propriedade `preco` de todos os produtos cadastrados.
6. **"Mapear e Formatar Catálogo Final (map)"**: A função `formatarExibicao` transforma a lista em strings `"NOME - R$ PRECO"` via `.map()` e as une com `.join(" - ")`.
7. **"Fim: Exibição de Relatórios e Resultados"**: Os resultados são exibidos no console via `executarAcaoLog`.

---

## Conceitos Praticados e Implementação em JavaScript

### 1. Closures e Verificação de Tipos (`typeof`)
Local de implementação: `calcularDesconto.js`.
A função `criarCalculadoraDeDesconto` normaliza a taxa (convertendo taxas maiores que 1 para decimal) e retorna uma função filha que retém o escopo da taxa. A função filha verifica o tipo do parâmetro recebido:
* Se for `number` ou `string`, busca o objeto no `catalogoOriginal` por `id` ou `nome`.
* Se for um `object` válido, lê diretamente a propriedade `.preco`.

```javascript
// Trecho de calcularDesconto.js
function criarCalculadoraDeDesconto(taxaDesconto) {
    const taxaNormalizada = taxaDesconto > 1 ? taxaDesconto / 100 : taxaDesconto;

    return function(parametro) {
        let preco = 0;
        if (typeof parametro === 'number' || typeof parametro === 'string') {
            const produtoEncontrado = catalogoOriginal.find(p => p.id === parametro || p.nome === parametro);
            preco = produtoEncontrado ? produtoEncontrado.preco : 0;
        } else if (typeof parametro === 'object' && parametro !== null) {
            preco = parametro.preco || 0;
        }
        const valorDesconto = preco * taxaNormalizada;
        return preco - valorDesconto;
    };
}
```

### 2. Imutabilidade com Spread Operator (`...`) e Desestruturação
Local de implementação: `gerenciarCatalogo.js`.
A inclusão de produtos não altera o array original `catalogoOriginal`, retornando uma nova referência.

```javascript
// Trecho de gerenciarCatalogo.js
function adicionarProduto (listaProduto, {id, nome, preco}) {
    const novoProduto = {id, nome, preco};
    return [...listaProduto, novoProduto];
}
```

### 3. Filtragem Flexível com `.filter()`, `.trim()` e `.toLowerCase()`
Local de implementação: `buscarCategoria.js`.
Garante buscas resilientes a espaços extras e variação de caixa alta/baixa.

```javascript
// Trecho de buscarCategoria.js
function buscarPorCategoria (catalogoOriginal, termoBusca) {
    const termoLimpo = termoBusca.trim().toLowerCase();
    return catalogoOriginal.filter(produto => {
        const categoriaProduto = produto.categoria.trim().toLowerCase();
        return categoriaProduto.includes(termoLimpo);
    });
}
```

### 4. Acúmulo com `.reduce()` e Transformação com `.map()` / `.join()`
Locais de implementação: `calcularFaturamento.js` e `gerenciarCatalogo.js`.

```javascript
// Trecho de calcularFaturamento.js
function calcularFaturamentoTotal (catalogoOriginal) {
    return catalogoOriginal.reduce((acc, valorProduto) => acc + valorProduto.preco, 0);
}

// Trecho de gerenciarCatalogo.js
function formatarExibicao(catalogo) {
    const itensFormatados = catalogo.map(produto => `${produto.nome} - R$ ${produto.preco}`);
    return itensFormatados.join(" - ");
}
```

---

## Exemplos Práticos de Uso

### Execução em `index.js`

Para alterar o comportamento da execução via CLI, edite as variáveis de controle em `index.js`:

```javascript
// Configuração em index.js
let opcao = 'desconto'; // Opções disponíveis: 'adicionar', 'formatar', 'desconto', 'buscar', 'faturamento'
let id = 1;
let porcentagem = 0.20; // 20% de desconto
let categoria = 'Móveis';

executarAcaoLog(opcao);
```

### Exemplo 1: Aplicar Desconto por ID de Produto
```javascript
const { criarCalculadoraDeDesconto } = require('./calcularDesconto.js');

const calcDesconto20 = criarCalculadoraDeDesconto(0.20);
const precoComDesconto = calcDesconto20(1); // Produto ID 1: Teclado Mecânico (R$ 350)
console.log(precoComDesconto); // Saída: 280
```

### Exemplo 2: Adicionar Produto ao Catálogo
```javascript
const { catalogoOriginal, adicionarProduto } = require('./gerenciarCatalogo.js');

const novoCatalogo = adicionarProduto(catalogoOriginal, { 
    id: 101, 
    nome: 'Webcam 4K Ultra', 
    preco: 500 
});
console.log(novoCatalogo.length); // Saída: 101 (catalogoOriginal permanece com 100)
```

---

## Instruções de Execução e Testes

### Pré-requisitos
* Node.js versão 14.x ou superior instalado no ambiente.

### Passo a Passo para Rodar o Projeto

1. Clone o repositório ou navegue até o diretório do projeto:
   ```bash
   cd beyondBitsLtda/Sistema-de-Relat-rios-de-E-Commerce-Fun-es-Estruturas-de-Dados-e-M-todos-em-JS
   ```

2. Execute o arquivo principal via Node.js:
   ```bash
   node index.js
   ```

3. Para testar outras rotinas em `index.js`, modifique o valor da variável `opcao` para um dos seguintes casos:
   * `'faturamento'`: Imprime o valor total acumulado dos 100 produtos.
   * `'desconto'`: Imprime o preço do produto selecionado com o desconto aplicado.
   * `'buscar'`: Imprime a lista de produtos filtrados pela categoria configurada.
   * `'adicionar'`: Retorna e imprime uma nova lista contendo o item adicionado.
   * `'formatar'`: Exibe o catálogo formatado como string contínua.

---

## Análise de Segurança, Riscos e Onde Falhamos Hoje

Embora o projeto tenha foco em estudos de lógica e estruturas de dados em JavaScript, a expansão para um ambiente de produção (API web ou integração com os assistentes visualizados na arquitetura Beyond-Assist) exige a correção de falhas de segurança e robustez identificadas no código atual.

### Tabela de Lacunas e Riscos Encontrados

| Lacuna | Evidência | Risco (alto/médio/baixo) | O que fazer |
| :--- | :--- | :--- | :--- |
| **Falta de Sanitização e Validação de Entradas** | `buscarCategoria.js` chama `.trim()` sem checar se `termoBusca` é string ou nulo. | **Médio** | Adicionar validação de tipo (`typeof termoBusca === 'string'`) e tratamento de valores `undefined`/`null` antes de manipular a string. |
| **Busca de Categoria Falha com Categoria Indefinida no Produto** | `buscarCategoria.js`: `produto.categoria.trim()` lança `TypeError` caso um produto no catálogo não possua a propriedade `categoria`. | **Médio** | Utilizar encadeamento opcional `produto.categoria?.trim() || ''` na filtragem. |
| **Inexistência de Tratamento para ID/Produto Não Encontrado no Desconto** | `calcularDesconto.js`: Se `find()` retornar `undefined`, a função define `preco = 0` e aplica taxa sobre 0, omitindo um erro de negócio. | **Baixo** | Retornar `null` ou lançar uma exceção clara quando o produto consultado não for localizado no catálogo. |
| **Mutação de Parâmetros / Reescrita de Switch Duplicado** | `index.js` contém múltiplos blocos `switch (opcao)` sequenciais em vez de um único bloco unificado. | **Baixo** | Refatorar `index.js` unificando a estrutura `switch` ou utilizando um dicionário/mapa de estratégias (Strategy Pattern). |
| **Uso de Chaves Globais sem Autenticação (Contexto de Integração)** | Desenho "Arquitetura Beyond-Assist": `sec1` e `sec2` apontam riscos com `SUPABASE_SERVICE_ROLE_KEY` e endpoints de ingestão un-authenticated. | **Alto** | Implementar autenticação via token Bearer/JWT nas rotas `/api/ask` e `/api/cron`, restringindo a Service Role Key exclusivamente a operações administrativas no servidor. |

### Ordem de Ação (O que fazer)

#### 1. Agora (Estudo / Local)
1. Adicionar *defensive programming* em `buscarCategoria.js` para tratar `null`/`undefined`.
2. Tratar retornos nulos em `calcularDesconto.js` quando o ID informado não existir.
3. Unificar a estrutura `switch(opcao)` dentro de `index.js`.

#### 2. Antes de Expandir o Uso (Para Web/API REST)
1. Criar um schema de validação (ex: Zod) para payloads de adição e busca de produtos (proposta).
2. Proteger rotas de backend com autenticação e autorização por perfis de acesso.
3. Garantir que chaves sensíveis como `SUPABASE_SERVICE_ROLE_KEY` nunca sejam expostas ao cliente frontend.

#### 3. Depois (Produção / Escala)
1. Implementar testes unitários automatizados (ex: Jest / Vitest) para validar closures e métodos de array.
2. Migrar o banco em memória para consulta persistente com pgvector/PostgreSQL (conforme desenho de arquitetura Beyond-Assist).

---

## Especificação para Expansão (Para o Claude Construir)

### Conceito da Expansão
Transformar o script CLI atual em um módulo de serviço reutilizável para e-commerce (proposta), provendo endpoints REST seguros e uma camada de serviços isolada.

### Passo a Passo de Implementação
1. **Camada de Dados**: Isolar a lista `catalogoOriginal` em um repositório mockado com suporte a operações assíncronas (async/await).
2. **Camada de Serviço**: Criar `CatalogoService` agrupando as funções de busca, adição, formatação e cálculo de faturamento.
3. **Controladores e Rotas**: Criar servidor Express ou Next.js API Routes expondo as rotas HTTP correspondentes (proposta).
4. **Validação**: Aplicar middlewares de validação de tipos e parâmetros.

### Rotas e Telas Projetadas (proposta)

* `GET /api/produtos` (proposta): Retorna a lista de produtos (aceita query parameter `?categoria=`).
* `POST /api/produtos` (proposta): Adiciona um novo produto ao catálogo.
* `POST /api/desconto` (proposta): Recebe `{ produtoId, porcentagem }` e calcula o valor final com desconto.
* `GET /api/relatorios/faturamento` (proposta): Retorna o valor total faturado do catálogo.

### Critérios de Aceite (Dado / Quando / Então)

```gherkin
Cenário: Cálculo de desconto com produto válido
  Dado que existe um produto com ID 1 e preço R$ 350,00
  Quando o usuário solicita a aplicação de um cupom de 20% de desconto para o ID 1
  Então a resposta deve retornar o valor final de R$ 280,00

Cenário: Busca de categoria com maiúsculas e espaços
  Dado que existem produtos na categoria "Periféricos"
  Quando o usuário realiza a busca informando "  PERIFÉRICOS  "
  Então o sistema deve retornar apenas os produtos correspondentes à categoria "Periféricos"

Cenário: Tentativa de adição de produto sem dados obrigatórios
  Dado um payload de produto sem a propriedade "preco"
  Quando for enviada a requisição de adição de produto
  Então o sistema deve rejeitar a operação e retornar erro de validação (HTTP 400)
```

### Parágrafo de Comando para Pedir ao Claude (Prompt Pronto)

> "Atue como desenvolvedor backend sênior. Com base no repositório de estudos de e-commerce (`index.js`, `gerenciarCatalogo.js`, `calcularDesconto.js`, `buscarCategoria.js`, `calcularFaturamento.js`), refatore o projeto convertendo-o para um módulo TypeScript/Node.js estruturado. Crie uma classe `CatalogoService` que encapsule a imutabilidade com spread operator, as closures de desconto, as buscas flexíveis por categoria e o faturamento via reduce. Adicione tratamentos de erro defensivos para IDs inexistentes e entradas inválidas, garantindo 100% de cobertura com testes unitários no Vitest."