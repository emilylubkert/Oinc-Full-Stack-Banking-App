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
  deposit: (date, amount, balance) => {
    return service.post('/transactions/deposit', { date, amount, balance })
  },
  //withdraw
  withdraw: (date, amount, balance) => {
    return service.post('/transactions/withdraw', { date, amount, balance })
  },
  //show all transactions
  all: (id) =>  service.get(`/transactions/all/${id}`),
  balance: (id) => service.get(`/transactions/balance/${id}`)
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
