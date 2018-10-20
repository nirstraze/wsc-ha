import React from 'react';
import { cloneDeep, isEmpty } from 'lodash';
import { getFirstPlayer, getPlayerById, updatePlayerDetails } from '../services/service';
import { Detail } from './detail';

import './player-details.css';

const POLLING_INTERVAL = 1000; //ms

export class PlayerDetails extends React.Component {

    dirtyPropsMapping = {};
    pollingInterval;

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    render() {
        const { data } = this.state;
        return <>
            {this.jsonDataToDetails(data, [])}
            {!isEmpty(data) && <div className='save-button' onClick={this.onSaveBtnClick}>Save</div>}
        </>
    }

    jsonDataToDetails(data, propertyPath) {
        return <div>
            {data && Object.keys(data).map(key => {
                if (data[key] instanceof Object) {
                    const curretPropertyPath = propertyPath.slice();
                    curretPropertyPath.push(key);
                    return <div key={key}>
                        <Detail
                            key={key}
                            description={key}
                            propertyPath={curretPropertyPath}
                        />
                        {this.jsonDataToDetails(data[key], curretPropertyPath)} </div>
                }
                else {
                    const curretPropertyPath = propertyPath.slice();
                    curretPropertyPath.push(key);
                    //if it's a diry property that being edited then show it. Else show the original data
                    const valueToDisplay = this.dirtyPropsMapping[this.getPropertyMappingId(curretPropertyPath)] || data[key];
                    return <Detail
                        key={key}
                        description={key}
                        value={valueToDisplay}
                        propertyPath={curretPropertyPath}
                        handleOnChage={this.onPropertyChange(curretPropertyPath)} />;
                }
            })}
        </div>;
    }

    componentDidMount() {
        const getData = () => getFirstPlayer().then(data => {
            this.setState({ data: data });
            //console.log(data);
        })

        getData();
        this.pollingInterval = setInterval(this.refreshPlayerData, POLLING_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.pollingInterval);
    }

    refreshPlayerData = () => {
        const { data } = this.state;
        const playerId = data && !isEmpty(data) && data.id;
        if (playerId != null)
            getPlayerById(playerId).then(data => {
                this.setState({ data: data })
                //console.log(data);
            })
    }



    onPropertyChange = propertyPath => event => {
        this.dirtyPropsMapping[this.getPropertyMappingId(propertyPath)] = event.target.value;
        this.updatingDataState(propertyPath, event);
    }


    getPropertyMappingId(propertyPath) {
        return propertyPath.join('|');
    }

    updatingDataState(propertyPath, event) {
        //cloning the state to keep immutability
        const clonedData = cloneDeep(this.state.data);
        //updating the correct property using the property path
        let propToUpdate = clonedData[propertyPath[0]];
        for (let i = 1; i < propertyPath.length; i++) {
            const key = propertyPath[i];
            if (i === propertyPath.length - 1) {
                propToUpdate[key] = event.target.value;
            }
            else {
                propToUpdate = propToUpdate[key];
            }
        }
        this.setState({
            data: clonedData
        });
    }

    onSaveBtnClick = () => {
        const playerId = this.state.data.id;
        const updatedProps = Object.entries(this.dirtyPropsMapping);
        if (updatedProps && updatedProps.length > 0) {
            updatePlayerDetails(playerId, updatedProps);
        }
        this.dirtyPropsMapping = {};
    }
}