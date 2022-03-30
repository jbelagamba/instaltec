import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '../../services/auth';

export const ClienteContext = createContext();

export const ClientesStorage = ({ children }) => {
  const [listaClientes, setlistaClientes] = useState([]);

  const buscarClientes = async (filtros, pagina) => {
    const { data } = await axios.get(baseUrl, {
      params: {
        service: 'cliente',
        token: getToken(),
        filter: filtros,
        pagina,
      },
    });

    if (!filtros)
      setlistaClientes(() =>
        data.data?.map(({ id_cliente, nome_fantasia }) => ({
          label: nome_fantasia,
          value: id_cliente,
        }))
      );

    //console.log('data', data.data);
    return data;
  };

  const buscaCliente = async (id) => {
    const data = await buscarClientes({ id: id }, 1);
    return data.data;
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  return (
    <ClienteContext.Provider
      value={{ listaClientes, buscaCliente, buscarClientes }}
    >
      {children}
    </ClienteContext.Provider>
  );
};
