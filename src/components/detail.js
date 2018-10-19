import React from 'react';
import { isImage, isVideo } from '../utils/url-utils';
import { camelCaseToNormal, isNumericData } from '../utils/text-utils';

const DEPTH_MARGIN = 20;
const DEPTH_OPACITY = 0.23;

import './detail.css';

export class Detail extends React.Component {
    render() {
        const { value, description, propertyPath } = this.props;

        const detailStyle = {
            marginLeft: (propertyPath.length - 1) * DEPTH_MARGIN + 'px',
        };

        return (<div className='detail' style={detailStyle}>
            {this.getDetailsText(description, value, propertyPath.length - 1)}
            {isImage(value) && <img className='image' src={value} />}
            {isVideo(value) && <video src={value} controls
                muted
                width="300"
                height="200" />}
        </div>);
    }

    getDetailsText(description, value, depth) {
        const descToDisplay = camelCaseToNormal(description);
        const bulletStyle = {
            opacity: 1 - (depth) * DEPTH_OPACITY
        };
        return <div className='details-text'>
            <div className='bullet-square' style={bulletStyle}></div>
            <div className='description'>{descToDisplay}</div>
            {/* <DetailInput value={value} /> */
                value && <input type={isNumericData(value) ? 'number' : ''} value={value} onChange={this.props.handleOnChage} />}
        </div>
    }
}