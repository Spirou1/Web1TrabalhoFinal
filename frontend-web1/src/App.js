import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarJogador from './components/EditarJogador';

const App = () => {
    const [jogadores, setJogadores] = useState([]);
    const [novoJogador, setNovoJogador] = useState({ nome: '', posicao: '', idade: '' });
    const [editarId, setEditarId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);  // Estado para controlar a visibilidade do modal
    const [jogadorParaRemover, setJogadorParaRemover] = useState(null);  // Jogador selecionado para remoção

    // Carregar os jogadores ao carregar a página
    useEffect(() => {
        axios.get('http://localhost:3001/jogadores')
            .then(response => setJogadores(response.data))
            .catch(error => console.error('Erro ao buscar jogadores:', error));
    }, []);

    // Adicionar jogador
    const adicionarJogador = () => {
        axios.post('http://localhost:3001/jogadores', novoJogador)
            .then(response => {
                setJogadores([...jogadores, response.data]);
                setNovoJogador({ nome: '', posicao: '', idade: '' });
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
            <h1>Cadastro de Jogadores</h1>

            <input
                type="text"
                placeholder="Nome"
                value={novoJogador.nome}
                onChange={e => setNovoJogador({ ...novoJogador, nome: e.target.value })}
            />
            <input
                type="text"
                placeholder="Posição"
                value={novoJogador.posicao}
                onChange={e => setNovoJogador({ ...novoJogador, posicao: e.target.value })}
            />
            <input
                type="number"
                placeholder="Idade"
                value={novoJogador.idade}
                onChange={e => setNovoJogador({ ...novoJogador, idade: e.target.value })}
            />
            <button onClick={adicionarJogador}>Adicionar Jogador</button>

            <ul>
                {jogadores.map(jogador => (
                    <li key={jogador.id}>
                        {jogador.nome} - {jogador.posicao} - {jogador.idade} anos
                        <button onClick={() => handleEditar(jogador.id)}>Editar</button>
                        <button onClick={() => mostrarModal(jogador.id)}>Remover</button>
                    </li>
                ))}
            </ul>

            {editarId && <EditarJogador jogadorId={editarId} onClose={fecharEdicao} />}

            {modalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Tem certeza que deseja remover este jogador?</h3>
                        <button onClick={removerJogador}>Sim</button>
                        <button onClick={fecharModal}>Não</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
