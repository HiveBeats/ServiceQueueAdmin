import { AxiosResponse } from 'axios';
import apiBase from '../../apiBase';

export interface IServiceRoot {
    root: IService[]
}

export interface IService {
    key: string,
    label: string,
    icon: string,
    children: IService[]
}

export interface IServiceCreateDto{
    name: string,
    parentId: string
}

export interface IMessageType {
    name: string,
    serviceId: string,
    solveByReading: boolean,
}

export interface IMessageTypeCreateDto {
    name: string,
    serviceId: string,
    solveByReading: boolean
}

export interface IMessageTypeDeleteDto {
    service: string,
    name: string
}

export class ServiceApi {
    getItems(): Promise<IService[]> {
        return apiBase.get<IServiceRoot>('Service').then(d => d.data.root);
    }

    insertService(item:IServiceCreateDto): Promise<AxiosResponse<any>> {
        return apiBase.post('Service', item);
    }

    deleteService(id:string): Promise<AxiosResponse<any>> {
        const url = `Service/${id}`;
        return apiBase.delete(url);
    }

    getMessageTypes(id:string): Promise<IMessageType[]> {
        const url = `Service/Get/${id}/MessageTypes`;
        return apiBase.get<IMessageType[]>(url).then(d => d.data);
    }

    createMessageType(item:IMessageTypeCreateDto): Promise<AxiosResponse<any>> {
        return apiBase.post('Service/CreateMessageType', item);
    }

    deleteMessageType(item:IMessageTypeDeleteDto): Promise<AxiosResponse<any>> {
        return apiBase.post('Service/DeleteMessageType', item);
    }
}