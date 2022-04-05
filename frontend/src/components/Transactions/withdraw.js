import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/Auth/authContext';
import { transactionsAPI } from '../../services';
import Card from '../Card'
import ContactButton from '../Home/ContactButton';
import TransactionList from './TransactionList';
import '../../components.css'

function Withdraw() {
  const auth = useAuth();
  const [show, setShow] = useState(true);
  const [withdraw, setWithdraw] = useState('');
  const [currentBalance, setCurrentBalance] = useState('loading');
  const [isValid, setIsValid] = useState(false);
  const [transactions, setTransactions] = useState([])

  const getTransactions =  async () => {
    const response = await transactionsAPI.all();
    console.log('get API response',response.data);
    setTransactions(response.data);
  }

  const getBalance = async () => {
    const response = await transactionsAPI.balance(auth.auth.uid);
    console.log('get balance', response.data)
    setCurrentBalance(response.data.balance)
  }

  useEffect(() => {
    getTransactions(); 
    getBalance()
  }, [])

  let today = new Date();
  let date = `${
    today.getMonth() + 1
  }-${today.getDate()}-${today.getFullYear()}`;

  const handleChange = (event) => {
    setWithdraw(Number(event.target.value));
    if (withdraw < 0) {
      alert('Withdrawal amount must be a positive number');
      setWithdraw('');
      return setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  async function handleWithdraw() {
    console.log(`withdrawal is ${withdraw}`);
    if (withdraw > currentBalance) {
      alert('Insufficient Funds');
      setWithdraw('');
      return setIsValid(false);
    }
    let newBalance = currentBalance - withdraw;
    setCurrentBalance(newBalance);
    const response = await transactionsAPI.withdraw(date, withdraw, newBalance);
    console.log('new withdraw response', response.data.newWithdraw);
    setCurrentBalance(response.data.updateBalance.balance)
    await getTransactions();
  
    
    setShow(false);
    setWithdraw('');
    setIsValid(false);
  }

  function clearForm() {
    setWithdraw('');
    setShow(true);
  }


  return (
    <>
      <Card
        
        bgcolor='light'
        txtcolor='black'
        header='Withdraw Funds'
        title={`Your balance is $${currentBalance}.`}
        body={
          show ? (
            <>
              Withdrawal Amount
              <br />
              <input
                type='number'
                className='form-control'
                id='withdraw'
                placeholder='Enter withdrawal amount'
                value={withdraw}
                onChange={handleChange}
              />
              <br />
              <input
                type='submit'
                className='btn btn-dark'
                onClick={handleWithdraw}
                disabled={!isValid}
              />
            </>
          ) : (
            <>
            <div className='deposit-withdraw-card'>
              <h5>Success! Withdraw processed.</h5>
              <button
                type='submit'
                className='btn btn-dark'
                onClick={clearForm}
              >
                Withdraw More Money
              </button>
              </div>
            </>
          )
        }
      />
      <table className='transaction-list'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Account Balance</th>
          </tr>
        </thead>
        <tbody>
          <TransactionList transactions={transactions} />
        </tbody>
      </table>
      <ContactButton />
    </>
  );
}

export default Withdraw;
