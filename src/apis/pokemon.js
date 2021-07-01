import axios from 'axios';
import { URL_ENDPOINT } from '../constants/constants';

export const getAllPokemonName = () => {
    return axios.get(`${URL_ENDPOINT}/pokemon?limit=2000&offset=0`);
}

export const getPokemonByName = (pokemon_name) => {
    return axios.get(`${URL_ENDPOINT}/pokemon/${pokemon_name}`)
};