import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { SystemEventV1 } from './SystemEventV1';
import { IEventLogClientV1 } from './IEventLogClientV1';
export declare class EventLogNullClientV1 implements IEventLogClientV1 {
    constructor(config?: any);
    getEvents(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SystemEventV1>) => void): void;
    logEvent(correlationId: string, event: SystemEventV1, callback?: (err: any, event: SystemEventV1) => void): void;
}
