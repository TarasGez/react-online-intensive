// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {
    static propTypes = {
        _authorizationApp: func.isRequired,
    };

    _logIn = () => {
        const { _authorizationApp } = this.props;

        console.log("_logIn Login!!!");

        _authorizationApp(true);
    }

    render () {
        return (
            <section className = { Styles.login }>
                <h1>Authorization</h1>
                <button onClick = { this._logIn }>
                    Login
                </button>
            </section>
        );
    }
}
