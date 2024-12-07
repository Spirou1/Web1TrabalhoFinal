import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarJogador = ({ jogadorId, onClose }) => {
    const [nome, setNome] = useState('');
    const [posicao, setPosicao] = useState('');
    const [idade, setIdade] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3001/jogadores/${jogadorId}`)
            .then(response => {
                const jogador = response.data;
                setNome(jogador.nome);
                setPosicao(jogador.posicao);
                setIdade(jogador.idade);
            })
            .catch(error => console.error('Erro ao carregar jogador:', error));
    }, [jogadorId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/jogadores/${jogadorId}`, { nome, posicao, idade })
            .then(response => {
                alert('Jogador editado com sucesso!');
                onClose(); 
            })
            .catch(error => {
                alert('Erro ao editar jogador');
                console.error(error);
            });
    };

    return (
        <div>
            <h3>Editar Jogador</h3>
            <form onSubmit={handleSubmit}>
                <label>Nome</label>
                <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                
                <label>Posição</label>
                <input type="text" value={posicao} onChange={e => setPosicao(e.target.value)} required />
                
                <label>Idade</label>
                <input type="number" value={idade} onChange={e => setIdade(e.target.value)} required />
                
                <button type="submit">Salvar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditarJogador;
