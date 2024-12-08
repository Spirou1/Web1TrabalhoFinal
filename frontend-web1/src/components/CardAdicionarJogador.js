// src/components/CardAdicionarJogador.js

import React from 'react';
import './CardAdicionarJogador.css';  // Estilos específicos para este card

const CardAdicionarJogador = ({ onClick }) => {
    return (
        <div className="card-add-jogador">
            <button className="add-jogador-btn" onClick={onClick}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 2.25C9.0736 2.25 2.25 9.0736 2.25 18C2.25 26.9264 9.0736 33.75 18 33.75C26.9264 33.75 33.75 26.9264 33.75 18C33.75 9.0736 26.9264 2.25 18 2.25ZM18 30.375C10.2635 30.375 5.625 25.7365 5.625 18C5.625 10.2635 10.2635 5.625 18 5.625C25.7365 5.625 30.375 10.2635 30.375 18C30.375 25.7365 25.7365 30.375 18 30.375Z" fill="#007bff"/>
                    <path d="M18 8.25V17.625M18 17.625V27" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.25 17.625H27" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Adicionar Jogador
            </button>
        </div>
    );
};

export default CardAdicionarJogador;
