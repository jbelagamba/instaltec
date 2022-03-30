import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '../../services/auth';

export const ClienteContext = createContext();

export const ClientesStorage = ({ children }) => {
  const [listaClientes, setlistaClientes] = useState([]);

  const buscarListaClientes = async () => {
    const { data } = await axios.get(baseUrl, {
      params: {
        service: 'cliente',
        token: getToken(),
      },
    });

    setlistaClientes(() =>
      data.data?.map(({ id_cliente, nome_fantasia }) => ({
        label: nome_fantasia,
        value: id_cliente,
      }))
    );
  };

  const buscaCliente = async (id) => {
    const { data } = await axios.get(baseUrl, {
      params: {
        service: 'cliente',
        token: getToken(),
        filter: { id: id },
      },
    });

    return data.data[0];
  };

  useEffect(() => {
    buscarListaClientes();
  }, []);

  return (
    <ClienteContext.Provider value={{ listaClientes, buscaCliente }}>
      {children}
    </ClienteContext.Provider>
  );
};
