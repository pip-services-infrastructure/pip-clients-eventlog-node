import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';
export declare class EventLogClientFactory extends Factory {
    static Descriptor: Descriptor;
    static NullClientV1Descriptor: Descriptor;
    static DirectClientV1Descriptor: Descriptor;
    static HttpClientV1Descriptor: Descriptor;
    constructor();
}
