import React, {useState} from 'react';

import {Link, useHistory} from 'react-router-dom';

import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');

    async function handleCadastrarIncident(e) {
        e.preventDefault();
        
        const data = {
            titulo, descricao, valor, ongId
        };

        try{
            console.log(data);
            const response = await api.post('incidents', data, {
                headers: {
                    'auth-token': ongId
                }
            });

            alert('Caso Cadastrado com sucesso!');

            history.push('/profile');

        } catch (err) {
            alert('Erro ao salvar caso');
        }

    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p> Descreva o caso detalhamento para encontrar um herói para resover isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>

                </section>
                <form onSubmit={handleCadastrarIncident}>
                    <input 
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    placeholder="Título do caso" />
                    <textarea 
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    placeholder="Descrição do caso"/>
                    <input
                    value={valor}
                    onChange={e => setValor(e.target.value)}
                    placeholder="Valor"/>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}