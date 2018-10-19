const url = 'https://nodesenior.azurewebsites.net';

export const getAll = () => {
    const getAllurl = url + '/player/681'

    return new Promise(resolve => fetch(getAllurl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    }).then(function (response) {
        return response.json();
    }).then(function (myJson) {
         resolve(myJson);
    }))
}