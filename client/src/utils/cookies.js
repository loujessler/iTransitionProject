const cookies = {
    get(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    },

    set(name, value, days, secure = true, samesite = 'Strict') {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        let cookieString = name + "=" + (value || "") + expires + "; path=/";
        if (secure) {
            cookieString += "; secure";
        }
        cookieString += "; samesite=" + samesite;
        document.cookie = cookieString;
    },

    delete(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};

export default cookies;
