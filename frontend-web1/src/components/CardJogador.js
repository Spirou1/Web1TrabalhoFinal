import React from 'react';

const CardJogador = ({ jogador, onEditar, onRemover }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">{jogador.nome}</h3>
                <div className="card-content">
                    <p className="card-text">
                        Posição: {jogador.posicao} <br />
                        Idade: {jogador.idade} anos <br />
                        Email: {jogador.email}
                    </p>
                </div>
                <div className="card-actions">
                    <button className="button1" onClick={() => onEditar(jogador.id)}>
                    <svg alt="Editar" className="edit" width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                        <g id="SVGRepo_iconCarrier"> <title/> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#f2f2f2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#f2f2f2" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> </g> </g> </g> </g>
                    </svg>
                    </button>
                    <button className="button1" onClick={() => onRemover(jogador.id)}>
                        <svg alt="Remover" className="remove" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.6162 2.25C12.7705 2.25 11.25 3.7705 11.25 5.6162V6.75H4.5V9H6.75V28.125C6.75 29.9795 8.2705 31.5 10.125 31.5H23.625C25.4795 31.5 27 29.9795 27 28.125V9H29.25V6.75H22.5V5.6162C22.5 3.7705 20.9795 2.25 19.1338 2.25H14.6162ZM14.6162 4.5H19.1338C19.7666 4.5 20.25 4.98339 20.25 5.6162V6.75H13.5V5.6162C13.5 4.98339 13.9834 4.5 14.6162 4.5ZM9 9H24.75V28.125C24.75 28.7578 24.2578 29.25 23.625 29.25H10.125C9.49219 29.25 9 28.7578 9 28.125V9ZM11.25 11.25V27H13.5V11.25H11.25ZM15.75 11.25V27H18V11.25H15.75ZM20.25 11.25V27H22.5V11.25H20.25Z" fill="#F2F2F2"/>
                        </svg>
                    </button>

                </div>
            </div>
        </div>
    );
};

export default CardJogador;
