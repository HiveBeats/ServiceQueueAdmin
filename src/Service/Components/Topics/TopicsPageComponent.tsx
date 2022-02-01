import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import React, {useContext, useState, useEffect} from 'react';
import Spinner from '../../../Shared/Components/Spinner/Spinner';
import useLoading from '../../../Shared/Hooks/useLoading';
import { ITopic, ITopicCreateDto, IService, ServiceApi } from '../../api/api'
import TopicFormComponent from './TopicFormComponent';
import { TopicsListComponent } from './TopicsListComponent';


type PropType = {currentItem:IService|undefined}
export default function TopicsPageComponent(props:PropType) {
    const [types, setTypes] = useState<ITopic[]>();
    const [current, setCurrent] = useState<ITopic>();
    const [doRefresh, isLoading] = useLoading(refresh);
    const [isAdding, setIsAdding] = useState<boolean>(false);
    const apiService = new ServiceApi();

    useEffect(() => {
        doRefresh();
    }, [props]);

    function refresh(): Promise<any> {
        if (!props.currentItem)
            return Promise.reject();

        setCurrent(undefined);
        return apiService.getTopics(props.currentItem?.key).then(data => {
            setTypes(data);
        })
        .catch(e => console.log(e));
    }

    function showAdding() {
        setIsAdding(true);
    }

    const confirmDelete = () => {
        confirmDialog({
            message: `Вы, действительно, хотите удалить ${current?.name}?`,
            header: 'Подтверждение',
            icon: 'pi pi-exclamation-triangle',
            accept: () => onDeletingAction(),
            reject: () => {}
        });
    }

    function onDeletingAction() {
        if (!current || !props.currentItem)
            return;

        apiService.deleteTopic(current.id).then(d => {
            doRefresh();
        })
        .catch((e) => {
            alert(e);
        });
    }

    function onAddingFormAction(item: ITopicCreateDto) {
        apiService.createTopic(item).then(d => {
            setIsAdding(false);
            doRefresh();
        })
        .catch((e) => {
            alert(e);
        });
    }

    const renderItems = (items:ITopic[]|undefined, isLoading:boolean, setCurrent:(item:ITopic)=> void) => {
        if (isLoading && props.currentItem) {
            return (
                <React.Fragment>
                    <Spinner/>
                </React.Fragment>
            )
        }
        else return (
            <React.Fragment>
                <TopicsListComponent items={items} current={current} setCurrent={setCurrent}/>
            </React.Fragment>
        )
    }

    const toolbarContent = () => {
        return (
            <React.Fragment>
                <Button icon="pi pi-plus" className="p-mr-2" onClick={showAdding} disabled={!props.currentItem}/>
                <Button icon="pi pi-times-circle" className="p-mr-2 p-button-danger" onClick={confirmDelete} disabled={!current}/>
                <Button icon="pi pi-refresh" className="p-mr-2 p-button-success" onClick={doRefresh}/>
            </React.Fragment>
        )
    }

    const toolbarTitle = () => {
        return (
            <React.Fragment>
                <h5>Типы сообщений</h5>
            </React.Fragment>
        )
    }
    
    return (
        <React.Fragment>
            <Dialog header="Добавить тип сообщений" visible={isAdding} style={{ width: '50vw' }} onHide={() => setIsAdding(false)}>
                <TopicFormComponent serviceId={props.currentItem?.key} onResult={onAddingFormAction}/>
            </Dialog>
            <div className="col-12">
                <div className="row">
                    <Toolbar left={toolbarTitle} right={toolbarContent} style={{minWidth:'100%'}}/>
                </div>
                <div className="row">
                    {renderItems(types, isLoading, setCurrent)}
                </div>
            </div>
        </React.Fragment>
            
    )
}