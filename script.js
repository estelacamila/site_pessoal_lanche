// Captura os elementos do DOM
const modal = document.getElementById('pedidoModal');
const modalTitulo = document.getElementById('modalTitulo');
const nomeInput = document.getElementById('nome');
const obsInput = document.getElementById('obs');
const pagamentoInput = document.getElementById('pagamento');
const lancheNomeInput = document.getElementById('lancheNome');
const lancheValorInput = document.getElementById('lancheValor');

// Evento ao clicar em "Selecionar"
document.querySelectorAll('.selecionar-btn').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.card');
    const nome = card.dataset.lanche;
    const valor = card.dataset.valor;

    lancheNomeInput.value = nome;
    lancheValorInput.value = valor;
    modalTitulo.textContent = `Pedido - ${nome}`;
    nomeInput.value = '';
    obsInput.value = '';
    pagamentoInput.value = '';
    modal.style.display = 'flex';
  });
});

// Evento para fechar o modal
document.getElementById('fecharModal').addEventListener('click', () => {
  modal.style.display = 'none';
});

// Evento de envio do formulário
document.getElementById('pedidoForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  const obs = obsInput.value.trim();
  const pagamento = pagamentoInput.value;
  const lanche = lancheNomeInput.value;
  const valor = lancheValorInput.value;

  const mensagem = `
🍔 *Pedido - ${lanche}*
👤 Nome: ${nome}
💰 Valor: R$ ${valor}

💬 Observações:
${obs || 'Nenhuma'}

💳 Pagamento: ${pagamento}

✅ Aguardando confirmação do atendente...
`;

  const numeroWhatsApp = '5517991496548';
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');

  // Abre a janela de impressão com contagem regressiva
  const printWindow = window.open('', '_blank', 'width=600,height=400');
  printWindow.document.write(`
    <html>
    <head>
      <title>Impressão do Pedido</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          font-size: 18px;
          padding: 20px;
        }
        #contador {
          margin-top: 20px;
          font-size: 20px;
          color: #e67e22;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <pre>${mensagem}</pre>
      <div id="contador">⏳ Imprimindo em 60 segundos...</div>
    </body>
    </html>
  `);
  printWindow.document.close();

  printWindow.onload = () => {
    let seconds = 60;
    const countdownEl = printWindow.document.getElementById('contador');

    const timer = setInterval(() => {
      seconds--;
      countdownEl.textContent = `⏳ Imprimindo em ${seconds} segundos...`;

      if (seconds <= 0) {
        clearInterval(timer);
        printWindow.print();
        // printWindow.close(); // Descomente se quiser que feche automaticamente
      }
    }, 1000);
  };
printWindow.document.write(`
  <html>
  <head>
    <title>Impressão do Pedido</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 18px;
        padding: 20px;
        text-align: center;
      }
      pre {
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
      }
      #contador {
        margin-top: 20px;
        font-size: 20px;
        color: #e67e22;
        font-weight: bold;
      }
      #mensagem-impressao {
        margin-top: 20px;
        font-size: 16px;
        color: #2c3e50;
      }
      #btnImprimir {
        margin-top: 25px;
        padding: 12px 25px;
        font-size: 16px;
        background-color: #27ae60;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      #btnImprimir:hover {
        background-color: #219150;
      }
    </style>
  </head>
  <body>
    <pre>${mensagem}</pre>
    <div id="contador">⏳ Imprimindo em 60 segundos...</div>
    <div id="mensagem-impressao">Você pode clicar no botão abaixo para imprimir imediatamente:</div>
    <button id="btnImprimir">Imprimir Agora</button>

    <script>
      const btn = document.getElementById('btnImprimir');
      btn.addEventListener('click', () => {
        window.print();
      });
    </script>
  </body>
  </html>
`);

  modal.style.display = 'none';
});
