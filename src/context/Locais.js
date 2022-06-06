import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const localidadesAPI = 'https://servicodados.ibge.gov.br/api/v1/localidades';
export const LocaisContext = createContext();

export const LocaisStorage = ({ children }) => {
  const [locais, setLocais] = useState({});

  const buscaLocais = async () => {
    const estados = await axios.get(`${localidadesAPI}/estados`);
    const cidades = await axios.get(`${localidadesAPI}/municipios`);

    setLocais({
      estado: estados?.data?.map(({ nome, sigla }) => ({
        value: sigla,
        label: nome,
      })),
      cidade: cidades?.data?.map(({ id, nome }) => ({
        value: id,
        label: nome,
      })),
    });
  };

  const buscaCidadesPorEstado = async (estado) => {
    const cidades = await axios.get(
      `${localidadesAPI}/estados/${estado}/municipios`
    );
    return cidades?.data?.map(({ id, nome }) => ({
      value: id,
      label: nome,
    }));
  };

  const buscaCEP = async (cep) => {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
    return data;
  };

  useEffect(() => {
    buscaLocais();
  }, []);

  return (
    <LocaisContext.Provider
      value={{ locais, setLocais, buscaCidadesPorEstado, buscaCEP }}
    >
      {children}
    </LocaisContext.Provider>
  );
};
