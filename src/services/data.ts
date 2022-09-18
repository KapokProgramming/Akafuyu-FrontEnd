export function authHeader() {
    const token = localStorage.getItem("jwt");
    let jwt = null;
    if (token) {
        jwt = `${token}`;
    }
    if (jwt) {
        return 'Bearer ' + jwt;
    } else {
        return '';
    }
}

export function logout() {
    localStorage.removeItem("jwt");
    window.location.href = "/";
}
