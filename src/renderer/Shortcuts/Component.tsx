import { hasValue } from 'utils/helpers';
import './style.css';

interface Props {
  disableExtra: boolean
}

export const Shortcuts = ({ disableExtra }: Props) => {

  return (

    <div className='shortcuts'>
      <ul>
        <li className={hasValue(disableExtra) && disableExtra ? 'disabled' : ''}>
          Move up / down in list
          <span className='group'>
            <span className='key'>↓</span>
            <span className='key'>↑</span>
          </span>
        </li>
        <li className='divider' />

        <li className={hasValue(disableExtra) && disableExtra ? 'disabled' : ''}>
          Re-sarcasmonize
          <span className='group'>
            <span className='key'>⌘</span>
            <span className='key'>/</span>
          </span>
        </li>
        <li className='divider' />

        <li className={hasValue(disableExtra) && disableExtra ? 'disabled' : ''}>
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