import * as React from 'react';
import { ServiceContext } from '../Context/ServiceContext';
import TopicsPageComponent from './MessageTypes/TopicsPageComponent';

export default function ServiceDetailPageComponent() {

    return (
        <ServiceContext.Consumer>
            {({currentItem}) => (
                <TopicsPageComponent currentItem={currentItem}/>
            )}
        </ServiceContext.Consumer>
    )
}