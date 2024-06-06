import { defineBackend } from '@aws-amplify/backend';
import * as sqs from 'aws-cdk-lib/aws-sqs'
// import { auth } from './auth/resource';
// import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({});

// this is aws amplify gen 2
// how can i spawn a new vpc using aws cdk here?

const customResourceStack = backend.createStack('MyCustomResources');

new sqs.Queue(customResourceStack, 'MyTestingSQSFromAmplify');