module.exports = function (context, transportMessage) {
    context.log('Function triggered to process a message: ', transportEventHubMessage);
    context.log('EnqueuedTimeUtc =', context.bindingData.enqueuedTimeUtc);
    context.log('SequenceNumber =', context.bindingData.sequenceNumber);
    context.log('Offset =', context.bindingData.offset);
    context.log('doing transformation');
    context.log('sending message to dai');
    context.bindings.outputEventHubMessage = [];
    context.bindings.outputEventHubMessage.push(transportEventHubMessage);
    context.done();
};