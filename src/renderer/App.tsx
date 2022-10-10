import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Authors } from './Authors/Component';
import { NoHistory } from './NoHistory/Component';
import { Shortcuts } from './Shortcuts/Component';

const Sarcasmonizer = () => {
  const [value, setValue] = React.useState("");
  const [sarcasm, ] = React.useState<number[]>([...Array(20)].map(a => Math.round(Math.random())))
  const handleKeyPress = React.useCallback((event) => {
    if ((event.metaKey || event.ctrlKey) && event.code === 'Enter') {
        console.log('We fire the Sarcasm')
        console.log(value.split('').map((val, index) => sarcasm[index % 20] === 0 ? val.toLowerCase() : val.toUpperCase()).join(''))
    }else if(event.code === 'Enter'){
        console.log('We fire the Copy')
        console.log(value)
        console.log(sarcasm)
    }
  }, [value]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  // React.useEffect(() => {
  //   const sarcasmizer = (value: string) => {
  //     let tuple:[string | null, number | null] = [null, null];
  //     return value
  //       .split("")
  //       .map((val: string) => {
  //         const shouldLowercase: boolean = Math.floor(Math.random() * 10) >= 5;
  //         const [type, amount] = tuple
  //         if(val === ' '){
  //           return val
  //         }
  //         if(tuple === [null,null]){
  //            if(shouldLowercase){
  //              tuple = ['l', 1]
  //              return val.toLowerCase()
  //         }
  //         if(!shouldLowercase){
  //           tuple = ['u', 1]
  //         }
  //         return val.toUpperCase()
  //         }
  //         if((type === 'l' && amount !== null && amount > 2) && shouldLowercase){
  //           tuple = ['u', 1]
  //           return val.toUpperCase()
  //         }
  //         if((type === 'u' && amount !== null && amount > 2) && !shouldLowercase){
  //           tuple = ['l', 1]
  //           return val.toLowerCase()
  //         }
  //         if(shouldLowercase){
  //           tuple = ['l', amount !== null ? amount+1 : 1]
  //           return val.toLowerCase()
  //         }
  //         if(!shouldLowercase){
  //           tuple = ['u', amount !== null ? amount+1 : 1]
  //           return val.toUpperCase()
  //         }

  //       })
  //       .join("");
  //   };

  //   setValue(sarcasmizer(value));
  // }, [active]);

  

  return (
    <div className='content'>
      <form onSubmit={handleSubmit} method='post'>
        <input type='text' tabIndex={1} placeholder="Write something and make it look saRcAstiC" value={value} onChange={handleChange} />
      </form>
      <div className='history'>
        <div className='raw'>
          <h3>Sarcasmonized history</h3>
          <NoHistory />
        </div>
        <div className='sarcasm'>b</div>
      </div>
      <Shortcuts />
      <Authors />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sarcasmonizer />} />
      </Routes>
    </Router>
  );
}
