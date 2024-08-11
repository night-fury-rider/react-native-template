import {Provider} from 'react-redux';

import App from 'App';
import {store} from '$clubhouse/redux/store';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
