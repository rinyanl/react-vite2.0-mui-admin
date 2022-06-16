import { useState, useMemo, useEffect } from 'react';
import cookie from 'react-cookies';

import Theme from '@/styles/Theme';
import eventBus from '@/utils/eventBus';

function App() {
    const getLoginStatus = () => {
        const userToken = cookie.load('userToken');
        const userId = cookie.load('userId');
        if (userId && userToken) {
            return true;
        } else {
            return false;
        }
    };

    const [loginStatus, setLoginStatus] = useState(getLoginStatus());

    useEffect(() => {
        eventBus.on('setLoginStatusEvent', val => {
            setLoginStatus(val);
        });
    }, []);

    return (
        <div className="App">
            <Theme loginStatus={loginStatus} setLoginStatus={setLoginStatus}>
                {' '}
            </Theme>
        </div>
    );
}

export default App;
