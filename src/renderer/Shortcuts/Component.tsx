import './style.css';

export const Shortcuts = () => {

  return (

      <div className='shortcuts'>
        <ul>
          <li className='disabled'>
            Move up / down in list
            <span className='group'>
              <span className='key'>↓</span>
              <span className='key'>↑</span>
            </span>
          </li>
          <li className='divider' />

          <li className='disabled'>
            Copy selected
              <span className='key group'>↩</span>
          </li>
          <li className='divider' />
     
          <li>
            Make sarcastic & copy
            <span className='group'>
              <span className='key'>⌘</span>
              <span className='key'>↩</span>
            </span>
          </li>
        </ul>
      </div>
  );
};