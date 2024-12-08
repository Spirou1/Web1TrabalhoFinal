import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardJogador from './components/CardJogador'; 
import './App.css';

const App = () => {
    const [jogadores, setJogadores] = useState([]);
    const [posicoes, setPosicoes] = useState([]);
    const [novoJogador, setNovoJogador] = useState({ nome: '', posicao: '', idade: '', email: '' });
    const [editarId, setEditarId] = useState(null);
    const [modalAdicionarVisible, setModalAdicionarVisible] = useState(false);
    const [modalExcluirVisible, setModalExcluirVisible] = useState(false);
    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [jogadorParaEditar, setJogadorParaEditar] = useState(null);
    const [jogadorParaRemover, setJogadorParaRemover] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/jogadores')
            .then(response => setJogadores(response.data))
            .catch(error => console.error('Erro ao buscar jogadores:', error));

        axios.get('http://localhost:3001/posicoes')
            .then(response => setPosicoes(response.data))
            .catch(error => console.error('Erro ao buscar posições:', error));
    }, []);

    const adicionarJogador = () => {
        axios.post('http://localhost:3001/jogadores', novoJogador)
            .then(response => {
                setJogadores([...jogadores, response.data]);
                setNovoJogador({ nome: '', posicao: '', idade: '', email: '' });
                setModalAdicionarVisible(false); 
            })
            .catch(error => console.error('Erro ao adicionar jogador:', error));
    };

    const removerJogador = () => {
        axios.delete(`http://localhost:3001/jogadores/${jogadorParaRemover}`)
            .then(() => {
                setJogadores(jogadores.filter(jogador => jogador.id !== jogadorParaRemover));
                setModalExcluirVisible(false);
            })
            .catch(error => console.error('Erro ao remover jogador:', error));
    };

    const mostrarModalAdicionar = () => {
        setModalAdicionarVisible(true);
    };

    const fecharModalAdicionar = () => {
        setModalAdicionarVisible(false);
    };

    const mostrarModalExcluir = (id) => {
        setJogadorParaRemover(id);
        setModalExcluirVisible(true);
    };

    const fecharModalExcluir = () => {
        setModalExcluirVisible(false);
        setJogadorParaRemover(null);
    };

    const mostrarModalEditar = (id) => {
        const jogador = jogadores.find(jogador => jogador.id === id);
        setJogadorParaEditar(jogador); 
        setModalEditarVisible(true); 
    };

    const fecharModalEditar = () => {
        setModalEditarVisible(false);
        setJogadorParaEditar(null);
    };
    
    const editarJogador = () => {
        // Envia os dados editados para a API
        axios.put(`http://localhost:3001/jogadores/${jogadorParaEditar.id}`, jogadorParaEditar)
            .then(response => {
                // Atualiza o estado local de jogadores
                setJogadores(prevJogadores => 
                    prevJogadores.map(jogador =>
                        jogador.id === jogadorParaEditar.id ? jogadorParaEditar : jogador
                    )
                );
                fecharModalEditar();
            })
            .catch(error => console.error('Erro ao editar jogador:', error));
    };    

    return (
        <div>
            <header>
                <img src="/CorinthiansLogoGroup.svg" alt="Logo" className="logo" />
            </header>

            <h1 className="title">Elenco</h1>

            <div className="card-container">
                <div className="card card-add" onClick={mostrarModalAdicionar}>
                    <span className="add-text">Adicionar Jogador</span>
                    <img src="/Group6.svg" alt="Adicionar Jogador" className="add-icon" />
                </div>

                {jogadores.map(jogador => (
                    <CardJogador
                        key={jogador.id}
                        jogador={jogador}
                        onEditar={mostrarModalEditar} 
                        onRemover={mostrarModalExcluir}
                    />
                ))}
            </div>

            {modalAdicionarVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Adicionar Jogador</h2>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                adicionarJogador();
                            }}
                            className="player-form"
                        >
                            <div className="form-group">
                                <label htmlFor="nome">Nome:</label>
                                <input
                                    id="nome"
                                    type="text"
                                    value={novoJogador.nome}
                                    onChange={e => setNovoJogador({ ...novoJogador, nome: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="posicao">Posição:</label>
                                <select
                                    id="posicao"
                                    value={novoJogador.posicao}
                                    onChange={e => setNovoJogador({ ...novoJogador, posicao: e.target.value })}
                                    required
                                >
                                    <option value=""></option>
                                    {posicoes.map(posicao => (
                                        <option key={posicao.id} value={posicao.nome}>
                                            {posicao.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="idade">Idade:</label>
                                <input
                                    id="idade"
                                    type="number"
                                    value={novoJogador.idade}
                                    onChange={e => setNovoJogador({ ...novoJogador, idade: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={novoJogador.email}
                                    onChange={e => setNovoJogador({ ...novoJogador, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="FormModalButtons">
                                <button className="btn btn-white" type="submit">Salvar</button>
                                <button className="btn btn-red" onClick={fecharModalAdicionar}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {modalEditarVisible && jogadorParaEditar && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar Jogador</h2>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                editarJogador();
                            }}
                            className="player-form"
                        >
                            <div className="form-group">
                                <label htmlFor="nome">Nome:</label>
                                <input
                                    id="nome"
                                    type="text"
                                    value={jogadorParaEditar.nome}
                                    onChange={e => setJogadorParaEditar({ ...jogadorParaEditar, nome: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="posicao">Posição:</label>
                                <select
                                    id="posicao"
                                    value={jogadorParaEditar.posicao}
                                    onChange={e => setJogadorParaEditar({ ...jogadorParaEditar, posicao: e.target.value })}
                                    required
                                >
                                    <option value=""></option>
                                    {posicoes.map(posicao => (
                                        <option key={posicao.id} value={posicao.nome}>
                                            {posicao.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="idade">Idade:</label>
                                <input
                                    id="idade"
                                    type="number"
                                    value={jogadorParaEditar.idade}
                                    onChange={e => setJogadorParaEditar({ ...jogadorParaEditar, idade: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={jogadorParaEditar.email}
                                    onChange={e => setJogadorParaEditar({ ...jogadorParaEditar, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="FormModalButtons">
                                <button className="btn btn-white" type="submit">Salvar</button>
                                <button className="btn btn-red" onClick={fecharModalEditar}>Cancelar</button>
                            </div>
                        </form>
                        
                    </div>
                </div>
            )}

            {modalExcluirVisible && (
            <div className="modal">
                <div className="delete-modal">
                    <h3 className="modal-title">Excluir Jogador</h3>
                    <p className="modal-message">Você tem certeza que deseja remover este jogador?</p>
                    <div className="modal-buttons">
                        <button className="btn btn-red" onClick={removerJogador}>Sim</button>
                        <button className="btn btn-white" onClick={fecharModalExcluir}>Não</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default App;
