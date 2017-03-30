import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { CommandableRestClient } from 'pip-services-net-node';
import { SystemEventV1 } from './SystemEventV1';
import { IEventLogClientV1 } from './IEventLogClientV1';
export declare class EventLogRestClientV1 extends CommandableRestClient implements IEventLogClientV1 {
    constructor(config?: any);
    getEventsPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<SystemEventV1>) => void): void;
    logEvent(correlationId: string, event: SystemEventV1, callback?: (err: any, event: SystemEventV1) => void): void;
}