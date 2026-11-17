function converter() {
    // 1. "Pescando" os dados do HTML
    // Pegamos o valor do input e transformamos em número (parseFloat)
    const valorReal = parseFloat(document.getElementById('valor-real').value);
    
    // Pegamos qual moeda o usuário escolheu (USD, EUR ou GBP)
    const moedaDestino = document.getElementById('moeda-destino').value;

    // Pegamos o lugar onde vamos escrever o resultado final
    const displayResultado = document.getElementById('valor-convertido');

    // 2. Validação: O usuário digitou algo válido?
    // isNaN significa "Is Not a Number" (Não é um número)
    if (isNaN(valorReal) || valorReal <= 0) {
        alert("Por favor, digite um valor maior que zero.");
        return; // Para o código aqui se der erro
    }

    // 3. O "Banco de Dados" de taxas (valores aproximados)
    const taxas = {
        USD: 5.00, // 1 Dólar = 5 Reais
        EUR: 5.40, // 1 Euro = 5.40 Reais
        GBP: 6.30  // 1 Libra = 6.30 Reais
    };

    // 4. A Matemática
    // Dividimos o Real pela taxa da moeda escolhida
    const resultado = valorReal / taxas[moedaDestino];

    // 5. Formatação (Deixar o número com cara de dinheiro)
    // Esse comando longo coloca o símbolo ($, €, £) automaticamente
    const resultadoFormatado = resultado.toLocaleString('en-US', {
        style: 'currency',
        currency: moedaDestino
    });

    // 6. Mostrar na tela!
    displayResultado.innerText = resultadoFormatado;
}

async function converterComAPI() {
    const valorReal = parseFloat(document.getElementById('valor-real').value);
    const moedaDestino = document.getElementById('moeda-destino').value;
    const displayResultado = document.getElementById('valor-convertido');

    if (isNaN(valorReal) || valorReal <= 0) {
        alert("Por favor, digite um valor maior que zero.");
        return;
    }

    displayResultado.innerText = "Buscando cotação...";

    try {
        const resposta = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/brl.json');
        const dados = await resposta.json();

        const moeda = moedaDestino.toLowerCase();
        const resultado = valorReal * dados.brl[moeda];

        displayResultado.innerText = resultado.toLocaleString('en-US', {
            style: 'currency',
            currency: moedaDestino
        });

    } catch (erro) {
        displayResultado.innerText = "Erro ao buscar cotação.";
    }
}

const botaoConverter = document.getElementById('btn-converter');
botaoConverter.addEventListener('click', converterComAPI);

const inputValor = document.getElementById('valor-real');
inputValor.addEventListener('keydown', function(evento) {
    if (evento.key === 'Enter') {
        converterComAPI();
    }
});

inputValor.addEventListener('input', function() {
    if (inputValor.value === '' || parseFloat(inputValor.value) <= 0) {
        document.getElementById('valor-convertido').innerText = 'R$0.00';
    }
})