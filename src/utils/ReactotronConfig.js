import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

import { reactotronUrl } from '../../secrets';

if (__DEV__) {
    const tron = Reactotron.configure({ host: reactotronUrl })
        .configure()
        .useReactNative()
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect();

    tron.clear();
    console.tron = tron;
}
