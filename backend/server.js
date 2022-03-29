require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/auth');

const Transaction = require('./models/Transaction');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authMiddleware);

// const buildPath = path.normalize(path.join(__dirname, '../frontend/build'));
// app.use(express.static(buildPath));

try {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
      useUnifiedTopology: true,
    })
    .then(console.log('Connected successfully to db server!'));
} catch (error) {
  console.log(error);
}

//create user
app.post('/account/create', async (req, res) => {
  console.log('request body', req.body);
  const { name, email, password } = req.body;
  const user = {
    name,
    email,
    password,
    balance: 10,
    firebaseID: req.firebaseUser.uid,
  };
  try {
    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
});
//get all accounts
app.get('/account/all', async (req, res) => {
  try {
    const accounts = await User.find({});
    res.status(200).send(accounts);
  } catch (error) {
    console.log(error);
  }
});

//get users balance
app.get('/transactions/balance'), async (req, res) => {
  try {
    // const userBalance = await Transaction
    // .find({firebaseID: req.firebaseUser.uid})
    // .sort({ _id: -1 })
    // .limit(1);
    const userBalance = 10;
    res.send(userBalance);
    console.log(userBalance)
  } catch (error) {
    res.status(404).json({ message: 'Bad request' });
  }
}
//dashboard - get users transactions
app.get('/transactions/all', async (req, res) => {
  try {
    const transactions = await Transaction.find({
      firebaseID: req.firebaseUser.uid,
    });
    res.status(200).send(transactions);
  } catch (error) {
    res.status(404).json({ message: 'Bad request' });
  }
});

// deposit
app.post('/transactions/deposit', async (req, res) => {
  const { date, amount, balance } = req.body;
  const deposit = {
    date,
    amount,
    type: 'Deposit',
    balance,
    firebaseID: req.firebaseUser.uid,
  };
  try {
    console.log('deposit', deposit);
    const newDeposit = await Transaction.create(deposit);
    res.status(201).json(newDeposit);
  } catch (error) {
    console.log(error);
  }
});

//withdraw
app.post('/transactions/withdraw', async (req, res) => {
  const { date, amount, balance } = req.body;
  const withdraw = {
    date,
    amount,
    type: 'Withdrawal',
    balance,
    firebaseID: req.firebaseUser.uid,
  };
  try {
    console.log('withdraw', withdraw);
    const newWithdraw = await Transaction.create(withdraw);
    res.status(201).json(newWithdraw);
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
