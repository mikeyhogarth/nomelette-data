# Nomelette data

This is a temporary repo for working with the nomelette data while I try to figure out how to get it uploaded to dynamo.

The `data` folder contains some raw data that used to be in a database (postgres)

The purpose of this repo is to create a script to take that data and insert it into dynamo.

At time of writing this is all hard coded to be talking to a LOCAL dynamo instance.

## Useful commands

All of this is local-only and assumes Dynamo is running on localhost:8000.

This'll seed the database;

```
npm run seed:db
```

This gets an item out;

```
aws dynamodb get-item --table-name nomelette.co.uk --key '{"pk": {"S": "Recipe#summer-soup"}, "sk":{"S": "Recipe#summer-soup"}}'  --endpoint-url http://localhost:8000
```

This does a query

```
aws dynamodb query --table-name nomelette.co.uk --key-condition-expression 'pk = :v1' --expression-attribute-values '{":v1": { "S": "Recipe#summer-soup"}}'  --endpoint-url http://localhost:8000
```
