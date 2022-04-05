require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const authMiddleware = require('./middleware/auth');

const Transaction = require('./models/Transaction');
const User = require('./models/User');
const corsOptions = {
  origin: [
    'http://localhost:3000',
  ],
}

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


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
  const { name, email, password, firebaseID } = req.body;
  const user = {
    name,
    email,
    password,
    balance: 0,
    firebaseID
  };
  try {
    const newUser = await User.create(user);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
});

app.use(authMiddleware);

//get all accounts
app.get('/account/all', async (req, res) => {
  try {
    const accounts = await User.find({});
    res.status(200).send(accounts);
  } catch (error) {
    console.log(error);
  }
});

//dashboard - get users transactions
app.get('/transactions/all/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const transactions = await Transaction.find({
      firebaseID: id
    });
    res.status(200).send(transactions);
  } catch (error) {
    res.status(404).json({ message: 'Bad request' });
  }
});

//get balance
app.get('/transactions/balance/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const targetUser = await User.findOne({firebaseID: id})
    res.status(200).json(targetUser)
  }
  catch (error){
    console.log(error)
  }
})

// deposit
app.post('/transactions/deposit', async (req, res) => {
  const { date, amount, balance } = req.body;
  const deposit = {
    date,
    amount,
    type: 'Deposit',
    balance,
    firebaseID: req.firebaseUser.uid
  };
  try {
    console.log('deposit', deposit);
    const newDeposit = await Transaction.create(deposit);
    const targetUser = {firebaseID: req.firebaseUser.uid}
    console.log('targetUser', targetUser)
    const newBalance = {balance: deposit.balance}
    console.log('newBalance', newBalance)
    const updateBalance = await User.findOneAndUpdate(targetUser, newBalance, {
      new: true
    })
    console.log('updateBalance', updateBalance)
    res.status(201).json({newDeposit, updateBalance});
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
    const targetUser = {firebaseID: req.firebaseUser.uid}
    console.log('targetUser', targetUser)
    const newBalance = {balance: withdraw.balance}
    console.log('newBalance', newBalance)
    const updateBalance = await User.findOneAndUpdate(targetUser, newBalance, {
      new: true
    })
    res.status(201).json({newWithdraw, updateBalance});
  } catch (error) {
    console.log(error);
  }
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
