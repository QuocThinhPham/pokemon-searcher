import { Col, Row, Typography } from 'antd';
import React, { useCallback, useContext, useEffect } from 'react';
import { getAllPokemonName } from './apis/pokemon';
import Control from './components/Control';
import PokemonBox from './components/PokemonBox';
import { AppContext } from './context/AppProvider';

export default function App() {
    const { setPokemonList, pokemon } = useContext(AppContext);

    const fetchList = useCallback(async () => {
        const res = await getAllPokemonName();
        if (res.status === 200) {
            const { results } = res.data;
            setPokemonList(results);
            return results;
        }
    }, [setPokemonList]);

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            <Row
                align="top"
                justify="center"
                style={{
                    width: '100vw',
                    height: 'calc(100vh - 20px)',
                    marginTop: '20px'
                }}
            >
                <Col xs={22} sm={22} md={20} lg={10} xl={10}>
                    <Typography.Title
                        level={3}
                        style={{ textAlign: 'center' }}
                    >Pokedex</Typography.Title>
                    <Control />
                    {pokemon ? <PokemonBox
                        name={pokemon.name}
                        photoURL={pokemon.photoURL}
                        types={pokemon.types}
                    /> : null}
                </Col>
            </Row>
        </div>
    );
}