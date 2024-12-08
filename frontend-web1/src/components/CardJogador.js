import React from 'react';

const CardJogador = ({ jogador, onEditar, onRemover }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{jogador.nome}</h3>
                <p className="card-text">
                    Posição: {jogador.posicao} <br />
                    Idade: {jogador.idade} anos <br />
                    Email: {jogador.email}
                </p>
                <div className="card-actions">
                <button className="button1" onClick={() => onEditar(jogador.id)}>
                <img src="/icons8-edit-96 (1) 1.svg" alt="Editar" className="icon" /></button>
                <button className="button1" onClick={() => onRemover(jogador.id)}>
                <img src="/icons8-delete 2.svg" alt="Remover" className="icon" /></button>

                </div>
            </div>
        </div>
    );
};

export default CardJogador;
