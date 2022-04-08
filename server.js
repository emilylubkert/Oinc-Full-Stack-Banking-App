require('dotenv').config();
const express = require('express');
const app = express();
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

const PORT = process.env.PORT || 8080

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

try {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(console.log('Connected successfully to db server!'));
} catch (error) {
  console.log(error);
}

//create user
app.post('/account/create', async (req, res) => {
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

// app.use(authMiddleware);

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
  const { date, amount, balance, firebaseID } = req.body;
  const deposit = {
    date,
    amount,
    type: 'Deposit',
    balance,
    firebaseID
  };
  try {
    const newDeposit = await Transaction.create(deposit);
    const targetUser = {firebaseID: firebaseID}
    const newBalance = {balance: deposit.balance}
    const updateBalance = await User.findOneAndUpdate(targetUser, newBalance, {
      new: true
    })
    res.status(201).json({newDeposit, updateBalance});
  } catch (error) {
    console.log(error);
  }
});

//withdraw
app.post('/transactions/withdraw', async (req, res) => {
  const { date, amount, balance, firebaseID } = req.body;
  const withdraw = {
    date,
    amount,
    type: 'Withdrawal',
    balance,
    firebaseID,
  };
  try {
    const newWithdraw = await Transaction.create(withdraw);
    const targetUser = {firebaseID: firebaseID}
    const newBalance = {balance: withdraw.balance}
    const updateBalance = await User.findOneAndUpdate(targetUser, newBalance, {
      new: true
    })
    res.status(201).json({newWithdraw, updateBalance});
  } catch (error) {
    console.log(error);
  }
});

// app.use(express.static(path.join(__dirname, './frontend/build')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './frontend/build/index.html'))
// })

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
