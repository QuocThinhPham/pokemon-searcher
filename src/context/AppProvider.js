import React, { createContext, useEffect, useState } from 'react';
import { getPokemonByName } from '../apis/pokemon';

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [search, setSearch] = useState(null);
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        if (!search?.keyword) return;
        getPokemonByName(search.keyword).then(res => {
            if (res.status === 200) {
                const { id, name, sprites, types } = res.data;
                setPokemon({
                    id,
                    name,
                    types: types,
                    photoURL: {
                        main: sprites.other['official-artwork'],
                        sub: sprites.other['dream_world'],
                    },
                });
            }
            setSearch(null);
        });
    }, [search]);

    return (
        <AppContext.Provider value={{
            search,
            setSearch,
            pokemonList,
            setPokemonList,
            pokemon
        }}>
            {children}
        </AppContext.Provider>
    );
}