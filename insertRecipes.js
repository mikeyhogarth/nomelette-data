const dynamodb = require("./dynamo");

module.exports = async recipes => {
  const timestamp = new Date().getTime();

  const chunkSize = 25;
  let chunk;
  for (let i = 0, j = recipes.length; i < j; i += chunkSize) {
    chunk = recipes.slice(i, i + chunkSize);

    // createBatchItemRequest
    const requests = chunk.map(recipe => ({
      PutRequest: {
        Item: {
          ...recipe,
          createdAt: timestamp
        }
      }
    }));

    const params = {
      RequestItems: {
        "nomelette-recipes": requests
      }
    };

    dynamodb.batchWrite(params, function(err, data) {
      if (err) {
        console.error(err);
      } else console.log(data);
    });
  }
};
