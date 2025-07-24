const perguntas = [
  { titulo: "📝 INFORMAÇÕES INICIAIS" },
  "1. Nome + ID Discord",
  "2. Qual seu horário disponível pra ajudar na LOG?",
  "3. Atua em alguma área da staff? Se sim, quais?",
  "4. Já teve experiência como Equipe LOG? Se sim, me diga mais sobre.",
  { titulo: "🔧 CONHECIMENTOS BÁSICOS DE COMANDOS" },
  "5. Pra que serve o comando /hackperma? E quando ele deve ser usado?",
  "6. Em quais situações o /propmanager seria ideal para achar hacker?",
  "7. Pra que serve o /delobjs? E em quais situações seria necessário usá-lo?",
  "8. Pra que serve o /forcedelete? E por que ele pode ser usado quando o delobjs não funcionar?",
  "9. Como você poderia achar o hack que usa função do mod menu pra falar alto?",
  "10. Se você banir um hacker e ele não for kikado da cidade, o que você poderia fazer?",
  "11. Se você ver um hacker zaralhando na cidade, o que você faria?",
  { titulo: "📊 METAS E RESPONSABILIDADES" },
  "12. Está ciente que se entrar pra log, você terá uma meta semanal de 50 banimentos? (Sim ou Não)",
  { titulo: "🎫 SUPORTE E ATENDIMENTO" },
  "13. Se alguém te marcar num ticket falando que o dinheiro dele sumiu, o que você faria?"
];

let respostas = [];
let index = 0;
let tempoRestante = 30 * 60;

function startForm() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("form-container").style.display = "block";
  showPergunta();
  setInterval(atualizarTimer, 1000);
}

function showPergunta() {
  const container = document.getElementById("form");
  container.innerHTML = "";
  document.getElementById("nextBtn").style.display = "block";

  const p = perguntas[index];
  if (typeof p === "string") {
    const input = document.createElement("textarea");
    input.placeholder = p;
    input.onpaste = e => { if(index > 1) e.preventDefault(); };
    input.oncopy = e => { if(index > 1) e.preventDefault(); };
    container.appendChild(input);
  } else {
    const h3 = document.createElement("h3");
    h3.textContent = p.titulo;
    container.appendChild(h3);
    document.getElementById("nextBtn").style.display = "none";
    setTimeout(() => nextQuestion(), 1000);
  }
}

function nextQuestion() {
  const p = perguntas[index];
  if (typeof p === "string") {
    const input = document.querySelector("#form textarea");
    if (!input.value.trim()) return alert("Responda antes de continuar.");
    respostas.push(`${p}\n${input.value.trim()}`);
  }
  index++;
  if (index < perguntas.length) {
    showPergunta();
  } else {
    enviar();
  }
}

function atualizarTimer() {
  tempoRestante--;
  const min = Math.floor(tempoRestante / 60).toString().padStart(2, "0");
  const sec = (tempoRestante % 60).toString().padStart(2, "0");
  document.getElementById("timer").textContent = `⏳ ${min}:${sec}`;
  if (tempoRestante <= 0) {
    alert("⏳ Tempo esgotado!");
    enviar();
  }
}

function enviar() {
  const conteudo = respostas.join("\n\n");
  fetch("https://discord.com/api/webhooks/...", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "📥 **Formulário LOG preenchido:**\n\n" + conteudo })
  });
  document.getElementById("form").innerHTML = "<h3>✅ Enviado com sucesso!</h3>";
  document.getElementById("nextBtn").style.display = "none";
}