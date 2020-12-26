
export const normalizeResponseErrors = res => {
    if (!res.ok) {
        if (
            res.headers.has('content-type') &&
            res.headers.get('content-type').startsWith('application/json')
        ) {

            return res.json().then(err => Promise.reject(err));
        }
        // restituisce un errore con meno info...
        return Promise.reject({
            code: res.status,
            message: res.statusText
        });
    }
    return res;
};