import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { generateSeed, hasValue, makeId, makeSarcastic } from 'utils/helpers';
import { useLocalStorage } from 'utils/use-local-storage';
import './App.css';
import { Authors } from './Authors/Component';
import { NoHistory } from './NoHistory/Component';
import { Shortcuts } from './Shortcuts/Component';



interface SarcasticValue {
  id: string
  rawValue: string
  seed: boolean[]
}

interface Props {
  notification: () => void
}


const Sarcasmonizer = (props: Props) => {
  const [value, setValue] = React.useState("");
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [items, setItems] = useLocalStorage<SarcasticValue[]>("Sarcasmonizr", []);

  const handleKeyPress = React.useCallback((event) => {
    // console.log(event.code)
    if ((event.metaKey || event.ctrlKey) && event.code === 'Enter') {
      console.log('We fire the Sarcasm')
      if (value.length > 0) {
        const newId = makeId(10)
        const newSeed = generateSeed()
        const obj = makeSarcastic(value, newSeed);
        navigator.clipboard.writeText(obj);
        props.notification()

        setItems([{
          id: newId ?? '',
          rawValue: value,
          seed: newSeed
        }, ...items]);
        setValue('')
      }
    } else if ((event.metaKey || event.ctrlKey) && event.code === 'Slash') {
      console.log('We fire the ReSarcasm')
      event.preventDefault();
      const item = items.find(item => item.id === activeId)
      if (hasValue(item)) {
        const newSeed = generateSeed()
        const obj = makeSarcastic(item.rawValue, newSeed);
        navigator.clipboard.writeText(obj);
        props.notification()


        const newItems = [...items].map(item => {

          if (item.id === activeId) {
            return {
              id: item.id,
              rawValue: item.rawValue,
              seed: newSeed
            }
          }

          return item
        })

        setItems(newItems);

      }
    } else if (event.code === 'Enter') {
      console.log('We fire the Copy')
      const item = items.find(item => item.id === activeId)
      if (hasValue(item)) {
        const obj = makeSarcastic(item.rawValue, item.seed);
        navigator.clipboard.writeText(obj);
        props.notification()
      }
    } else if (event.code === 'ArrowUp') {
      console.log('We fire the ArrowUp')
      event.preventDefault()
      runArrowUp();
    } else if (event.code === 'ArrowDown') {
      console.log('We fire the ArrowDown')
      event.preventDefault()
      runArrowDown()
    }
  }, [value, activeId]);

  const runArrowDown = () => {
    const currentIndex = items.findIndex(item => item.id === activeId)
    const nextIndex = currentIndex === -1 ? 0 : currentIndex === items.length - 1 ? 0 : (currentIndex + 1)
    setActiveId(items[nextIndex].id ?? '')
  }

  const runArrowUp = () => {
    const currentIndex = items.findIndex(item => item.id === activeId)
    const prevIndex = currentIndex === -1 ? items.length - 1 : (currentIndex === 0) ? items.length - 1 : (currentIndex - 1)
    setActiveId(items[prevIndex].id ?? '')
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const handleChange = (e: any) => {
    setActiveId(makeId(10))
    setValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  }

  React.useEffect(() => {
    if (!hasValue(activeId)) {
      setActiveId(makeId(10))
    }
  }, [])

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
        <input autoFocus type='text' tabIndex={1} placeholder="Write something and make it look saRcAstiC" value={value} onChange={handleChange} />
      </form>
      <div className='history'>
        <div className='raw'>
          <h3>Sarcasmonized history</h3>
          {Object.entries(items).length === 0 && (<NoHistory />)}
          {Object.entries(items).length !== 0 && (
            <ul>
              {Object.entries(items).map((item: [string, SarcasticValue]) => {
                const [key, value] = item;
                return (
                  <li key={key} className={activeId === value.id ? 'is-active' : ''}>
                    {value.rawValue}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className='sarcasm'>
          {Object.entries(items).length !== 0 && Object.entries(items).map((item: [string, SarcasticValue]) => {
            const [key, value] = item;

            return activeId === value.id ? (
              <p key={key}>
                {makeSarcastic(value.rawValue, value.seed)}
              </p>
            ) : (<></>)
          })
          }
        </div>
      </div>
      <Shortcuts disableExtra={items.filter(item => item.id === activeId).length === 0} />
      <Authors />
    </div>
  );
};

export default function App(props: Props) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sarcasmonizer notification={props.notification} />} />
      </Routes>
    </Router>
  );
}
