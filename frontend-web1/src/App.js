import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [jogadores, setJogadores] = useState([]);
    const [novoJogador, setNovoJogador] = useState({ nome: '', posicao: '', idade: '' });

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
    const removerJogador = id => {
        axios.delete(`http://localhost:3001/jogadores/${id}`)
            .then(() => setJogadores(jogadores.filter(jogador => jogador.id !== id)))
            .catch(error => console.error('Erro ao remover jogador:', error));
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
                        <button onClick={() => removerJogador(jogador.id)}>Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
