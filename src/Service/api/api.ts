import { AxiosResponse } from 'axios';
import apiBase from '../../apiBase';

export interface IServiceRoot {
    root: IService[]
}

export interface IService {
    key: number,
    label: string,
    icon: string,
    children: IService[]
}

export interface IServiceCreateDto{
    name: string,
    parentId: number
}

export interface ITopic {
    id: number,
    name: string,
    serviceId: number,
    solveByReading: boolean,
}

export interface ITopicCreateDto {
    name: string,
    serviceId: number,
    solveByReading: boolean
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

    getTopics(id:number): Promise<ITopic[]> {
        const url = `Queue/Topic?serviceId=${id}`;
        return apiBase.get<ITopic[]>(url).then(d => d.data);
    }

    createTopic(item:ITopicCreateDto): Promise<AxiosResponse<any>> {
        return apiBase.post('Queue/Topic', item);
    }

    deleteTopic(id:number): Promise<AxiosResponse<any>> {
        return apiBase.delete(`Queue/Topic/${id}`);
    }
}