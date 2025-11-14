// Dados do sistema
let animais = JSON.parse(localStorage.getItem('animais')) || [];
let coberturas = JSON.parse(localStorage.getItem('coberturas')) || [];
let gestacoes = JSON.parse(localStorage.getItem('gestacoes')) || [];
let partos = JSON.parse(localStorage.getItem('partos')) || [];
let saidas = JSON.parse(localStorage.getItem('saidas')) || [];
let saude = JSON.parse(localStorage.getItem('saude')) || [];
let procedimentos = JSON.parse(localStorage.getItem('procedimentos')) || [];

// Função para salvar dados
function salvarDados() {
    localStorage.setItem('animais', JSON.stringify(animais));
    localStorage.setItem('coberturas', JSON.stringify(coberturas));
    localStorage.setItem('gestacoes', JSON.stringify(gestacoes));
    localStorage.setItem('partos', JSON.stringify(partos));
    localStorage.setItem('saidas', JSON.stringify(saidas));
    localStorage.setItem('saude', JSON.stringify(saude));
    localStorage.setItem('procedimentos', JSON.stringify(procedimentos));
}

// Navegação entre seções
function mostrarSecao(sectionId) {
    // Ocultar todas as seções (tanto .section quanto .module-section)
    document.querySelectorAll('.section, .module-section').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    
    // Remover classe active de todos os botões de navegação
    document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
    
    // Mostrar a seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.style.display = 'block';
    }
    
    // Adicionar classe active ao botão clicado
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    // Atualizar conteúdo específico de cada seção
    if (sectionId === 'dashboard') atualizarDashboard();
    if (sectionId === 'animais') atualizarListaAnimais();
    if (sectionId === 'genealogia') atualizarSeletoresGenealogia();
    if (sectionId === 'reproducao') atualizarReproducao();
    if (sectionId === 'partos') atualizarPartos();
    if (sectionId === 'saidas') atualizarSaidas();
    if (sectionId === 'saude') atualizarSaude();
}

// Dashboard
function atualizarDashboard() {
    const totalAnimais = animais.length;
    const animaisAtivos = animais.filter(a => a.status === 'Ativo').length;
    const machos = animais.filter(a => a.sexo === 'Macho' && a.status === 'Ativo').length;
    const femeas = animais.filter(a => a.sexo === 'Fêmea' && a.status === 'Ativo').length;
    const gestacaoesAtivas = gestacoes.length;
    
    // Nascimentos do mês atual
    const agora = new Date();
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const nascimentosMes = partos.filter(p => new Date(p.data) >= inicioMes).length;
    
    document.getElementById('total-animais').textContent = totalAnimais;
    document.getElementById('animais-ativos').textContent = animaisAtivos;
    document.getElementById('total-machos').textContent = machos;
    document.getElementById('total-femeas').textContent = femeas;
    document.getElementById('gestacoes-ativas').textContent = gestacaoesAtivas;
    document.getElementById('nascimentos-mes').textContent = nascimentosMes;
    
    // Resumo inteligente
    let resumo = '';
    if (totalAnimais === 0) {
        resumo = 'Bem-vindo ao sistema! Comece cadastrando seus primeiros animais.';
    } else {
        resumo = `Você possui ${totalAnimais} animais cadastrados, sendo ${animaisAtivos} ativos. `;
        if (gestacaoesAtivas > 0) {
            resumo += `Há ${gestacaoesAtivas} gestação(ões) em andamento. `;
        }
        if (nascimentosMes > 0) {
            resumo += `${nascimentosMes} nascimento(s) este mês.`;
        }
    }
    
    document.getElementById('resumo-inteligente').textContent = resumo;
}

// Animais
function cadastrarAnimal() {
    const nome = document.getElementById('nome-animal').value;
    const sexo = document.getElementById('sexo-animal').value;
    const raca = document.getElementById('raca-animal').value;
    const nascimento = document.getElementById('nascimento-animal').value;
    const pai = document.getElementById('pai-animal').value;
    const mae = document.getElementById('mae-animal').value;
    const cor = document.getElementById('cor-animal').value;
    const obs = document.getElementById('obs-animal').value;
    
    if (!nome || !sexo || !nascimento) {
        alert('Por favor, preencha os campos obrigatórios: Nome, Sexo e Data de Nascimento.');
        return;
    }
    
    const animal = {
        id: Date.now(),
        nome,
        sexo,
        raca: raca || 'Sem Raça Definida',
        nascimento,
        pai: pai || 'Não informado',
        mae: mae || 'Não informado',
        cor: cor || 'Não informado',
        observacoes: obs,
        status: 'Ativo',
        dataCadastro: new Date().toISOString()
    };
    
    animais.push(animal);
    salvarDados();
    
    // Limpar formulário
    document.getElementById('nome-animal').value = '';
    document.getElementById('sexo-animal').value = '';
    document.getElementById('raca-animal').value = '';
    document.getElementById('nascimento-animal').value = '';
    document.getElementById('pai-animal').value = '';
    document.getElementById('mae-animal').value = '';
    document.getElementById('cor-animal').value = '';
    document.getElementById('obs-animal').value = '';
    
    atualizarListaAnimais();
    atualizarSeletoresPais();
    alert('Animal cadastrado com sucesso!');
}

function atualizarListaAnimais() {
    const lista = document.getElementById('lista-animais');
    
    if (animais.length === 0) {
        lista.innerHTML = '<p>Nenhum animal cadastrado ainda.</p>';
        return;
    }
    
    lista.innerHTML = animais.map(animal => `
        <div class="animal-card">
            <div class="animal-header">
                <div class="animal-name">${animal.nome}</div>
                <div class="animal-status status-${animal.status.toLowerCase()}">${animal.status}</div>
            </div>
            <div class="animal-info">
                <div class="info-item">
                    <span class="info-label">Sexo:</span>
                    <span class="info-value">${animal.sexo}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Raça:</span>
                    <span class="info-value">${animal.raca}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Nascimento:</span>
                    <span class="info-value">${new Date(animal.nascimento).toLocaleDateString()}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Pai:</span>
                    <span class="info-value">${animal.pai}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Mãe:</span>
                    <span class="info-value">${animal.mae}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Cor:</span>
                    <span class="info-value">${animal.cor}</span>
                </div>
            </div>
            ${animal.status === 'Ativo' ? `<button onclick="excluirAnimal(${animal.id})" style="background: #dc3545;">Excluir</button>` : ''}
        </div>
    `).join('');
}

function excluirAnimal(id) {
    if (confirm('Tem certeza que deseja excluir este animal?')) {
        animais = animais.filter(a => a.id !== id);
        salvarDados();
        atualizarListaAnimais();
        atualizarSeletoresPais();
    }
}

function atualizarSeletoresPais() {
    const seletorPai = document.getElementById('pai-animal');
    const seletorMae = document.getElementById('mae-animal');
    
    // Limpar opções
    seletorPai.innerHTML = '<option value="">Não informado</option>';
    seletorMae.innerHTML = '<option value="">Não informado</option>';
    
    // Adicionar machos como opções de pai
    animais.filter(a => a.sexo === 'Macho' && a.status === 'Ativo').forEach(animal => {
        seletorPai.innerHTML += `<option value="${animal.nome}">${animal.nome}</option>`;
    });
    
    // Adicionar fêmeas como opções de mãe
    animais.filter(a => a.sexo === 'Fêmea' && a.status === 'Ativo').forEach(animal => {
        seletorMae.innerHTML += `<option value="${animal.nome}">${animal.nome}</option>`;
    });
}

// Genealogia
function atualizarSeletoresGenealogia() {
    const seletorAnimal = document.getElementById('animal-genealogia');
    const seletorMacho = document.getElementById('macho-consanguinidade');
    const seletorFemea = document.getElementById('femea-consanguinidade');
    
    // Limpar seletores
    seletorAnimal.innerHTML = '<option value="">Selecione um animal</option>';
    seletorMacho.innerHTML = '<option value="">Selecione o macho</option>';
    seletorFemea.innerHTML = '<option value="">Selecione a fêmea</option>';
    
    // Preencher seletores
    animais.filter(a => a.status === 'Ativo').forEach(animal => {
        seletorAnimal.innerHTML += `<option value="${animal.id}">${animal.nome}</option>`;
        
        if (animal.sexo === 'Macho') {
            seletorMacho.innerHTML += `<option value="${animal.id}">${animal.nome}</option>`;
        } else {
            seletorFemea.innerHTML += `<option value="${animal.id}">${animal.nome}</option>`;
        }
    });
}

function mostrarArvoreGenealogia() {
    const animalId = document.getElementById('animal-genealogia').value;
    const arvore = document.getElementById('arvore-genealogica');
    
    if (!animalId) {
        arvore.innerHTML = '';
        return;
    }
    
    const animal = animais.find(a => a.id == animalId);
    if (!animal) return;
    
    let html = `
        <div class="arvore-genealogica">
            <h4>Árvore Genealógica de ${animal.nome}</h4>
            
            <div class="nivel-genealogia">
                <h5>Avós Paternos</h5>
                <div class="ancestral">
                    <div class="ancestral-nome">Avô Paterno</div>
                    <div class="ancestral-info">-</div>
                </div>
                <div class="ancestral">
                    <div class="ancestral-nome">Avó Paterna</div>
                    <div class="ancestral-info">-</div>
                </div>
                
                <h5>Avós Maternos</h5>
                <div class="ancestral">
                    <div class="ancestral-nome">Avô Materno</div>
                    <div class="ancestral-info">-</div>
                </div>
                <div class="ancestral">
                    <div class="ancestral-nome">Avó Materna</div>
                    <div class="ancestral-info">-</div>
                </div>
            </div>
            
            <div class="nivel-genealogia">
                <h5>Pais</h5>
                <div class="ancestral">
                    <div class="ancestral-nome">Pai</div>
                    <div class="ancestral-info">${animal.pai}</div>
                </div>
                <div class="ancestral">
                    <div class="ancestral-nome">Mãe</div>
                    <div class="ancestral-info">${animal.mae}</div>
                </div>
            </div>
            
            <div class="nivel-genealogia">
                <div class="ancestral" style="background: #4a5d23; color: white;">
                    <div class="ancestral-nome">${animal.nome}</div>
                    <div class="ancestral-info">${animal.sexo}</div>
                </div>
            </div>
        </div>
    `;
    
    arvore.innerHTML = html;
}

function analisarConsanguinidade() {
    const machoId = document.getElementById('macho-consanguinidade').value;
    const femeaId = document.getElementById('femea-consanguinidade').value;
    const resultado = document.getElementById('resultado-consanguinidade');
    
    if (!machoId || !femeaId) {
        alert('Por favor, selecione tanto o macho quanto a fêmea para análise.');
        return;
    }
    
    const macho = animais.find(a => a.id == machoId);
    const femea = animais.find(a => a.id == femeaId);
    
    if (!macho || !femea) {
        resultado.innerHTML = '<div class="alerta-consanguinidade">Erro: Animais não encontrados.</div>';
        return;
    }
    
    let html = `<h4>Análise de Consanguinidade: ${macho.nome} x ${femea.nome}</h4>`;
    
    // Verificar se ambos têm informações de pais
    const machoTemPais = macho.pai !== 'Não informado' && macho.mae !== 'Não informado';
    const femeaTemPais = femea.pai !== 'Não informado' && femea.mae !== 'Não informado';
    
    if (!machoTemPais && !femeaTemPais) {
        html += `
            <div class="alerta-consanguinidade info">
                <strong>ℹ️ INFORMAÇÃO INSUFICIENTE:</strong> Informação de parentesco insuficiente para análise. 
                Nenhum dos animais possui informações de pai ou mãe registradas.
            </div>
        `;
    } else if (!machoTemPais || !femeaTemPais) {
        html += `
            <div class="alerta-consanguinidade info">
                <strong>ℹ️ INFORMAÇÃO PARCIAL:</strong> Análise limitada devido à falta de informações genealógicas completas.
            </div>
        `;
    } else {
        // Verificar consanguinidade
        const saoIrmaos = (macho.pai === femea.pai && macho.pai !== 'Não informado') || 
                         (macho.mae === femea.mae && macho.mae !== 'Não informado');
        
        if (saoIrmaos) {
            html += `
                <div class="alerta-consanguinidade warning">
                    <strong>⚠️ ATENÇÃO:</strong> Animais são irmãos (mesmo pai ou mesma mãe). 
                    Acasalamento deve ser evitado.
                </div>
            `;
        } else {
            html += `
                <div class="alerta-consanguinidade success">
                    <strong>✅ RECOMENDADO:</strong> Não foi detectada consanguinidade direta entre os animais. 
                    Acasalamento pode ser realizado.
                </div>
            `;
        }
    }
    
    resultado.innerHTML = html;
}

// Reprodução
function atualizarReproducao() {
    atualizarSeletoresReproducao();
    atualizarCoberturasRegistradas();
    atualizarGestacoesAtivas();
    atualizarHistoricoCoberturas();
}

function atualizarSeletoresReproducao() {
    const seletorFemea = document.getElementById('femea-cobertura');
    const seletorMacho = document.getElementById('macho-cobertura');
    
    seletorFemea.innerHTML = '<option value="">Selecione a fêmea</option>';
    seletorMacho.innerHTML = '<option value="">Selecione o macho</option>';
    
    animais.filter(a => a.status === 'Ativo').forEach(animal => {
        if (animal.sexo === 'Fêmea') {
            seletorFemea.innerHTML += `<option value="${animal.id}">${animal.nome}</option>`;
        } else {
            seletorMacho.innerHTML += `<option value="${animal.id}">${animal.nome}</option>`;
        }
    });
}

function registrarCobertura() {
    const femeaId = document.getElementById('femea-cobertura').value;
    const machoId = document.getElementById('macho-cobertura').value;
    const data = document.getElementById('data-cobertura').value;
    const obs = document.getElementById('obs-cobertura').value;
    
    if (!femeaId || !machoId || !data) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    const femea = animais.find(a => a.id == femeaId);
    const macho = animais.find(a => a.id == machoId);
    
    const cobertura = {
        id: Date.now(),
        femeaId,
        machoId,
        femeaNome: femea.nome,
        machoNome: macho.nome,
        data,
        observacoes: obs,
        status: 'Registrada',
        dataRegistro: new Date().toISOString()
    };
    
    coberturas.push(cobertura);
    salvarDados();
    
    // Limpar formulário
    document.getElementById('femea-cobertura').value = '';
    document.getElementById('macho-cobertura').value = '';
    document.getElementById('data-cobertura').value = '';
    document.getElementById('obs-cobertura').value = '';
    
    atualizarReproducao();
    alert('Cobertura registrada com sucesso!');
}

function confirmarGestacao(coberturaId) {
    const cobertura = coberturas.find(c => c.id === coberturaId);
    if (!cobertura) return;
    
    // Calcular data prevista do parto (11 meses = 335 dias)
    const dataCobertura = new Date(cobertura.data);
    const dataPrevistaParto = new Date(dataCobertura);
    dataPrevistaParto.setDate(dataPrevistaParto.getDate() + 335);
    
    const gestacao = {
        id: Date.now(),
        coberturaId: cobertura.id,
        femeaId: cobertura.femeaId,
        machoId: cobertura.machoId,
        femeaNome: cobertura.femeaNome,
        machoNome: cobertura.machoNome,
        dataCobertura: cobertura.data,
        dataPrevistaParto: dataPrevistaParto.toISOString().split('T')[0],
        status: 'Ativa',
        dataConfirmacao: new Date().toISOString()
    };
    
    gestacoes.push(gestacao);
    
    // Remover cobertura da lista de registradas
    coberturas = coberturas.filter(c => c.id !== coberturaId);
    
    salvarDados();
    atualizarReproducao();
    alert('Gestação confirmada com sucesso!');
}

function atualizarCoberturasRegistradas() {
    const container = document.getElementById('coberturas-registradas');
    
    if (coberturas.length === 0) {
        container.innerHTML = '<p>Nenhuma cobertura aguardando confirmação.</p>';
        return;
    }
    
    container.innerHTML = coberturas.map(cobertura => `
        <div class="animal-card">
            <div class="animal-header">
                <div class="animal-name">${cobertura.femeaNome} x ${cobertura.machoNome}</div>
                <button onclick="confirmarGestacao(${cobertura.id})" style="background: #28a745;">Confirmar Gestação</button>
            </div>
            <div class="animal-info">
                <div class="info-item">
                    <span class="info-label">Data:</span>
                    <span class="info-value">${new Date(cobertura.data).toLocaleDateString()}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Status:</span>
                    <span class="info-value">${cobertura.status}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function atualizarGestacoesAtivas() {
    const container = document.getElementById('gestacoes-ativas');
    
    if (gestacoes.length === 0) {
        container.innerHTML = '<p>Nenhuma gestação ativa no momento.</p>';
        return;
    }
    
    container.innerHTML = gestacoes.map(gestacao => `
        <div class="animal-card">
            <div class="animal-header">
                <div class="animal-name">${gestacao.femeaNome} x ${gestacao.machoNome}</div>
                <div class="animal-status status-ativo">Gestação Ativa</div>
            </div>
            <div class="animal-info">
                <div class="info-item">
                    <span class="info-label">Data da Cobertura:</span>
                    <span class="info-value">${new Date(gestacao.dataCobertura).toLocaleDateString()}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Parto Previsto:</span>
                    <span class="info-value">${new Date(gestacao.dataPrevistaParto).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function atualizarHistoricoCoberturas() {
    const container = document.getElementById('historico-coberturas');
    
    const todasCoberturas = [...coberturas, ...gestacoes];
    
    if (todasCoberturas.length === 0) {
        container.innerHTML = '<p>Nenhuma cobertura registrada.</p>';
        return;
    }
    
    container.innerHTML = todasCoberturas.map(item => `
        <div class="animal-card">
            <div class="animal-header">
                <div class="animal-name">${item.femeaNome} x ${item.machoNome}</div>
                <div class="animal-status">${item.status || 'Registrada'}</div>
            </div>
            <div class="animal-info">
                <div class="info-item">
                    <span class="info-label">Data:</span>
                    <span class="info-value">${new Date(item.dataCobertura || item.data).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Partos
function atualizarPartos() {
    atualizarSeletoresPartos();
    atualizarPartosPrevistos();
    atualizarHistoricoPartos();
}

function atualizarSeletoresPartos() {
    const seletorMae = document.getElementById('mae-parto');
    const seletorPai = document.getElementById('pai-parto');
    
    seletorMae.innerHTML = '<option value="">Selecione a mãe</option>';
    seletorPai.innerHTML = '<option value="">Selecione o pai</option>';
    
    animais.filter(a => a.status === 'Ativo').forEach(animal => {
        if (animal.sexo === 'Fêmea') {
            seletorMae.innerHTML += `<option value="${animal.id}">${animal.nome}</option>`;
        } else {
            seletorPai.innerHTML += `<option value="${animal.id}">${animal.nome}</option>`;
        }
    });
}

function registrarParto() {
    const maeId = document.getElementById('mae-parto').value;
    const paiId = document.getElementById('pai-parto').value;
    const data = document.getElementById('data-parto').value;
    const nomePotro = document.getElementById('nome-potro').value;
    const sexoPotro = document.getElementById('sexo-potro').value;
    const obs = document.getElementById('obs-parto').value;
    
    if (!maeId || !paiId || !data || !nomePotro || !sexoPotro) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    const mae = animais.find(a => a.id == maeId);
    const pai = animais.find(a => a.id == paiId);
    
    // Registrar o parto
    const parto = {
        id: Date.now(),
        maeId,
        paiId,
        maeNome: mae.nome,
        paiNome: pai.nome,
        data,
        nomePotro,
        sexoPotro,
        observacoes: obs,
        dataRegistro: new Date().toISOString()
    };
    
    partos.push(parto);
    
    // Criar o potro automaticamente
    const potro = {
        id: Date.now() + 1,
        nome: nomePotro,
        sexo: sexoPotro,
        raca: mae.raca,
        nascimento: data,
        pai: pai.nome,
        mae: mae.nome,
        cor: 'A definir',
        observacoes: `Nascido de ${mae.nome} x ${pai.nome}`,
        status: 'Ativo',
        dataCadastro: new Date().toISOString()
    };
    
    animais.push(potro);
    
    // Remover gestação se existir
    gestacoes = gestacoes.filter(g => g.femeaId != maeId || g.machoId != paiId);
    
    salvarDados();
    
    // Limpar formulário
    document.getElementById('mae-parto').value = '';
    document.getElementById('pai-parto').value = '';
    document.getElementById('data-parto').value = '';
    document.getElementById('nome-potro').value = '';
    document.getElementById('sexo-potro').value = '';
    document.getElementById('obs-parto').value = '';
    
    atualizarPartos();
    alert('Parto registrado e potro adicionado ao rebanho com sucesso!');
}

function atualizarPartosPrevistos() {
    const container = document.getElementById('partos-previstos');
    
    if (gestacoes.length === 0) {
        container.innerHTML = '<p>Nenhum parto próximo baseado nas gestações ativas.</p>';
        return;
    }
    
    container.innerHTML = gestacoes.map(gestacao => `
        <div class="animal-card">
            <div class="animal-header">
                <div class="animal-name">${gestacao.femeaNome} x ${gestacao.machoNome}</div>
                <button onclick="registrarPartoRapido(${gestacao.id})" style="background: #17a2b8;">Registrar Parto</button>
            </div>
            <div class="animal-info">
                <div class="info-item">
                    <span class="info-label">Data Prevista:</span>
                    <span class="info-value">${new Date(gestacao.dataPrevistaParto).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function registrarPartoRapido(gestacaoId) {
    const gestacao = gestacoes.find(g => g.id === gestacaoId);
    if (!gestacao) return;
    
    const nomePotro = prompt('Nome do potro:');
    const sexoPotro = prompt('Sexo do potro (Macho/Fêmea):');
    
    if (!nomePotro || !sexoPotro) {
        alert('Nome e sexo são obrigatórios.');
        return;
    }
    
    // Preencher formulário automaticamente
    document.getElementById('mae-parto').value = gestacao.femeaId;
    document.getElementById('pai-parto').value = gestacao.machoId;
    document.getElementById('data-parto').value = new Date().toISOString().split('T')[0];
    document.getElementById('nome-potro').value = nomePotro;
    document.getElementById('sexo-potro').value = sexoPotro;
    
    // Registrar parto
    registrarParto();
}

function atualizarHistoricoPartos() {
    const container = document.getElementById('historico-partos');
    
    if (partos.length === 0) {
        container.innerHTML = '<p>Nenhum parto registrado.</p>';
        return;
    }
    
    container.innerHTML = partos.map(parto => `
        <div class="animal-card">
            <div class="animal-header">
                <div class="animal-name">${parto.nomePotro}</div>
                <div class="animal-status status-ativo">Nascido</div>
            </div>
            <div class="animal-info">
                <div class="info-item">
                    <span class="info-label">Pais:</span>
                    <span class="info-value">${parto.maeNome} x ${parto.paiNome}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Data:</span>
                    <span class="info-value">${new Date(parto.data).toLocaleDateString()}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Sexo:</span>
                    <span class="info-value">${parto.sexoPotro}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Saídas
function atualizarSaidas() {
    atualizarSeletorSaidas();
    atualizarResumoFinanceiro();
    atualizarHistoricoSaidas();
}

function atualizarSeletorSaidas() {
    const seletor = document.getElementById('animal-saida');
    seletor.innerHTML = '<option value="">Selecione o animal</option>';
    
    animais.filter(a => a.status === 'Ativo').forEach(animal => {
        seletor.innerHTML += `<option value="${animal.id}">${animal.nome}</option>`;
    });
}

function mostrarCamposVenda() {
    const tipo = document.getElementById('tipo-saida').value;
    const campos = document.getElementById('campos-venda');
    
    if (tipo === 'Venda') {
        campos.style.display = 'block';
    } else {
        campos.style.display = 'none';
    }
}

function registrarSaida() {
    const animalId = document.getElementById('animal-saida').value;
    const tipo = document.getElementById('tipo-saida').value;
    const data = document.getElementById('data-saida').value;
    const valor = document.getElementById('valor-venda').value;
    const comprador = document.getElementById('comprador').value;
    const obs = document.getElementById('obs-saida').value;
    
    if (!animalId || !tipo || !data) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    const animal = animais.find(a => a.id == animalId);
    
    const saida = {
        id: Date.now(),
        animalId,
        animalNome: animal.nome,
        tipo,
        data,
        valor: tipo === 'Venda' ? parseFloat(valor) || 0 : 0,
        comprador: tipo === 'Venda' ? comprador : '',
        observacoes: obs,
        dataRegistro: new Date().toISOString()
    };
    
    saidas.push(saida);
    
    // Atualizar status do animal
    animal.status = tipo === 'Venda' ? 'Vendido' : tipo === 'Morte' ? 'Falecido' : 'Perdido';
    
    salvarDados();
    
    // Limpar formulário
    document.getElementById('animal-saida').value = '';
    document.getElementById('tipo-saida').value = '';
    document.getElementById('data-saida').value = '';
    document.getElementById('valor-venda').value = '';
    document.getElementById('comprador').value = '';
    document.getElementById('obs-saida').value = '';
    
    mostrarCamposVenda(); // Ocultar campos de venda
    atualizarSaidas();
    alert('Saída registrada com sucesso!');
}

function atualizarResumoFinanceiro() {
    const vendas = saidas.filter(s => s.tipo === 'Venda');
    const totalVendas = vendas.length;
    const receitaTotal = vendas.reduce((total, venda) => total + venda.valor, 0);
    
    document.getElementById('total-vendas').textContent = totalVendas;
    document.getElementById('receita-total').textContent = `R$ ${receitaTotal.toFixed(2).replace('.', ',')}`;
}

function atualizarHistoricoSaidas() {
    const container = document.getElementById('historico-saidas');
    
    if (saidas.length === 0) {
        container.innerHTML = '<p>Nenhuma saída registrada.</p>';
        return;
    }
    
    container.innerHTML = saidas.map(saida => `
        <div class="animal-card">
            <div class="animal-header">
                <div class="animal-name">${saida.animalNome}</div>
                <div class="animal-status">${saida.tipo}</div>
            </div>
            <div class="animal-info">
                <div class="info-item">
                    <span class="info-label">Data:</span>
                    <span class="info-value">${new Date(saida.data).toLocaleDateString()}</span>
                </div>
                ${saida.tipo === 'Venda' ? `
                    <div class="info-item">
                        <span class="info-label">Valor:</span>
                        <span class="info-value">R$ ${saida.valor.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Comprador:</span>
                        <span class="info-value">${saida.comprador}</span>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Saúde
function atualizarSaude() {
    atualizarSeletorSaude();
    atualizarHistoricoSaude();
}

function atualizarSeletorSaude() {
    const seletor = document.getElementById('animal-saude');
    seletor.innerHTML = '<option value="">Selecione o animal</option>';
    
    animais.filter(a => a.status === 'Ativo').forEach(animal => {
        seletor.innerHTML += `<option value="${animal.id}">${animal.nome}</option>`;
    });
}

function registrarProcedimento() {
    const animalId = document.getElementById('animal-saude').value;
    const tipo = document.getElementById('tipo-procedimento').value;
    const data = document.getElementById('data-procedimento').value;
    const veterinario = document.getElementById('veterinario').value;
    const medicamento = document.getElementById('medicamento').value;
    const obs = document.getElementById('obs-saude').value;
    
    if (!animalId || !tipo || !data) {
        alert('Por favor, preencha os campos obrigatórios: Animal, Tipo e Data.');
        return;
    }
    
    const animal = animais.find(a => a.id == animalId);
    
    const procedimento = {
        id: Date.now(),
        animalId,
        animalNome: animal.nome,
        tipo,
        data,
        veterinario: veterinario || 'Não informado',
        medicamento: medicamento || 'Não informado',
        observacoes: obs,
        dataRegistro: new Date().toISOString()
    };
    
    saude.push(procedimento);
    salvarDados();
    
    // Limpar formulário
    document.getElementById('animal-saude').value = '';
    document.getElementById('tipo-procedimento').value = '';
    document.getElementById('data-procedimento').value = '';
    document.getElementById('veterinario').value = '';
    document.getElementById('medicamento').value = '';
    document.getElementById('obs-saude').value = '';
    
    atualizarSaude();
    alert('Procedimento registrado com sucesso!');
}

function atualizarHistoricoSaude() {
    const container = document.getElementById('historico-saude');
    
    if (saude.length === 0) {
        container.innerHTML = '<p>Nenhum procedimento registrado.</p>';
        return;
    }
    
    container.innerHTML = saude.map(proc => `
        <div class="animal-card">
            <div class="animal-header">
                <div class="animal-name">${proc.animalNome}</div>
                <div class="animal-status">${proc.tipo}</div>
            </div>
            <div class="animal-info">
                <div class="info-item">
                    <span class="info-label">Data:</span>
                    <span class="info-value">${new Date(proc.data).toLocaleDateString()}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Veterinário:</span>
                    <span class="info-value">${proc.veterinario}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Medicamento:</span>
                    <span class="info-value">${proc.medicamento}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Relatórios
function gerarRelatorioAnimais() {
    const dados = document.getElementById('dados-relatorio');
    
    let html = `
        <h4>🐎 Relatório de Animais</h4>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${animais.length}</div>
                <div class="stat-label">Total de Animais</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${animais.filter(a => a.status === 'Ativo').length}</div>
                <div class="stat-label">Animais Ativos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${animais.filter(a => a.sexo === 'Macho' && a.status === 'Ativo').length}</div>
                <div class="stat-label">Machos Ativos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${animais.filter(a => a.sexo === 'Fêmea' && a.status === 'Ativo').length}</div>
                <div class="stat-label">Fêmeas Ativas</div>
            </div>
        </div>
        
        <h5>Lista Completa de Animais:</h5>
        <div class="animal-info">
            ${animais.map(animal => `
                <div class="info-item">
                    <span class="info-label">${animal.nome} (${animal.sexo}):</span>
                    <span class="info-value">${animal.status} - ${animal.raca}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    dados.innerHTML = html;
}

function gerarRelatorioGenealogia() {
    const dados = document.getElementById('dados-relatorio');
    
    const animaisComPais = animais.filter(a => a.pai !== 'Não informado' && a.mae !== 'Não informado');
    
    let html = `
        <h4>🧬 Relatório de Genealogia</h4>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${animaisComPais.length}</div>
                <div class="stat-label">Animais com Genealogia</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${animais.length - animaisComPais.length}</div>
                <div class="stat-label">Sem Informação</div>
            </div>
        </div>
        
        <h5>Linhagens Registradas:</h5>
        <div class="animal-info">
            ${animaisComPais.map(animal => `
                <div class="info-item">
                    <span class="info-label">${animal.nome}:</span>
                    <span class="info-value">${animal.pai} x ${animal.mae}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    dados.innerHTML = html;
}

function gerarRelatorioReproducao() {
    const dados = document.getElementById('dados-relatorio');
    
    let html = `
        <h4>💕 Relatório de Reprodução</h4>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${coberturas.length}</div>
                <div class="stat-label">Coberturas Registradas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${gestacoes.length}</div>
                <div class="stat-label">Gestações Ativas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${partos.length}</div>
                <div class="stat-label">Partos Registrados</div>
            </div>
        </div>
        
        <h5>Gestações em Andamento:</h5>
        <div class="animal-info">
            ${gestacoes.map(gestacao => `
                <div class="info-item">
                    <span class="info-label">${gestacao.femeaNome} x ${gestacao.machoNome}:</span>
                    <span class="info-value">Parto previsto: ${new Date(gestacao.dataPrevistaParto).toLocaleDateString()}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    dados.innerHTML = html;
}

function gerarRelatorioSaidas() {
    const dados = document.getElementById('dados-relatorio');
    
    const vendas = saidas.filter(s => s.tipo === 'Venda');
    const receitaTotal = vendas.reduce((total, venda) => total + venda.valor, 0);
    
    let html = `
        <h4>📤 Relatório de Saídas</h4>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${saidas.length}</div>
                <div class="stat-label">Total de Saídas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${vendas.length}</div>
                <div class="stat-label">Vendas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">R$ ${receitaTotal.toFixed(2).replace('.', ',')}</div>
                <div class="stat-label">Receita Total</div>
            </div>
        </div>
        
        <h5>Histórico de Saídas:</h5>
        <div class="animal-info">
            ${saidas.map(saida => `
                <div class="info-item">
                    <span class="info-label">${saida.animalNome} (${saida.tipo}):</span>
                    <span class="info-value">${new Date(saida.data).toLocaleDateString()}${saida.tipo === 'Venda' ? ` - R$ ${saida.valor.toFixed(2).replace('.', ',')}` : ''}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    dados.innerHTML = html;
}

function gerarRelatorioSaude() {
    const dados = document.getElementById('dados-relatorio');
    
    let html = `
        <h4>🏥 Relatório de Saúde</h4>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${saude.length}</div>
                <div class="stat-label">Procedimentos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${saude.filter(p => p.tipo === 'Vacinação').length}</div>
                <div class="stat-label">Vacinações</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${saude.filter(p => p.tipo === 'Vermifugação').length}</div>
                <div class="stat-label">Vermifugações</div>
            </div>
        </div>
        
        <h5>Histórico de Procedimentos:</h5>
        <div class="animal-info">
            ${saude.map(proc => `
                <div class="info-item">
                    <span class="info-label">${proc.animalNome} (${proc.tipo}):</span>
                    <span class="info-value">${new Date(proc.data).toLocaleDateString()} - ${proc.veterinario}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    dados.innerHTML = html;
}

function gerarRelatorioCompleto() {
    const dados = document.getElementById('dados-relatorio');
    
    const vendas = saidas.filter(s => s.tipo === 'Venda');
    const receitaTotal = vendas.reduce((total, venda) => total + venda.valor, 0);
    
    let html = `
        <h4>📊 Relatório Completo do Rebanho</h4>
        
        <h5>Resumo Geral:</h5>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${animais.length}</div>
                <div class="stat-label">Total de Animais</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${animais.filter(a => a.status === 'Ativo').length}</div>
                <div class="stat-label">Animais Ativos</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${gestacoes.length}</div>
                <div class="stat-label">Gestações Ativas</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">R$ ${receitaTotal.toFixed(2).replace('.', ',')}</div>
                <div class="stat-label">Receita Total</div>
            </div>
        </div>
        
        <h5>Distribuição por Sexo:</h5>
        <div class="animal-info">
            <div class="info-item">
                <span class="info-label">Machos Ativos:</span>
                <span class="info-value">${animais.filter(a => a.sexo === 'Macho' && a.status === 'Ativo').length}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Fêmeas Ativas:</span>
                <span class="info-value">${animais.filter(a => a.sexo === 'Fêmea' && a.status === 'Ativo').length}</span>
            </div>
        </div>
        
        <h5>Atividade Reprodutiva:</h5>
        <div class="animal-info">
            <div class="info-item">
                <span class="info-label">Coberturas Registradas:</span>
                <span class="info-value">${coberturas.length}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Partos Registrados:</span>
                <span class="info-value">${partos.length}</span>
            </div>
        </div>
        
        <h5>Controle Sanitário:</h5>
        <div class="animal-info">
            <div class="info-item">
                <span class="info-label">Procedimentos Veterinários:</span>
                <span class="info-value">${saude.length}</span>
            </div>
        </div>
    `;
    
    dados.innerHTML = html;
}

// Backup
function exportarDados(formato) {
    try {
        // Coletar todos os dados do sistema
        const dadosCompletos = {
            animais: animais,
            coberturas: coberturas,
            gestacoes: gestacoes,
            partos: partos,
            saidas: saidas,
            saude: saude,
            procedimentos: procedimentos,
            dataExportacao: new Date().toISOString(),
            versao: '1.0'
        };

        let conteudo, nomeArquivo, tipoMime;

        if (formato === 'json') {
            conteudo = JSON.stringify(dadosCompletos, null, 2);
            nomeArquivo = `mini-poneis-backup-${new Date().toISOString().split('T')[0]}.json`;
            tipoMime = 'application/json';
        } else if (formato === 'csv') {
            conteudo = converterParaCSV(dadosCompletos);
            nomeArquivo = `mini-poneis-backup-${new Date().toISOString().split('T')[0]}.csv`;
            tipoMime = 'text/csv';
        }

        // Criar e baixar arquivo
        const blob = new Blob([conteudo], { type: tipoMime });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = nomeArquivo;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        mostrarStatusBackup('success', `Backup exportado com sucesso: ${nomeArquivo}`);
    } catch (error) {
        console.error('Erro ao exportar dados:', error);
        mostrarStatusBackup('error', 'Erro ao exportar dados. Tente novamente.');
    }
}

function converterParaCSV(dados) {
    let csv = 'Tipo,Nome,Sexo,Raca,Nascimento,Pai,Mae,Status,Data,Observacoes\n';
    
    // Adicionar animais
    dados.animais.forEach(animal => {
        csv += `Animal,"${animal.nome}","${animal.sexo}","${animal.raca}","${animal.nascimento}","${animal.pai}","${animal.mae}","${animal.status}","${animal.dataCadastro}","${animal.observacoes || ''}"\n`;
    });
    
    // Adicionar coberturas
    dados.coberturas.forEach(cobertura => {
        csv += `Cobertura,"${cobertura.femeaNome} x ${cobertura.machoNome}","","","","","","${cobertura.status}","${cobertura.data}","${cobertura.observacoes || ''}"\n`;
    });
    
    // Adicionar partos
    dados.partos.forEach(parto => {
        csv += `Parto,"${parto.nomePotro}","${parto.sexoPotro}","","","${parto.paiNome}","${parto.maeNome}","Nascido","${parto.data}","${parto.observacoes || ''}"\n`;
    });
    
    return csv;
}

function importarDados() {
    const arquivo = document.getElementById('arquivo-importacao').files[0];
    
    if (!arquivo) {
        mostrarStatusBackup('error', 'Por favor, selecione um arquivo.');
        return;
    }
    
    if (!confirm('ATENÇÃO: A importação irá substituir todos os dados atuais. Deseja continuar?')) {
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            let dadosImportados;
            
            if (arquivo.name.endsWith('.json')) {
                dadosImportados = JSON.parse(e.target.result);
            } else if (arquivo.name.endsWith('.csv')) {
                // Implementação básica para CSV
                mostrarStatusBackup('error', 'Importação de CSV ainda não implementada. Use arquivos JSON.');
                return;
            } else {
                mostrarStatusBackup('error', 'Formato de arquivo não suportado.');
                return;
            }
            
            // Validar estrutura dos dados
            if (!validarDadosImportados(dadosImportados)) {
                mostrarStatusBackup('error', 'Arquivo de backup inválido ou corrompido.');
                return;
            }
            
            // Importar dados
            animais = dadosImportados.animais || [];
            coberturas = dadosImportados.coberturas || [];
            gestacoes = dadosImportados.gestacoes || [];
            partos = dadosImportados.partos || [];
            saidas = dadosImportados.saidas || [];
            saude = dadosImportados.saude || [];
            procedimentos = dadosImportados.procedimentos || [];
            
            salvarDados();
            
            // Atualizar interface
            atualizarDashboard();
            atualizarListaAnimais();
            atualizarSeletoresPais();
            
            mostrarStatusBackup('success', 'Dados importados com sucesso!');
            
        } catch (error) {
            console.error('Erro ao importar dados:', error);
            mostrarStatusBackup('error', 'Erro ao processar arquivo. Verifique se o formato está correto.');
        }
    };
    
    reader.readAsText(arquivo);
}

function validarDadosImportados(dados) {
    // Verificações básicas de estrutura
    if (!dados || typeof dados !== 'object') return false;
    
    // Verificar se pelo menos uma das propriedades principais existe
    const propriedadesEsperadas = ['animais', 'coberturas', 'gestacoes', 'partos', 'saidas', 'saude'];
    return propriedadesEsperadas.some(prop => Array.isArray(dados[prop]));
}

function mostrarStatusBackup(tipo, mensagem) {
    const status = document.getElementById('backupStatus');
    const statusMessage = document.getElementById('statusMessage');
    
    status.className = `backup-status ${tipo}`;
    status.style.display = 'block';
    statusMessage.textContent = mensagem;
    
    // Ocultar após 5 segundos
    setTimeout(() => {
        status.style.display = 'none';
    }, 5000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar aplicação
    atualizarDashboard();
    atualizarListaAnimais();
    atualizarSeletoresPais();
    
    // Event listener para seletor de genealogia
    const seletorGenealogia = document.getElementById('animal-genealogia');
    if (seletorGenealogia) {
        seletorGenealogia.addEventListener('change', mostrarArvoreGenealogia);
    }
});

// Função para inicializar a aplicação
function inicializarApp() {
    console.log('🐴 Mini Pôneis LN - PWA Iniciado');
    atualizarDashboard();
}

