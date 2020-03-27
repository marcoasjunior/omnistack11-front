import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import './styles.css'
import logo from '../../assets/logo.jpg'
import api from '../../services/api'

export default function Logon() {
    const ongId = localStorage.ongId
    const [incidents, setIncidents] = useState([])

    useEffect(() =>{
        api.get('profile', {
            headers: {
                Authorization: localStorage.ongId
            }
        }).then(response => {
            setIncidents(response.data)

        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {headers: {
                Authorization: localStorage.ongId
            }})
            setIncidents(incidents.filter(incident => incidents.id !== id))
        } catch (error) {
            alert('Erro ao deletar')
        }
    }



    return (
        <div className='profile-container'>
            <header>
                <img src={logo} alt='logo' />
                <span> Bem vinda, {localStorage.ongName}</span>
                <Link className='button' to='/incidents/new'> Cadastrar novo caso</Link>
                <button type='button'>
                    <FiPower size={18} color='E020441' />
                </button>
            </header>
 
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => {
                    return (
                        <li key ={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
                        <strong> DESCRIÇÃO</strong>
                        <p>{incident.description}</p>
                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format( incident.value)}</p>
    
                        <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
    
                    </li>
    
                    )
                })}
            </ul>

            </div>

    )
}