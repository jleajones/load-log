import React, { useState } from 'react';

const AddressInput = () => {
    const [address, setAddress] = useState({});

    const handleOnchange = (e) => {
        console.log('Input Value: ', e.target.value);
    };

    return (
        <input name="address" type="text" onChange={handleOnchange} />
    )
};

export default AddressInput;
