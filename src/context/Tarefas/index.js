import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { baseUrl, getToken } from '../../services/auth';

export const TarefaContext = createContext();

export const TarefasStorage = ({ children }) => {
  const [listaTarefas, setlistaTarefas] = useState([]);

  const buscarTarefas = async (filtros, pagina) => {
    const { data } = await axios.get(baseUrl, {
      params: {
        service: 'servico',
        token: getToken(),
        filter: filtros,
        pagina,
      },
    });

    setlistaTarefas(() =>
      data.data?.map(({ id_servico, titulo }) => ({
        label: titulo,
        value: id_servico,
      }))
    );

    return data?.data;
  };

  const buscaTarefa = async (id) => {
    const data = await buscarTarefas({ id: id }, 1);

    return data;
  };

  useEffect(() => {
    buscarTarefas();
  }, []);

  return (
    <TarefaContext.Provider
      value={{ listaTarefas, buscarTarefas, buscaTarefa }}
    >
      {children}
    </TarefaContext.Provider>
  );
};
