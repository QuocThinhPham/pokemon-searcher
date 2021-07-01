import { Col, Image, Row, Space, Tag, Typography } from 'antd';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { TYPE_COLORS } from '../constants/constants';
import { AppContext } from '../context/AppProvider';

export default function PokemonBox() {
    const [data, setData] = useState({});
    const { pokemon } = useContext(AppContext);

    useEffect(() => {
        setData(pokemon);

        return () => { setData({}) };
    }, [pokemon]);

    if (_.isEmpty(data)) {
        return null;
    }
    else {
        return (
            <Row
                align="center"
                justify="center"
                style={{
                    width: '100%',
                    height: '100%',
                    marginTop: '20px'
                }}
            >
                <Col span={17} style={{
                    padding: '10px 10px 20px',
                    background: '#f2f2f2',
                    borderRadius: '5px'
                }}>
                    <Image
                        src={data.photoURL.main.front_default}
                        alt={data.name}
                        preview={false}
                        style={{ border: '1px solid black' }}
                    />
                    <Typography.Title
                        level={4}
                        style={{ margin: '10px 0', letterSpacing: '1px' }}
                    >{_.capitalize(data.name)}</Typography.Title>
                    <Space>
                        {data.types.map(t => {
                            const { slot, type } = t;
                            const color = TYPE_COLORS[type.name];
                            return <Tag key={slot} color={color}>{type.name}</Tag>
                        })}
                    </Space>
                </Col>
            </Row>
        );
    }
}