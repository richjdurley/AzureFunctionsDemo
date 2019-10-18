## Azure Functions (JavaScript)

- Install Azure Core Functions (and correct node.js version that support functions 2.x) `https://github.com/Azure/azure-functions-core-tools`

### Running the functions
- Clone git
- Update your local.settings.json with appropriate credentials
- From route project directory to run functions locally enter `func host start`

Example local.host.json
```{
  "IsEncrypted": false,
  "version": "2.0",
  "extensions": {
    "http": {
            "routePrefix": "api",
            "maxConcurrentRequests": 5,
            "maxOutstandingRequests": 30
        }, 
        "eventHubs": {
          "batchCheckpointFrequency": 16,
          "maxBatchSize": 16,
          "prefetchCount": 32
      }
  },
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "DefaultEndpointsProtocol=httpsAccountName=ufceventhubstoragedev;
    AccountKey=<your storage key token here">
    "AzureWebJobsSecretStorageType": "files",
    "ufctransportEventHub": "Endpoint=sb://ufc-transport.servicebus.windows.net/;SharedAccessKeyName=ufc-transport-send;SharedAccessKey=your_key",
    "ufctransportEventHubListen": "Endpoint=sb://ufc-transport.servicebus.windows.net/;SharedAccessKeyName=ufc-transport-listen;SharedAccessKey=your_key",
    "daiintegrationEventHub": "Endpoint=sb://testdaiintegration.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=your_key"
  }
}```


### Adding a mock http endpoint
- Install `npm install -g json-server` for mocking REST endpoints
- To run mock server enter `json-server  --watch db.json`



