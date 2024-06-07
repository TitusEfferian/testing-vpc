import { defineBackend } from "@aws-amplify/backend";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
// import { auth } from './auth/resource';
// import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({});

// this is aws amplify gen 2
// how can i spawn a new vpc using aws cdk here?

const customResourceStack = backend.createStack("MyCustomResources");

// const myVpc = new ec2.Vpc(customResourceStack, "testing-vpc", {
//   cidr: "10.0.0.0/16",
//   subnetConfiguration: [
//     {
//       cidrMask: 24,
//       name: "PrivateSubnet",
//       subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
//     },
//   ],
// });

// const fn = new lambda.Function(customResourceStack, "helloWorldFunc", {
//   runtime: lambda.Runtime.NODEJS_18_X,
//   code: lambda.Code.fromInline(`
//     exports.handler = async (event) => {
//           return {
//             statusCode: 200,
//             body: JSON.stringify('Hello, World!'),
//           };
//         };
//     `),
//   handler: "index.handler",
//   vpc: myVpc,
//   vpcSubnets: {
//     subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
//   },
// });

const myLambda = new lambda.Function(customResourceStack, "myLambda", {
  runtime: lambda.Runtime.NODEJS_18_X,
  handler: "index.handler",
  code: lambda.Code.fromInline(`
    exports.handler = async (event) => {
          return {
            statusCode: 200,
            body: JSON.stringify('Hello, World!'),
          };
        };
    `),
});

const api = new apigateway.RestApi(customResourceStack, "MyApiGateway", {
  restApiName: "My Service",
  description: "This service serves my Lambda function.",
});

const lambdaIntegration = new apigateway.LambdaIntegration(myLambda,{
  allowTestInvoke: false
});
const resource = api.root.addResource("hello");
resource.addMethod("GET", lambdaIntegration); // GET /hello