import axios from 'axios';
import queryString from 'query-string';
import {
  CryptoCurrencyExchangeInterface,
  CryptoCurrencyExchangeGetQueryInterface,
} from 'interfaces/crypto-currency-exchange';
import { GetQueryInterface } from '../../interfaces';

export const getCryptoCurrencyExchanges = async (query?: CryptoCurrencyExchangeGetQueryInterface) => {
  const response = await axios.get(`/api/crypto-currency-exchanges${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCryptoCurrencyExchange = async (cryptoCurrencyExchange: CryptoCurrencyExchangeInterface) => {
  const response = await axios.post('/api/crypto-currency-exchanges', cryptoCurrencyExchange);
  return response.data;
};

export const updateCryptoCurrencyExchangeById = async (
  id: string,
  cryptoCurrencyExchange: CryptoCurrencyExchangeInterface,
) => {
  const response = await axios.put(`/api/crypto-currency-exchanges/${id}`, cryptoCurrencyExchange);
  return response.data;
};

export const getCryptoCurrencyExchangeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/crypto-currency-exchanges/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteCryptoCurrencyExchangeById = async (id: string) => {
  const response = await axios.delete(`/api/crypto-currency-exchanges/${id}`);
  return response.data;
};
