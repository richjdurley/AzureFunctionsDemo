module.exports = async function (context) {
    context.log('JavaScript HTTP trigger function processed a request.');
    console.log(JSON.stringify(context));
    var body = context.req.body;
    if (body) {
        console.log(context.bindings.trip);
        context.bindings.trip=JSON.stringify(body);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "sent " + (JSON.stringify(body))
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};