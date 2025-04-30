import React, { useEffect, useState } from 'react';

function Jocks() {
    const [data, setData] = useState({});
    const fetchData = async () => {    
        const response = await fetch('https://official-joke-api.appspot.com/random_joke');
        const result = await response.json();
        setData(result);
        console.log(result);  
    };

    useEffect(() => {
        fetchData();
    },[])
    const handleCilck = () => {
        fetchData();
    }
    return (
        <div>
            {data &&  (
                <div>
                    <h5>Punchline:{data.punchline}</h5>
                    <p><span>Setup:</span>{data.setup}</p>
                    <p><span>Type:</span>{data.type}</p>
                </div>
            )}
            <button onClick={handleCilck}>
                Next
            </button>
        </div>
    );
}
export default Jocks;