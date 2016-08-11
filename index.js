var REDUX_COOKIES_GET = 'REDUX_COOKIES_GET';
var REDUX_COOKIES_SET = 'REDUX_COOKIES_SET';
var REDUX_COOKIES_EXPIRE = 'REDUX_COOKIES_EXPIRE';

module.exports = {
    cookiesGet : function cookiesGet(name) {
        return {
            type : REDUX_COOKIES_GET,
            name : name
        };
    },
    cookiesSet : function cookiesSet(name, value, options) {
        return {
            type : REDUX_COOKIES_SET,
            name : name,
            value : value,
            options : options
        };
    },
    cookiesExpire : function cookiesExpire(name, options) {
        return {
            type : REDUX_COOKIES_EXPIRE,
            name : name,
            options : options
        };
    },
    getCookiesMiddleware : function getCookiesMiddleware(cookies) {
        if(process.env.NODE_ENV === 'development') {
            if(!('get' in cookies) || !('set' in cookies)) {
                throw new Error('cookies : {get : function(name){/*...*/}, set : function(name, value){/*...*/}}');
            }
        }
        return function () {
            return function (next) {
                return function (action) {
                    switch (action.type) {
                        case REDUX_COOKIES_GET:
                            try {
                                return cookies.get(action.name);
                            } catch (e) {
                                return undefined;
                            }
                        case REDUX_COOKIES_SET:
                            return cookies.set(action.name, action.value, action.options);
                        case REDUX_COOKIES_EXPIRE:
                            return cookies.set(action.name, undefined, action.options);
                    }
                    return next(action);
                };
            };
        };
    }
}
