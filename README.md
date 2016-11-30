# redux-cookies
Redux cookies-middleware and cookies-actions for Isomorphic(Universal) cookies

#Server-side
```javascript
import {createStore, applyMiddleware} from 'redux';
import Cookies from 'cookies';
import {getCookiesMiddleware} from 'redux-cookies';
import {createServer} from 'http';
import reducer from './reducer';

createServer(function(req, res) {
    const cookies = new Cookies(req, res);
    const store = createStore(
      reducer,
      applyMiddleware(getCookiesMiddleware(cookies))
    );
    //...
}).listen(3000);
```

#Client-side
```javascript
import Cookies from 'cookies-js';
import {getCookiesMiddleware} from 'redux-cookies';
import reducer from './reducer';
const store = createStore(
  reducer,
  applyMiddleware(getCookiesMiddleware(Cookies))
);
```

#Actions
```javascript
import {cookiesGet} from 'redux-cookies';

export function alertSomething() {
    return dispatch => {
        const something = dispatch(cookiesGet('something'));
        window.alert(something);
    };
}
```

#Usage
`redux-cookies` exposes `cookiesSet`, `cookiesSet` and `cookiesExpire`

`cookiesSet` takes a "cookie name", "cookie value" and an optional "options"  // options like "expires"
`cookiesGet` takes a "cookie name"
`cookiesExpire` takes a "cookie name" and an "option"

```javascript
import { cookiesSet, cookiesGet, cookiesExpire } from 'redux-cookie';

dispatch(cookiesSet('AUTH_TOKEN', '1234abc...', { expires: 3600 })) // Expire in one hour

const token = dispatch(cookiesGet('AUTH_TOKEN')) // return the cookie value

dispatch(cookiesExpire('AUTH_TOKEN'))  // expire cookie now

dispatch(cookiesExpire('AUTH_TOKEN', { expires: 3600 })) // Expire in one hour
```
