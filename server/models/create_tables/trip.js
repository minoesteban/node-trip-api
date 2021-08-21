'use strict';
/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
ABOUT THIS NODE.JS EXAMPLE: This example works with AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-examples-using-tables.html.
Purpose:
ddb_createtable.js demonstrates how to create an Amazon DynamoDB table.
INPUTS:
- TABLE_NAME
- ATTRIBUTE_NAME_1: the name of the partition key
- ATTRIBUTE_NAME_2: the name of the sort key (optional)
- ATTRIBUTE_TYPE: the type of the attribute (e.g., N [for a number], S [for a string] etc.)
Running the code:
ts-node ddb_createtable.js
*/
// snippet-start:[dynamodb.JavaScript.table.createTableV3]
// Import required AWS SDK clients and commands for Node.js
const { CreateTableCommand } = require('@aws-sdk/client-dynamodb');
const { ddbClient } = require('../../libs/ddbClient.js');
// Set the parameters
const params = {
    AttributeDefinitions: [{
            AttributeName: 'id',
            AttributeType: 'N',
        },
        {
            AttributeName: 'name',
            AttributeType: 'N',
        },
        {
            AttributeName: 'owner_id',
            AttributeType: 'N',
        },
        {
            AttributeName: 'google_place_id',
            AttributeType: 'S',
        },
        {
            AttributeName: 'location_name',
            AttributeType: 'S',
        },
        {
            AttributeName: 'country_id',
            AttributeType: 'S',
        },
        {
            AttributeName: 'language_name_id',
            AttributeType: 'S',
        },
        {
            AttributeName: 'language_flag_id',
            AttributeType: 'S',
        },
        {
            AttributeName: 'preview_audio_url',
            AttributeType: 'S',
        },
        {
            AttributeName: 'image_url',
            AttributeType: 'S',
        },
        {
            AttributeName: 'price',
            AttributeType: 'N',
        },
        {
            AttributeName: 'about',
            AttributeType: 'S',
        },
        {
            AttributeName: 'submitted',
            AttributeType: 'B',
        },
        {
            AttributeName: 'published',
            AttributeType: 'B',
        },
        {
            AttributeName: 'created_at',
            AttributeType: 'S',
        },
        {
            AttributeName: 'updated_at',
            AttributeType: 'S',
        },
        {
            AttributeName: 'deleted_at',
            AttributeType: 'S',
        },
    ],
    KeySchema: [{
            AttributeName: 'id',
            KeyType: 'HASH',
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    },
    TableName: 'trip',
    StreamSpecification: {
        StreamEnabled: false,
    },
};
const run = async() => {
    try {
        const data = await ddbClient.send(new CreateTableCommand(params));
        console.log("Table Created", data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
};
run();
// snippet-end:[dynamodb.JavaScript.table.createTableV3]
// For unit tests only.
// module.exports ={run, params};
