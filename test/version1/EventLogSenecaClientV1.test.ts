let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { EventLogMemoryPersistence } from 'pip-services-eventlog-node';
import { EventLogController } from 'pip-services-eventlog-node';
import { EventLogSenecaServiceV1 } from 'pip-services-eventlog-node';
import { IEventLogClientV1 } from '../../src/version1/IEventLogClientV1';
import { EventLogSenecaClientV1 } from '../../src/version1/EventLogSenecaClientV1';
import { EventLogClientFixtureV1 } from './EventLogClientFixtureV1';

let senecaConfig = ConfigParams.fromTuples(
    "connection.protocol", "none"
);

suite('EventLogSenecaClient', () => {
    let service: EventLogSenecaServiceV1;
    let client: EventLogSenecaClientV1;
    let fixture: EventLogClientFixtureV1;

    suiteSetup((done) => {
        let logger = new ConsoleLogger();
        let persistence = new EventLogMemoryPersistence();
        let controller = new EventLogController();

        service = new EventLogSenecaServiceV1();
        service.configure(senecaConfig);
        let seneca = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), seneca,
            new Descriptor('pip-services-eventlog', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-eventlog', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-eventlog', 'service', 'seneca', 'default', '1.0'), service
        );
        seneca.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new EventLogSenecaClientV1();
        client.configure(senecaConfig);
        client.setReferences(references);

        fixture = new EventLogClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });

    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
