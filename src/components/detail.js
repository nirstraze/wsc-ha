import React from 'react';
import { isImage, isVideo } from '../utils/url-utils';
import { getReadbleText, isNumericData } from '../utils/text-utils';

import './detail.css';

const DEPTH_MARGIN = 20;
const DEPTH_OPACITY = 0.23;

export class Detail extends React.Component {
    render() {
        const { value, description, propertyPath } = this.props;

        const detailStyle = {
            marginLeft: (20 + (propertyPath.length - 1) * DEPTH_MARGIN) + 'px',
        };

        return (<div className='detail' style={detailStyle}>
            {this.getDetailsText(description, value, propertyPath.length - 1)}
            {this.handleMediaUrl(value)}
        </div>);
    }

    getDetailsText(description, value, depth) {
        const descToDisplay = getReadbleText(description);
        const bulletStyle = {
            opacity: 1 - (depth) * DEPTH_OPACITY
        };
        return <div className='details-text'>
            <div className='bullet-square' style={bulletStyle}></div>
            <div className='description'>{descToDisplay}</div>
            {value && <input
                type={isNumericData(value) ? 'number' : 'text'}
                value={value}
                onChange={this.props.handleOnChage} />}
        </div>
    }

    /**
     * If value is a video or image url, it will be displayed
     * @param {string} value 
     */
    handleMediaUrl(value) {
        if (isImage(value)) {
            return <img className='image' src={value} />;
        } else if (isVideo(value)) {
            return <video
                src={value}
                controls
                muted
                width="300"
                height="200" />
        }
    }    
}