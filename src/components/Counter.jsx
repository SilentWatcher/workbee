import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount, fetchCounterValue } from '../features/counter/counterSlice'
import { Plus, Minus, RefreshCw } from 'lucide-react'
import './Counter.scss'

const Counter = () => {
  const { value, status, error } = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(increment())
  }

  const handleDecrement = () => {
    dispatch(decrement())
  }

  const handleIncrementByFive = () => {
    dispatch(incrementByAmount(5))
  }

  const handleFetchRandom = () => {
    dispatch(fetchCounterValue())
  }

  return (
    <div className="counter">
      <h2>Redux Counter</h2>
      <div className="counter__value">{value}</div>
      
      <div className="counter__buttons">
        <button 
          className="counter__button"
          onClick={handleDecrement}
          disabled={status === 'loading'}
        >
          <Minus size={16} />
        </button>
        
        <button 
          className="counter__button"
          onClick={handleIncrement}
          disabled={status === 'loading'}
        >
          <Plus size={16} />
        </button>
        
        <button 
          className="counter__button"
          onClick={handleIncrementByFive}
          disabled={status === 'loading'}
        >
          +5
        </button>
        
        <button 
          className="counter__button"
          onClick={handleFetchRandom}
          disabled={status === 'loading'}
        >
          <RefreshCw size={16} className={status === 'loading' ? 'spinning' : ''} />
        </button>
      </div>

      {status === 'loading' && (
        <div className="counter__status">Loading...</div>
      )}
      
      {error && (
        <div className="counter__error">Error: {error}</div>
      )}
    </div>
  )
}

export default Counter
