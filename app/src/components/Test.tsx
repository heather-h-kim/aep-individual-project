import { useState } from 'react';

const Test = () => {
  const [array, setArray] = useState([1, 2, 3]);
  const [index, setIndex] = useState(0);

  for (let index = 0; index < array.length; index++) {
    array[index] = array[index] + 1;
  }
};

export default Test;
