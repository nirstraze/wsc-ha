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

export const updatePlayerDetails = (playerId, updatedProps) => {
    let message = `Updating player with id ${playerId}. These are the updated properties:\n`;
    updatedProps.forEach(property => {
        message += `${property[0]}: ${property[1]}` + '\n';
    });

    console.log(message);

    //TODO: since formation of json for updating player details is unknown, the POST call is not being excuted

    // const getPlayerUrl = `${url}/player/${playerId}`;
    // fetch(getPlayerUrl, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json; charset=utf-8",
    //     },
    // });
}