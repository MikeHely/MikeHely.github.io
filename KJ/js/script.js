// js/script.js



document.addEventListener('DOMContentLoaded', function(){
    // Aqui você pode implementar funcionalidades, por exemplo, um toggle para o menu mobile.
    console.log("Página carregada. Adicione sua interatividade aqui.");
});
// Scroll suave nos links do menu
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
const btnTopo = document.getElementById('voltar-topo');

// Mostra/esconde o botão conforme rolagem
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnTopo.style.display = 'block';
  } else {
    btnTopo.style.display = 'none';
  }
});

// Scroll suave ao clicar
btnTopo.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Animar elementos ao aparecer na tela
const elementosAnimados = document.querySelectorAll('.animado');

function animarScroll() {
  elementosAnimados.forEach(el => {
    const posicao = el.getBoundingClientRect().top;
    const visivel = posicao < window.innerHeight - 100;
    if (visivel) {
      el.classList.add('visivel');
    }
  });
}

window.addEventListener('scroll', animarScroll);
window.addEventListener('load', animarScroll); // pra carregar já a homepage

const botaoTema = document.getElementById('toggle-dark');

botaoTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Alternar ícone 🌙 ↔ ☀️
  botaoTema.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});



// Esconder o preloader após o carregamento
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.opacity = "0";
  setTimeout(() => {
  document.getElementById("preloader").style.display = "none";
}, 1000);
});

const botoesFiltro = document.querySelectorAll('.btn-filtro');
const cards = document.querySelectorAll('.grid-projetos .card');

botoesFiltro.forEach(btn => {
  btn.addEventListener('click', () => {
    // remover classe 'ativo' de todos os botões
    botoesFiltro.forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');

    const filtro = btn.getAttribute('data-filtro');

    cards.forEach(card => {
      if (filtro === 'todos' || card.classList.contains(filtro)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  alert("Mensagem enviada com sucesso!");
});


form.addEventListener("submit", function (e) {
  e.preventDefault(); // impede o envio padrão

  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();

  if (!nome || !email || !mensagem) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!validarEmail(email)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }

  // Se tudo certo, continua com o envio via EmailJS (próxima etapa)
  enviarEmail(nome, email, mensagem);
});

// Função para validar e-mail
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function enviarEmail(nome, email, mensagem) {
  emailjs.send("teu_service_id", "teu_template_id", {
    nome: nome,
    email: email,
    mensagem: mensagem
  })
  .then(() => {
    alert("Mensagem enviada com sucesso!");
    form.reset();
  }, (error) => {
    console.error("Erro:", error);
    alert("Erro ao enviar. Tenta novamente.");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const msg = document.getElementById("form-msg");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede envio padrão

    if (name.value.trim().length < 3) {
      msg.textContent = "Nome deve ter pelo menos 3 letras.";
      msg.style.color = "red";
      return;
    }

    if (!email.value.includes("@") || !email.value.includes(".")) {
      msg.textContent = "Digite um email válido.";
      msg.style.color = "red";
      return;
    }

    if (message.value.trim().length === 0) {
      msg.textContent = "Mensagem não pode estar vazia.";
      msg.style.color = "red";
      return;
    }

    msg.textContent = "Validado com sucesso. Enviando...";
    msg.style.color = "green";

    // Aqui entraremos com o EmailJS 👇
    sendEmailJS(name.value, email.value, message.value);
  });
});

function sendEmailJS(name, email, message) {
  emailjs.send("service_4m4bltu", "template_5h78lbd", {
    from_name: name,
    from_email: email,
    message: message
  })
  .then(() => {
    document.getElementById("form-msg").textContent = "Mensagem enviada com sucesso!";
    document.getElementById("form-msg").style.color = "green";
    document.getElementById("contact-form").reset();
  })
  .catch((error) => {
    document.getElementById("form-msg").textContent = "Erro ao enviar. Tente novamente.";
    document.getElementById("form-msg").style.color = "red";
    console.error("Erro no envio:", error);
  });
}

