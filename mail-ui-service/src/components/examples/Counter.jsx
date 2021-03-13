import React, {useEffect} from 'react'
import counter from "../../store/examples/counter"
import {observer} from "mobx-react-lite"

const Counter = observer(() => {

    useEffect(() => {
        console.log(`Count: ${counter.count}`)
    })

    return (
        <div>
            <div>{`Count: ${counter.count}`}</div>
            <div>
                <button onClick={() => counter.increment()}>+</button>
                <button onClick={() => counter.decrement()}>-</button>
            </div>
        </div>
    );
});

export default Counter
