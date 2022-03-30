import axios from 'axios';

const token = localStorage.getItem('token');

const baseURL = 'http://localhost:8080';
const service = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const transactionsAPI = {
  //deposit
  deposit: (date, amount, balance) =>
    service.post('/transactions/deposit', { date, amount, balance }),
  //withdraw
  withdraw: (data) => service.post('/transactions/withdraw', data),
  //show all transactions
  all: () => service.get('/transactions/all'),
};

const usersAPI = {
  //create account
  new: (data) =>
    service.post('/account/create', {
      name: data.name,
      email: data.email,
      password: data.password,
      firebaseID: data.firebaseID,
    }),
  //show all accounts
  all: () => service.get('/account/all'),
};

export { transactionsAPI, usersAPI };
