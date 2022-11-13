import React, {useState, useEffect} from 'react';

import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Profile() {

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profile', {
            headers: {
                'auth-token': ongId
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ongId]);

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    'auth-token': ongId
                }
            })
        } catch( err) {
            alert('Erro ao remover');
        }
    }

    return (
        <div className="profile-container">
            <header>
                <img  src={logoImg} alt="Be The Hero" />
                <spa> Bem vinda, {ongName}</spa>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso: </strong>
                        <p>{incident.titulo}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.descricao}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.valor)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>

        </div>
    );
}