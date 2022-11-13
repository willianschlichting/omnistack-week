import React, {useState} from 'react';

import {Link, useHistory} from 'react-router-dom';

import {FiLogIn} from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
    const [id, setid] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.nome);
            history.push('/profile');
        }catch(err) {
            alert('Falha no login');
        }

    }

    return (
        <div className="logon-container">
            <section className="form">

                <img src={logoImg} alt="Be The Hero"></img>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                    value={id} 
                    onChange={ e => setid(e.target.value)} 
                    placeholder="Sua ID"/>
                    <button type="submit" className="button">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}