module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.body) {
        context.bindings.ufctransportEventHub.pushpush(JSON.stringify(req.body));

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "sent " + (JSON.stringify(req.body))
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};