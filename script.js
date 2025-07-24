const perguntas = [
  "1. Nome + ID Discord",
  "2. Qual seu horário disponível pra ajudar na LOG?",
  "3. Atua em alguma área da staff? Se sim, quais?",
  "4. Já teve experiência como Equipe LOG? Se sim, me diga mais sobre.",
  "5. Pra que serve o comando /hackperma? E quando ele deve ser usado?",
  "6. Em quais situações o propmanager seria ideal para achar hacker?",
  "7. Pra que serve o delobjs? E em quais situações seria necessário usá-lo?",
  "8. Pra que serve o forcedelete? E por que ele pode ser usado quando o delobjs não funcionar?",
  "9. Como você poderia achar o hack que usa função do mod menu pra falar alto?",
  "10. Se você banir um hacker e ele não for kikado da cidade, o que você poderia fazer?",
  "11. Se você ver um hacker zaralhando na cidade, o que você faria?",
  "12. Está ciente que se entrar pra log, você terá uma meta semanal de 50 banimentos? (Sim ou Não)",
  "13. Se alguém te marcar num ticket falando que o dinheiro dele sumiu, o que você faria?",
  "14. Como identificaria um hacker que está invisível para os outros?",
  "15. Qual ferramenta usaria para analisar crash logs?",
  "16. Qual comando usaria para puxar um veículo que caiu no mapa?",
  "17. Como verificar se um jogador está usando wallhack?",
  "18. O que você faria se encontrasse um mod de staff abusando de comandos?",
  "19. Em qual pasta do servidor ficam armazenados os logs do anti-cheat?",
  "20. Que tipo de evidência é necessária para aplicar ban permanente?",
  "21. Qual a diferença entre ban temporário e /hackperma?",
  "22. Qual comando usaria para limpar todos os objetos de uma região?",
  "23. O que fazer se o hacker estiver mudando de ID toda hora?",
  "24. Você está ciente de que não pode vazar nenhuma informação da equipe LOG?"
];

let index = 0;
let respostas = [];
let tempo = 20;
let intervalo;

function iniciarFormulario() {
  document.querySelectorAll(".slide").forEach(s => s.classList.add("hidden"));
  document.getElementById("formulario").classList.remove("hidden");
  mostrarPergunta();
}

function mostrarPergunta() {
  document.getElementById("pergunta").innerText = perguntas[index];
  document.getElementById("resposta").value = "";
  if (index >= 1) {
    bloquearCopiarColar();
  }
  tempo = 20;
  atualizarTimer();
  intervalo = setInterval(() => {
    tempo--;
    atualizarTimer();
    if (tempo === 0) {
      proxima();
    }
  }, 1000);
}

function atualizarTimer() {
  document.getElementById("timer").innerText = `⏱️ ${tempo}`;
}

function proxima() {
  clearInterval(intervalo);
  const resp = document.getElementById("resposta").value.trim();
  respostas.push(resp || "[Sem resposta]");
  index++;
  if (index < perguntas.length) {
    mostrarPergunta();
  } else {
    finalizarFormulario();
  }
}

function finalizarFormulario() {
  document.body.innerHTML = `
    <div class="slide">
      <h2>✅ Formulário finalizado</h2>
      <p>Obrigado por preencher!</p>
      <pre>${respostas.map((r, i) => `${perguntas[i]}\n➡️ ${r}`).join("\n\n")}</pre>
    </div>`;
}

function bloquearCopiarColar() {
  const input = document.getElementById("resposta");
  input.onpaste = e => e.preventDefault();
  input.oncopy = e => e.preventDefault();
  input.oncut = e => e.preventDefault();
}
