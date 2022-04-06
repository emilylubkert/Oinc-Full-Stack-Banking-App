import axios from 'axios';

const token = localStorage.getItem('token');

const baseURL = process.env.REACT_APP_API_URL;
// const baseURL = 'http://localhost:8080'
const service = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const transactionsAPI = {
  //deposit
  deposit: (date, amount, balance, firebaseID) => {
    return service.post('/transactions/deposit', { date, amount, balance, firebaseID })
  },
  //withdraw
  withdraw: (date, amount, balance, firebaseID) => {
    return service.post('/transactions/withdraw', { date, amount, balance, firebaseID })
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
    })
};

export { transactionsAPI, usersAPI };
