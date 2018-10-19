const url = 'https://nodesenior.azurewebsites.net';

export const getAll = () => {
    const getAllurl = url + '/player/all'

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

export const getPlayerById = (playerId) => {
    const getPlayerUrl = `${url}/player/${playerId}`;

    return new Promise(resolve => fetch(getPlayerUrl, {
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


export const getFirstPlayer = () => {
    return new Promise(resolve => {
        getAll().then(list => {
            getPlayerById(list[0]).then(function (response) {
                resolve(response);
            });
        })
    })
}