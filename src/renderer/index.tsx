import { render } from 'react-dom';
import App from './App';

// function doNotify() {
//   Notification.requestPermission().then(function (result) {
//     const notification = new Notification('SaRcaSmOnIZEr', {
//       'body': 'Paste your text anywere, we put it on your clipboard',
//       'icon': 'whatever'
//     })
//   });
// }

render(<App />, document.getElementById('root'));
