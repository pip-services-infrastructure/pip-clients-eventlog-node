import { IStringIdentifiable } from 'pip-services-commons-node';
import { IdGenerator } from 'pip-services-commons-node';
import { StringValueMap } from 'pip-services-commons-node';

import { EventLogSeverityV1 } from './EventLogSeverityV1';
import { EventLogTypeV1 } from './EventLogTypeV1';

export class SystemEventV1 implements IStringIdentifiable {

    public constructor(correlationId: string, source: string, 
        type: string, severity: EventLogSeverityV1, 
        message: string, details?: StringValueMap) {

        this.id = IdGenerator.nextLong();
        this.time = new Date();
        this.correlationId = correlationId;
        this.source = source;
        this.type = type || EventLogTypeV1.Other;
        this.severity = severity || EventLogSeverityV1.Informational;
        this.message = message;
        this.details = details || new StringValueMap();
    }

    public id: string;
    public time: Date;
    public correlationId: string;
    public source: string;
    public type: string;
    public severity: EventLogSeverityV1;
    public message: string;
    public details: StringValueMap;

}