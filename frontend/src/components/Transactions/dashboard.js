import { useState, useEffect } from 'react';
import Card from '../Card'
import TransactionList from './TransactionList';
import { useAuth } from '../../contexts/Auth/authContext'
import { usersAPI, transactionsAPI } from '../../services/index.js';
import ContactButton from '../ContactButton';
import '../../components.css'

function Dashboard() {
  const auth = useAuth();
  const [transactions, setTransactions] = useState([])

  const getTransactions =  async () => {
    const response = await transactionsAPI.all();
    console.log(response.data)
    setTransactions(response.data);
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <><Card
      className='balance-card'
      bgcolor='light'
      txtcolor='black'
      header={`Hi `}
      title={`Your balance is $.`} />
      <h4>Recent Transactions</h4>
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

export default Dashboard;
