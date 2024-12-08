import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarJogador = ({ jogadorId, onClose }) => {
    const [nome, setNome] = useState('');
    const [posicao, setPosicao] = useState('');
    const [idade, setIdade] = useState('');
    const [email, setEmail] = useState('');
    const [posicoes, setPosicoes] = useState([]);

    // Carrega as informações do jogador a ser editado
    useEffect(() => {
        axios
            .get(`http://localhost:3001/jogadores/${jogadorId}`)
            .then(response => {
                const jogador = response.data;
                setNome(jogador.nome);
                setPosicao(jogador.posicao);
                setIdade(jogador.idade);
                setEmail(jogador.email);
            })
            .catch(error => console.error('Erro ao carregar jogador:', error));
    }, [jogadorId]);

    // Carrega as posições disponíveis
    useEffect(() => {
        axios
            .get('http://localhost:3001/posicoes')
            .then(response => setPosicoes(response.data))
            .catch(error => console.error('Erro ao carregar posições:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const jogadorAtualizado = { nome, posicao, idade, email };

        axios
            .put(`http://localhost:3001/jogadores/${jogadorId}`, jogadorAtualizado)
            .then(() => {
                alert('Jogador editado com sucesso!');
                onClose(); // Fecha o modal ou formulário após salvar
            })
            .catch(error => {
                alert('Erro ao editar jogador.');
                console.error(error);
            });
    };

    return (
        <div>
            <h3>Editar Jogador</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome</label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                />

                <label htmlFor="posicao">Posição</label>
                <select
                    id="posicao"
                    value={posicao}
                    onChange={e => setPosicao(e.target.value)}
                    required
                >
                    <option type="position" value="" disabled>Selecione uma posição</option>
                    {posicoes.map(pos => (
                        <option key={pos.id} value={pos.nome}>
                            {pos.nome}
                        </option>
                    ))}
                </select>

                <label htmlFor="idade">Idade</label>
                <input
                    id="idade"
                    type="number"
                    value={idade}
                    onChange={e => setIdade(e.target.value)}
                    required
                    min="0"
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <div>
                    <button type="submit">Salvar</button>
                    <button type="button" onClick={onClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default EditarJogador;