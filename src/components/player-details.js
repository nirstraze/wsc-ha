import React from 'react';
import { cloneDeep } from  'lodash';
import { getAll } from '../services/service';
import { Detail } from './detail';

export class PlayerDetails extends React.Component {

    pollingInterval;

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            editedData: {}
        };
    }

    render() {
        const { data } = this.state;
        return this.jsonDataToDetails(data, [])
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
                    return <Detail
                        key={key}
                        description={key}
                        value={data[key]}
                        propertyPath={curretPropertyPath}
                        handleOnChage={this.onPropertyChange(curretPropertyPath)} />;
                }
            })}
        </div>;
    }

    componentDidMount() {
        const getData = () => getAll().then(data => {
            this.setState({ data: data })
            console.log(data);
        })

        getData();
        //this.pollingInterval = setInterval(getData, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.pollingInterval);
    }

    onPropertyChange = propertyPath => event => {
        const clonedData =  cloneDeep(this.state.data);        
        let editedProp = clonedData[propertyPath[0]];;
        for (let i = 1; i < propertyPath.length; i++) {
            const key = propertyPath[i];
            if (i === propertyPath.length - 1) {
                editedProp[key] = event.target.value;
            }
            else {
                editedProp = editedProp[key];
            }
        }

        this.setState({
            editedData: Object.assign({}, this.state.editedData, editedProp),
            data: clonedData
        });
    }

    // updatingData(propertyPath, event) {
    //     const newData = Object.assign({}, this.state.data);
    //     let propToUpdate = newData[propertyPath[0]];
    //     for (let i = 1; i < propertyPath.length; i++) {
    //         const key = propertyPath[i];
    //         if (i === propertyPath.length - 1) {
    //             propToUpdate[key] = event.target.value;
    //         }
    //         else {
    //             propToUpdate = propToUpdate[key];
    //         }
    //     }
    //     this.setState({
    //         data: newData
    //     });
    // }
}