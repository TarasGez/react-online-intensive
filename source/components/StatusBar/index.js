// Core
import React, { Component } from 'react';
import cx from 'classnames';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';

// Components
import { withProfile } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';
import { socket } from 'socket/init';

@withProfile
export default class StatusBar extends Component {
    static propTypes = {
        _authorizationApp: func.isRequired,
    };

    state = {
        online: false,
    };

    componentDidMount () {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });

        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    _animatedStatusBarEnter = (statusBar) => {
        fromTo(statusBar, 1, { opacity: 0 }, { opacity: 1 });
    };

    _logOut = () => {
        const { _authorizationApp } = this.props;

        _authorizationApp(false);

        console.log("_logOut____________");
    }

    render () {
        const {
            avatar,
            currentUserFirstName,
        } = this.props;

        const { online } = this.state;

        const statusStyle = cx(Styles.status, {
            [Styles.online]:  online,
            [Styles.offline]: !online,
        });

        const statusMessage = online ? 'Online' : 'Offline';

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this._animatedStatusBarEnter }>
                <section className = { Styles.statusBar }>
                    <div className = { statusStyle }>
                        <div>{statusMessage}</div>
                        <span />
                    </div>
                    <Link to = '/profile'>
                        <img src = { avatar } />
                        <span>{currentUserFirstName}</span>
                    </Link>
                    <Link to = '/feed'>Feed</Link>
                    <button className = { Styles.logout } onClick = { this._logOut }>
                        Logout
                    </button>
                </section>
            </Transition>
        );
    }
}
