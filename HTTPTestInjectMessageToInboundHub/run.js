module.exports = async function (context) {
    context.log('**** IN HTTP TEST INJECTOR TO INBOUND HUB ****');
    var body = context.req.body;
    try {
        if (body) {
            context.bindings.trip = JSON.stringify(body);
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: "Sent to hub " + (JSON.stringify(body))
            };
        }
    } catch (error) {
        context.res = {
            status: 400,
            body: "Please pass a valid trip in request body"
        };
    }

    return context.res;
};