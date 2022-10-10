export const makeId = (length: number): string => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}

export function hasValue<T> (v: T | undefined | null): v is T {
  return v !== null && v !== undefined
}


export const makeSarcastic = (value: string, seed: boolean[]):string => {
  const valueArr = value.split('')
  const sarcasticValue = valueArr.map((val, index) => seed[index % seed.length] === true ? val.toLowerCase() : val.toUpperCase())

  return sarcasticValue.join('')
}

export const generateSeed = () => {
  return [...Array(20)].map(_ => Math.round(Math.random()) === 0)
}