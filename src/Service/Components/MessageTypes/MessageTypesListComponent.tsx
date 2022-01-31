import * as React from 'react';
import { ITopic } from '../../api/api';
import './MessageTypesListComponent.css';

const styles = {
    ul: {
        listStyle: 'none',
        height:'100%',
        width:'100%',
        padding:'0',
        maring:'0'
    },
    cardContainer: {
        height: '100%',
        width:'100%'
    }
}
type SetCurrentType = (item:ITopic) => void; //todo shared generic
type PropType = {items:ITopic[]|undefined, current:ITopic|undefined, setCurrent:SetCurrentType} //shared generic?
export function MessageTypesListComponent(props:PropType) {

    const itemTemplate = (item:ITopic) => {
        return (
            <div className={item.name === props.current?.name ? 'list-item list-item-selected':'list-item'} onClick={(e) => props.setCurrent(item)}>
                    <span className="p-mb-2">{item.name}</span>
                    <span className={item.solveByReading ? 'pi pi-check-square p-mt-2' : ''}/>
            </div>
        );
    }

    return (
            <ul style={styles.ul}>
                {props.items && props.items.map((i) => {
                    return <li>{itemTemplate(i)}</li>
                })}
            </ul>
    );

}
