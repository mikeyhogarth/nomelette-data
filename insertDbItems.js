const dynamodb = require("./dynamo");

module.exports = async dbItems => {
  const timestamp = new Date().getTime();

  const chunkSize = 25;
  let chunk;
  for (let i = 0, j = dbItems.length; i < j; i += chunkSize) {
    chunk = dbItems.slice(i, i + chunkSize);

    // createBatchItemRequest
    const requests = chunk.map(dbItem => ({
      PutRequest: {
        Item: {
          ...dbItem,
          createdAt: timestamp
        }
      }
    }));

    const params = {
      RequestItems: {
        "nomelette.co.uk": requests
      }
    };

    dynamodb.batchWrite(params, function(err, data) {
      if (err) {
        console.error(err);
      } else console.log(data);
    });
  }
};
