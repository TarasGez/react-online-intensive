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
    // loginStatus:          localStorage.getItem('isAutorized'),
};

@hot(module)
export default class App extends Component {
    state = {
        toRender: "Error render",
    }

    componentDidMount () {
        if (localStorage.getItem('isAutorized') === null) {
            console.log("localStorage.getItem('isAutorized'):", localStorage.getItem('isAutorized'));

            this._toRender(false);
        } else {
            console.log("__________localStorage.getItem('isAutorized'):", localStorage.getItem('isAutorized'));

            this._toRender(localStorage.getItem('isAutorized'));
        }
    }

    _toRender = (isAvtorised) => {
        console.log("_toRendered isAvtorised:", isAvtorised);

        if (isAvtorised === true) {
            console.log("_toRendered isAvtorised TRUE:", isAvtorised);

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
            console.log("_toRendered isAvtorised FALSE:", isAvtorised);

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
        localStorage.setItem('isAutorized', loginStatusState);

        console.log("________________authorizationApp:", loginStatusState);

        this.setState({
            isAvtorised: loginStatusState,
        });

        console.log("Set ________________authorizationApp:", localStorage.getItem('isAutorized', loginStatusState));

        this._toRender(loginStatusState);

        this.forceUpdate();
    }

    clearLS = () => {
        localStorage.clear();
        console.log("Clear");
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
