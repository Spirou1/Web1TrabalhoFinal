import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarJogador from './components/EditarJogador';
import './App.css';

const App = () => {
    const [jogadores, setJogadores] = useState([]);
    const [posicoes, setPosicoes] = useState([]); // Estado para armazenar as posições
    const [novoJogador, setNovoJogador] = useState({ nome: '', posicao: '', idade: '', email: ''});
    const [editarId, setEditarId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);  // Estado para controlar a visibilidade do modal
    const [jogadorParaRemover, setJogadorParaRemover] = useState(null);  // Jogador selecionado para remoção

    useEffect(() => {
        // Buscar jogadores ao carregar a página
        axios.get('http://localhost:3001/jogadores')
            .then(response => setJogadores(response.data))
            .catch(error => console.error('Erro ao buscar jogadores:', error));
    
        // Buscar posições ao carregar a página
        axios.get('http://localhost:3001/posicoes')
            .then(response => setPosicoes(response.data))
            .catch(error => console.error('Erro ao buscar posições:', error));
    }, []);
    

    // Adicionar jogador
    const adicionarJogador = () => {
        axios.post('http://localhost:3001/jogadores', novoJogador)
            .then(response => {
                setJogadores([...jogadores, response.data]);
                setNovoJogador({ nome: '', posicao: '', idade: '', email: ''  });
            })
            .catch(error => console.error('Erro ao adicionar jogador:', error));
    };

    // Remover jogador
    const removerJogador = () => {
        axios.delete(`http://localhost:3001/jogadores/${jogadorParaRemover}`)
            .then(() => {
                setJogadores(jogadores.filter(jogador => jogador.id !== jogadorParaRemover));
                setModalVisible(false); 
            })
            .catch(error => console.error('Erro ao remover jogador:', error));
    };

    // Exibir o modal de confirmação
    const mostrarModal = (id) => {
        setJogadorParaRemover(id);
        setModalVisible(true);
    };

    // Fechar o modal de confirmação
    const fecharModal = () => {
        setModalVisible(false);
        setJogadorParaRemover(null);
    };

    const handleEditar = (id) => {
        setEditarId(id);
    };

    const fecharEdicao = () => {
        setEditarId(null);
    };

    return (
        <div>
            <h1 className="header">Cadastro de Jogadores</h1>

            {/* Formulário para adicionar jogador */}
            <form className="player-form"
                onSubmit={e => {
                    e.preventDefault(); // Previne comportamento padrão
                    adicionarJogador();
                }}
            >
                <input
                    type="text"
                    placeholder="Nome"
                    value={novoJogador.nome}
                    onChange={e => setNovoJogador({ ...novoJogador, nome: e.target.value })}
                    required
                />
                <select
                    value={novoJogador.posicao}
                    onChange={e => setNovoJogador({ ...novoJogador, posicao: e.target.value })}
                    required
                >
                    <option value="">Selecione uma posição</option>
                    {posicoes.map(posicao => (
                        <option key={posicao.id} value={posicao.nome}>
                            {posicao.nome}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Idade"
                    value={novoJogador.idade}
                    onChange={e => setNovoJogador({ ...novoJogador, idade: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={novoJogador.email}
                    onChange={e => setNovoJogador({ ...novoJogador, email: e.target.value })}
                    required
                />
                <button type="submit">Adicionar Jogador</button>
            </form>
            
            {/* Lista de jogadores */}
            <ul className="player-list">
                {jogadores.map(jogador => (
                    <li className="player-item" key={jogador.id}>
                        <span>
                            {jogador.nome} - {jogador.posicao} - {jogador.idade} anos - {jogador.email}
                        </span>
                        <div>
                            <button onClick={() => handleEditar(jogador.id)}>Editar</button>
                            <button onClick={() => mostrarModal(jogador.id)}>Remover</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Formulário de edição */}
            {editarId && <EditarJogador jogadorId={editarId} onClose={fecharEdicao} />}

            {/* Modal de confirmação de remoção */}
            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Tem certeza que deseja remover este jogador?</h3>
                        <button className="confirm-btn" onClick={removerJogador}>Sim</button>
                        <button className="cancel-btn" onClick={fecharModal}>Não</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
