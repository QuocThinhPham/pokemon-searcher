import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Select, Spin } from 'antd';
import debounce from 'lodash.debounce';
import React, { useContext, useMemo, useState } from 'react';
import { findByName } from '../common/services';
import { AppContext } from '../context/AppProvider';

export default function Control() {
    const [value, setValue] = useState('');
    const [form] = Form.useForm();
    const { pokemonList, setSearch } = useContext(AppContext);

    const DebounceSelect = ({ fetchOptions, debounceTimeout = 300, ...props }) => {
        const [fetching, setFetching] = useState(false);
        const [options, setOptions] = useState([]);

        const debounceFetcher = useMemo(() => {
            const loadOptions = value => {
                setOptions([]);
                setFetching(true);

                fetchOptions(value).then(newOptions => {
                    setOptions(newOptions);
                    setFetching(false);
                })
            }

            return debounce(loadOptions, debounceTimeout);
        }, [fetchOptions, debounceTimeout]);

        return (
            <Select
                filterOption={false}
                onSearch={debounceFetcher}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                {...props}
            >
                {options.map(opt => (
                    <Select.Option key={opt.url} value={opt.name}>
                        {opt.name}
                    </Select.Option>
                ))}
            </Select>
        );
    }

    const fetchPokemonList = async (search) => {
        return findByName(pokemonList, search);
    }

    const handleSubmit = () => {
        setSearch({ keyword: value });
        setValue('');
        form.resetFields();
    }

    return (
        <Form form={form} layout="vertical">
            <Form.Item
                name="name"
                className="media-query-item"
            >
                <DebounceSelect
                    showSearch
                    placeholder="Type a pokemon name"
                    value={value}
                    onChange={newValue => setValue(newValue)}
                    fetchOptions={fetchPokemonList}
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Button
                type="primary"
                icon={<SearchOutlined />}
                className="media-query-button"
                onClick={handleSubmit}
            >Search</Button>
        </Form>
    );
}