import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../redux/slice/counter.slice';

function Counter(props) {
    const dispatch = useDispatch();
    const c = useSelector(state => state.count);
    console.log(c);
    const handleinc = () => {
        dispatch(increment());
    }
    const handledec = () => {
        dispatch(decrement());
    }
    return (
        <div>
            <h2>Counter</h2>
            <Button onClick={handledec} >-</Button>
            <span>{c.count}</span>
            <Button onClick={handleinc}>+</Button>
        </div>
    );
}
export default Counter;

