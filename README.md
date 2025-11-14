# Mini Pôneis LN - Sistema de Gestão PWA

Sistema completo de gestão para criadores de mini pôneis com controle de genealogia, reprodução, saúde e relatórios especializados.

## 🐎 Funcionalidades

### 📊 Dashboard
- Estatísticas do rebanho em tempo real
- Gestações ativas e próximos partos
- Receita total de vendas
- Resumo de atividades recentes

### 🐴 Gestão de Animais
- Cadastro completo com genealogia
- Campos de pai e mãe com seletores dinâmicos
- Controle de status (ativo, vendido, falecido, perdido)
- Lista organizada do rebanho

### 🧬 Genealogia
- Árvore genealógica visual
- Análise de consanguinidade inteligente
- Recomendações de acasalamento
- Histórico familiar completo

### 💕 Reprodução
- Fluxo realista: Cobertura → Gestação → Parto
- Cálculo automático da data prevista (11 meses)
- Controle de gestações ativas
- Histórico de coberturas

### 🍼 Controle de Partos
- Registro vinculado às gestações
- Criação automática de potros no rebanho
- Partos previstos baseados em gestações
- Histórico completo de nascimentos

### 📤 Saídas
- Registro de vendas com valor e comprador
- Controle de mortes e perdas
- Atualização automática do status dos animais
- Resumo financeiro de vendas

### 🏥 Saúde
- Controle veterinário completo
- Histórico de tratamentos
- Agenda de cuidados
- Registro de medicamentos

### 📋 Relatórios
- 6 tipos de relatórios especializados
- Análises de produtividade
- Relatórios financeiros
- Estatísticas do rebanho

### 💾 Backup
- Exportação de dados em JSON e CSV
- Importação de dados de backup
- Validação de estrutura
- Segurança das informações

## 📱 PWA (Progressive Web App)

- **Instalável**: Funciona como app nativo
- **Offline**: Funciona sem conexão com internet
- **Responsivo**: Adaptado para mobile e desktop
- **Rápido**: Cache inteligente para performance
- **Seguro**: Dados armazenados localmente

## 🚀 Como Usar

### GitHub Pages
1. Faça fork deste repositório
2. Vá em Settings → Pages
3. Source: Deploy from a branch
4. Branch: main / (root)
5. Acesse: `https://seu-usuario.github.io/nome-do-repo`

### Local
1. Clone o repositório
2. Abra `index.html` no navegador
3. Ou use um servidor local: `python -m http.server 8000`

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Design responsivo e moderno
- **JavaScript**: Funcionalidades interativas
- **Service Worker**: Cache offline
- **LocalStorage**: Persistência de dados
- **PWA**: Manifest e ícones

## 📂 Estrutura do Projeto

```
mini-poneis-pwa/
├── index.html              # Página principal
├── manifest.json           # Configuração PWA
├── sw.js                   # Service Worker
├── styles.css              # Estilos CSS
├── app.js                  # JavaScript principal
├── service-worker-register.js # Registro SW
├── icon-*.png              # Ícones PWA (10 tamanhos)
├── favicon.ico             # Favicon
├── README.md               # Documentação
└── LICENSE                 # Licença MIT
```

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte e dúvidas, abra uma issue no GitHub.

---

**Mini Pôneis LN** - Sistema profissional de gestão para criadores de mini pôneis 🐎
