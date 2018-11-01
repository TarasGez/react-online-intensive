// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

// Components
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import Login from 'components/Login';
import { Provider } from 'components/HOC/withProfile';

// Instruments
import avatar from 'theme/assets/lisa';

const options = {
    avatar,
    currentUserFirstName: 'Тарас',
    currentUserLastName:  'Гезь',
};

@hot(module)
export default class App extends Component {
    state = {
        toRender: "Error render",
    }

    componentDidMount () {
        const localStorageData = JSON.parse(localStorage.getItem('isAutorized'));

        if (localStorage.getItem('isAutorized')) {
            this._toRender(localStorageData);
        } else {
            this._toRender(false);
        }
    }

    _toRender = (isAvtorised) => {
        if (isAvtorised) {
            this.setState({
                toRender:
                <>
                    <StatusBar _authorizationApp = { this._authorizationApp } />
                    <Switch>
                        <Route component = { Feed } path = '/feed' />
                        <Route component = { Profile } path = '/profile' />
                        <Redirect to = '/feed' />
                    </Switch>
                </>,
            });

        } else {
            this.setState({
                toRender:
                <>
                    <Switch>
                        <Route path = '/login' render = { () => <Login _authorizationApp = { this._authorizationApp } /> } />
                        <Redirect to = '/login' />
                    </Switch>
                </>,
            });
        }
    };

    _authorizationApp = (loginStatusState) => {
        localStorage.setItem('isAutorized', JSON.stringify(loginStatusState));

        this.setState({
            isAvtorised: loginStatusState,
        });

        this._toRender(loginStatusState);

        this.forceUpdate();
    }

    clearLS = () => {
        localStorage.clear();
    }

    render () {
        const { toRender } = this.state;

        return (
            <Catcher>
                <Provider value = { options } >
                    <button onClick = { this.clearLS }>Clean LocalStorage</button>
                    { toRender }
                </Provider>
            </Catcher>
        );
    }
}
