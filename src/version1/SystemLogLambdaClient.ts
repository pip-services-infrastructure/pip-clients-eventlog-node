let _ = require('lodash');
let os = require('os');

import { Category } from 'pip-services-runtime-node';
import { ComponentDescriptor } from 'pip-services-runtime-node';
import { ComponentConfig } from 'pip-services-runtime-node';
import { ComponentSet } from 'pip-services-runtime-node';
import { ISystemLogClient } from './ISystemLogClient';
import { LambdaClient } from 'pip-services-runtime-node';

export class SystemLogLambdaClient extends LambdaClient implements ISystemLogClient {       
	/**
	 * Unique descriptor for the SystemLogLambdaClient component
	 */
	public static Descriptor: ComponentDescriptor = new ComponentDescriptor(
		Category.Clients, "pip-services-syslog", "lambda", "1.0"
	);
    
    constructor(config?: any) {
        super(SystemLogLambdaClient.Descriptor);

        if (config != null) {
            this.configure(ComponentConfig.fromValue(config));
            this.link(new ComponentSet());
        }
    }
        
    public getSystemActivities(correlationId: string, filter: any, paging: any, callback) {
        callback = this.instrument(correlationId, 'syslog.get_system_activities', callback);
        
        this.call(
            'get_system_activities', 
            {
                correlation_id: correlationId,
                filter: filter,
                paging: paging
            }, 
            callback
        );
    }

    public logSystemActivity(correlationId: string, activity: any, callback) {
        callback = this.instrument(correlationId, 'syslog.log_system_activity', callback);

        activity.time = activity.time || new Date();
        activity.server = activity.server || os.hostname(); 

        this.call(
            'log_system_activity', 
            {
                correlation_id: correlationId,
                activity: activity
            }, 
            callback
        );
    }
    
}