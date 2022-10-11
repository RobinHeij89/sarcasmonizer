import { render } from 'react-dom';
import App from './App';

function doNotify() {
  Notification.requestPermission().then(function (result) {
    const notification = new Notification('Sarcasmonizr', {
      'body': 'Paste your text anywere, we put it on your clipboard',
      'icon': 'whatever'
    })
  });
}

render(<App notification={doNotify} />, document.getElementById('root'));
