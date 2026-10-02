/**
 * Aura Digital - Interactive Logic & UI Controllers
 * Focado em UX de alta conversão, simulações em tempo real e integração WhatsApp.
 * Integração com os projetos reais em produção (VPS Hostinger).
 */

// 1. Configuração Comercial Oficial da Aura Digital & Projetos Reais
const CONFIG = {
  // Número oficial de WhatsApp comercial (DDI + DDD + Número)
  whatsappNumber: "5527988721801", 
  companyName: "Aura Digital",
  defaultMessage: "Olá! Gostaria de solicitar um orçamento para o meu comércio com a equipe da Aura Digital.",
  
  // PROJETOS REAIS RODANDO NA INFRAESTRUTURA (VPS HOSTINGER):
  // 1. Cardápio Digital por QR Code
  qrMenuDemoUrl: "https://churrasquim-marcelim.tv4g2i.easypanel.host/",
  qrMenuProjectName: "Churrasquim do Marcelim | O Point de Santo Antônio",

  // 2. Aplicativo Personalizado de Delivery para Pizzarias
  pizzariaDemoUrl: "https://pizzaria-mineiro.tv4g2i.easypanel.host/",
  pizzariaProjectName: "Pizzaria do Mineiro | Cardápio Digital"
};

/**
 * Função utilitária para abrir o WhatsApp com mensagem formatada
 */
function openWhatsApp(customText) {
  const text = customText || CONFIG.defaultMessage;
  const encodedText = encodeURIComponent(text);
  const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedText}`;
  window.open(url, '_blank');
}

/**
 * Abre a demonstração do Cardápio Digital por QR Code (Link real no ar)
 */
function openQrDemo(e) {
  if (e) e.preventDefault();
  window.open(CONFIG.qrMenuDemoUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Abre a demonstração ou solicita acesso ao case da Pizzaria do Mineiro
 */
function openPizzariaDemo(e) {
  if (e) e.preventDefault();
  
  // Se for uma URL web válida (iniciando com http/https), abre direto
  if (typeof CONFIG.pizzariaDemoUrl === 'string' && CONFIG.pizzariaDemoUrl.startsWith('http')) {
    window.open(CONFIG.pizzariaDemoUrl, '_blank', 'noopener,noreferrer');
  } else {
    // Caso contrário, abre o WhatsApp solicitando a demonstração exclusiva do projeto
    const msg = `Olá! Vi o case real da *${CONFIG.pizzariaProjectName}* no site da Aura Digital e gostaria de ver a demonstração completa do app de delivery e solicitar um orçamento para meu negócio.`;
    openWhatsApp(msg);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMobileNav() {
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Sticky Navbar Scroll Effect
  const mainNavbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainNavbar.classList.add('bg-slate-950/90', 'shadow-lg', 'shadow-black/40', 'border-slate-800/80');
      mainNavbar.classList.remove('bg-transparent', 'border-transparent');
    } else {
      mainNavbar.classList.remove('bg-slate-950/90', 'shadow-lg', 'shadow-black/40', 'border-slate-800/80');
      mainNavbar.classList.add('bg-transparent', 'border-transparent');
    }
  });

  // Calculadora de Economia vs Marketplaces (iFood, Rappi, etc.)
  const revenueSlider = document.getElementById('revenueSlider');
  const revenueValue = document.getElementById('revenueValue');
  const lossMonth = document.getElementById('lossMonth');
  const lossYear = document.getElementById('lossYear');
  const savingsCallout = document.getElementById('savingsCallout');

  function updateSavings() {
    if (!revenueSlider) return;
    const rev = parseFloat(revenueSlider.value);
    
    // Formatação BRL
    const formatBRL = (val) => {
      return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    revenueValue.textContent = formatBRL(rev);
    
    // Média de 25% de taxa cobrada por marketplaces no plano básico + entrega/transação
    const monthlyFeeLost = rev * 0.25;
    const yearlyFeeLost = monthlyFeeLost * 12;

    lossMonth.textContent = formatBRL(monthlyFeeLost);
    lossYear.textContent = formatBRL(yearlyFeeLost);
    
    if (savingsCallout) {
      savingsCallout.innerHTML = `Você recupera até <strong class="text-emerald-400 font-bold">${formatBRL(yearlyFeeLost)}</strong> todos os anos diretamente no caixa do seu negócio com a Aura Digital.`;
    }
  }

  if (revenueSlider) {
    revenueSlider.addEventListener('input', updateSavings);
    updateSavings(); // Inicializar
  }

  // Interação do Simulador no Modal (Opcional para teste visual rápido)
  const openQrDemoBtn = document.getElementById('openQrDemoBtn');
  const openAppDemoBtn = document.getElementById('openAppDemoBtn');
  const demoModal = document.getElementById('demoModal');
  const closeDemoModalBtn = document.getElementById('closeDemoModalBtn');
  const demoModalTitle = document.getElementById('demoModalTitle');
  const demoModalSubtitle = document.getElementById('demoModalSubtitle');
  const demoPhoneFrame = document.getElementById('demoPhoneFrame');

  function openDemoModal(type) {
    if (!demoModal) return;
    demoModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    if (type === 'qrcode') {
      demoModalTitle.textContent = "Case Real: Churrasquim do Marcelim";
      demoModalSubtitle.textContent = "Cardápio Digital Mobile-First rodando em VPS dedicada";
      renderQrMenuDemo();
    } else {
      demoModalTitle.textContent = "Case Real: Pizzaria do Mineiro";
      demoModalSubtitle.textContent = "App de Delivery Próprio sem taxas de marketplaces";
      renderDeliveryAppDemo();
    }
  }

  // Fechar modal ao clicar no botão ou fora dele
  if (closeDemoModalBtn) {
    closeDemoModalBtn.addEventListener('click', () => {
      demoModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        demoModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }

  function renderQrMenuDemo() {
    if (!demoPhoneFrame) return;
    demoPhoneFrame.innerHTML = `
      <div class="p-4 bg-slate-900 border-b border-slate-800 text-left">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
            <span class="text-xs font-semibold text-emerald-400">Ao Vivo na VPS • Mesa 04</span>
          </div>
          <span class="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded-full border border-sky-500/20">Produção</span>
        </div>
        <h4 class="font-bold text-white text-base">Churrasquim do Marcelim</h4>
        <p class="text-xs text-slate-400">O Point de Santo Antônio</p>
      </div>

      <div class="p-4 space-y-3 text-left">
        <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex gap-3 items-center">
          <div class="w-12 h-12 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl shrink-0">🍢</div>
          <div class="flex-1 min-w-0">
            <h5 class="text-xs font-bold text-white truncate">Espeto de Picanha Grill</h5>
            <p class="text-[11px] text-slate-400">Acompanha farofa de bacon e vinagrete especial.</p>
            <span class="text-xs font-bold text-emerald-400">R$ 24,90</span>
          </div>
        </div>

        <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex gap-3 items-center">
          <div class="w-12 h-12 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-xl shrink-0">🍺</div>
          <div class="flex-1 min-w-0">
            <h5 class="text-xs font-bold text-white truncate">Chopp Artesanal 500ml</h5>
            <p class="text-[11px] text-slate-400">Cerveja bem gelada na caneca congelada.</p>
            <span class="text-xs font-bold text-sky-400">R$ 14,00</span>
          </div>
        </div>

        <div class="pt-2">
          <a href="${CONFIG.qrMenuDemoUrl}" target="_blank" rel="noopener noreferrer" class="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 hover:scale-[1.02] transition">
            <span>Abrir Sistema Completo no Ar</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>
      </div>
    `;
  }

  function renderDeliveryAppDemo() {
    if (!demoPhoneFrame) return;
    demoPhoneFrame.innerHTML = `
      <div class="p-4 bg-gradient-to-r from-red-950/80 to-slate-900 border-b border-slate-800 text-left">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[11px] font-bold text-red-400 flex items-center gap-1">🍕 Pizzaria do Mineiro</span>
          <span class="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">Delivery Ativo</span>
        </div>
        <h4 class="font-bold text-white text-base">Cardápio Digital & Delivery</h4>
        <p class="text-xs text-slate-300">Pedidos diretos no WhatsApp sem taxa de 27%</p>
      </div>

      <div class="p-4 space-y-3 text-left">
        <div class="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex gap-3 items-center">
          <div class="w-12 h-12 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-xl shrink-0">🍕</div>
          <div class="flex-1 min-w-0">
            <h5 class="text-xs font-bold text-white truncate">Pizza Especial Mineiro</h5>
            <p class="text-[11px] text-slate-400">Lombo defumado, requeijão cremoso e cebola caramelizada.</p>
            <span class="text-xs font-bold text-emerald-400">R$ 58,90</span>
          </div>
        </div>

        <div class="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
          ✓ Margem 100% no caixa da pizzaria (Zero comissões a intermediários).
        </div>

        <div class="pt-2">
          <button onclick="openPizzariaDemo()" class="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition">
            <i data-lucide="message-circle" class="w-4 h-4 fill-slate-950"></i>
            <span>Solicitar Orçamento Deste App</span>
          </button>
        </div>
      </div>
    `;
  }

  // FAQ Accordion
  const accordionButtons = document.querySelectorAll('.accordion-btn');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.accordion-icon');
      const isOpen = content.classList.contains('open');

      document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.accordion-icon').forEach(i => i.classList.remove('rotated'));

      if (!isOpen) {
        content.classList.add('open');
        if (icon) icon.classList.add('rotated');
      }
    });
  });

  // Formulário de Contato Rápido para o WhatsApp com campos estruturados
  const quickLeadForm = document.getElementById('quickLeadForm');
  if (quickLeadForm) {
    quickLeadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('leadName')?.value || 'Amigo';
      const segment = document.getElementById('leadSegment')?.value || 'Comércio Local';
      const city = document.getElementById('leadCity')?.value || 'Minha Cidade';
      
      const message = `Olá Aura Digital! Meu nome é *${name}*, proprietário de um estabelecimento no segmento *${segment}* em *${city}*.\n\nVi os projetos reais em produção (Churrasquim do Marcelim e Pizzaria do Mineiro) e gostaria de solicitar um orçamento para o meu negócio!`;
      
      openWhatsApp(message);
    });
  }
});
