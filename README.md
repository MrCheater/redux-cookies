# redux-cookies
Redux cookies-middleware and cookies-actions

#Server-side
```javascript
import { createStore, applyMiddleware } from 'redux';
import Cookies from 'cookies';
import {getCookiesMiddleware} from 'redux-cookies-middleware';
import { createServer } from 'http';
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
import {getCookiesMiddleware} from 'redux-cookies-middleware';
import reducer from './reducer';
const store = createStore(
  reducer,
  applyMiddleware(getCookiesMiddleware(Cookies))
);
```
