var sf = require('node-salesforce');

function sfQueryFields() {
    var conn = new sf.Connection({
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl: 'https://na1.salesforce.com'
    });


    conn.login('takayuki.koizumi@gmail.com', 'TakaTaka1987@fv4npDZDgZ6z1vbJVINFhR1tn', function(err, userInfo) {
        if (err) {
            return console.error(err);
        }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        console.log(conn.accessToken);
        console.log(conn.instanceUrl);
        // logged in user property
        console.log("User ID: " + userInfo.id);
        console.log("Org ID: " + userInfo.organizationId);

        //query fields
        var sfObject = document.getElementsByTagName('select')[0].value;

        conn.describe(sfObject, function(err, meta) {
            if (err) {
                return console.error(err);
            }
            console.log('Label : ' + meta.label);
            console.log('Num of Fields : ' + meta.fields.length);
            var fieldsArray = createFieldsArray(meta);
            var parentElementFields = document.getElementsByClassName('fields')[1];
            createElements(parentElementFields, 'div', 'sfField', fieldsArray);

        });

    });

}

function sfUpdate(updateData) {
    var conn = new sf.Connection({
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl: 'https://na1.salesforce.com'
    });


    conn.login('takayuki.koizumi@gmail.com', 'TakaTaka1987@fv4npDZDgZ6z1vbJVINFhR1tn', function(err, userInfo) {
        if (err) {
            return console.error(err);
        }

        console.log('Running process...')
        console.log('map - ' + mapFieldsArray);

        conn.sobject("Account").update(updateData,
            function(err, rets) {
                if (err) {
                    return console.error(err);
                }
                for (var i = 0; i < rets.length; i++) {
                    if (rets[i].success) {
                        console.log("Updated Successfully : " + rets[i].id);
                    }
                }
            });
    });
};