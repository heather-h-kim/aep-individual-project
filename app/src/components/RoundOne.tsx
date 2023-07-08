import { useEffect, useState } from 'react';
import { useIndexStore } from '../store/stateStore';

const RoundOne = ({ handleIndexState }) => {
  const { index, updateIndex } = useIndexStore(state => ({
    index: state.index,
    updateIndex: state.updateIndex,
  }));

  console.log('in round 1');

  useEffect(() => {
    console.log('in round 1 useEffect');
    // const timer = setTimeout(() => {
    //   console.log('in timeout');
    //   handleIndexState();
    // }, 1000);
    // return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>Round 1</h1>
      {/*<button onClick={handleIndexState}>Index Up</button>*/}
    </div>
  );
};

export default RoundOne;
