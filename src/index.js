
import React, { Component } from "react"
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import store from "./store/store"
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
class APPmain extends Component {
    render() {
        return <Provider store={store}>
            <AppContainer>
                <App />
            </AppContainer>
        </Provider>
    }
}
ReactDOM.render(<APPmain />, document.getElementById('root'));
registerServiceWorker();