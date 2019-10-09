const NetSuite = require("node-suitetalk");
const Configuration = NetSuite.Configuration;
const Service = NetSuite.Service;
const Record = NetSuite.Record;
const Search = NetSuite.Search;

const soapRequest = require('easy-soap-request');

// example data
const url = 'https://graphical.weather.gov/xml/SOAP_server/ndfdXMLserver.php';
const headers = {
'Content-Type': 'text/xml;charset=UTF-8',
'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
};
const xml = fs.readFileSync('zipCodeEnvelope.xml', 'utf-8');
// usage of module
const getResponseBody = async () => {
const { response } = await soapRequest(url, headers, xml, 1000); // Optional timeout parameter(milliseconds)
const { body } = response;
return body;
};
// Invoke request and body of response
getResponseBody();


var config = new Configuration({
    account: "4196917_SB2",
    apiVersion: "2017_2",
    token: {
        consumer_key: "d2567fc9c9a4eadbfb3cdbd9362b74f2dd0fc16092884a1eb6030ddc7f2ea661",
        consumer_secret: "a0810f9f42a52bb4bba0d93d826559fac0eb2ba4fc374e513084321797e8fc68",
        token_key: "3451c2c527cfbe8702bd570bcf8e02f5e724c674316537e104fc0e9ae5fe54d8",
        token_secret: "386e74d60dd638ab1a854b101d4f2be96b839c3a95d9f5f8c43cccff4f2da50d"
    },
    wsdlPath: "https://4196917-sb2.app.netsuite.com/wsdl/v2017_2_0/netsuite.wsdl",
});

function nsQueryFields() {
    var service = new Service(config);
    console.log('Starting to fetch fields...')
    service
        .init()
        .then(( /**/ ) => {

            // Set search preferences
            const searchPreferences = new Search.SearchPreferences();
            searchPreferences.pageSize = 100;
            service.setSearchPreferences(searchPreferences);

            // Create basic search
            const search = new Search.Basic.CustomerSearchBasic();

            const record = new Record.Fields.RecordRef();
            record.type = 'customer';
            record.entityId = 'CUST625343';

            console.log('Service Values: ' + service.get(record));

            const nameStringField = new Search.Fields.SearchStringField();
            nameStringField.field = "entityId";
            nameStringField.operator = "contains";
            nameStringField.searchValue = "CUST625343";

            search.searchFields.push(nameStringField);

            return service.search(search);
        }).then((result, raw, soapHeader) => {

            console.log("result");
            console.log(raw);
            // var s = result.searchResult.recordList.record[0];
            // console.log(s);
            // var customFields = [];
            // var customFieldsArray = s.customFieldList.customField;
            // for(var i=0;i<customFieldsArray.length;i++){
            //     customFields.push(customFieldsArray[i].$attributes.scriptId)
            // }
            // console.log('Custom Fields: ' + customFields);
            // var keys = [];
            // for (var k in s) keys.push(k);
            // console.log(keys);
            // var allFields = customFields.concat(keys);
            // var parentElementFields = document.getElementsByClassName('fields')[1];
            // createElements(parentElementFields, 'div', 'nsField', allFields);
            //console.log(JSON.stringify(result));


        }).catch(function(err) {
            console.log("error");
            console.log(service.config.client.lastRequest);
            console.log("message");
            console.log(JSON.stringify(err));
        });

}

function nsQueryFields2() {
    var service = new Service(config);
    console.log('Starting to fetch fields...')
    service
    .init()
    .then((/*client*/) => {

        // Set request level preferences
        const preferences = new Soap.RequestPreferences();
        preferences.warningAsError = true;
        service.setRequestPreferences(preferences);

        // Set search preferences
        const searchPreferences = new Search.SearchPreferences();
        searchPreferences.pageSize = 100;
        service.setSearchPreferences(searchPreferences);

        // Create advanced search
        const search = new Search.Advanced.LocationSearchAdvanced();

        // Add criteria
        search.criteria = new Search.Advanced.LocationSearchRow();
        search.criteria.basic = new Search.Advanced.LocationSearchRowBasic();

        // Name contains 'warehouse'
        const nameStringField = new Search.Fields.SearchStringField();
        nameStringField.field = "name";
        nameStringField.operator = "contains";
        nameStringField.searchValue = "A";
        search.criteria.basic.searchCriteriaFields.push(nameStringField);

        // Add columns
        search.columns = new Search.Advanced.LocationSearchRow();

        search.columns.basic = new Search.Advanced.LocationSearchRowBasic();
        console.log('Search Columns: ' + search.columns.length);

        // Internal ID column
        const internalIdSelectColumn = new Search.Fields.SearchColumnSelectField();
        internalIdSelectColumn.field = "internalId";
        search.columns.basic.searchColumnFields.push(internalIdSelectColumn);

        // Name column
        const nameStringColumn = new Search.Fields.SearchColumnStringField();
        nameStringColumn.field = "name";
        search.columns.basic.searchColumnFields.push(nameStringColumn);

        return service.search(search);
    }).then((result) => {

    console.log("result");
    console.log(JSON.stringify(result));

}).catch(function (err) {
    console.log("error");
    console.log(service.config.client.lastRequest);
    console.log("message");
    console.log(JSON.stringify(err));
});
}

function nsQueryFields3(){
console.log('hello')
}


function nsUpdate(updateData) {
var service = new Service(config);
 service
        .init()
        .then(( /*client*/ ) => {
            console.log('Staring NS Update process...')
            var sampleData = updateData[0];
            var mapKeys = [];
            for (var k in sampleData) mapKeys.push(k);

            console.log('Map Keys: ' + mapKeys);

            const customerRecord = new Record.Types.Customer();

            //object id
            customerRecord.internalId = updateData[0].entityId;

            // Custom fields
            customerRecord.customFieldList = new Record.Lists.CustomFieldList();

            const c1 = new Record.Fields.StringCustomFieldRef();

            console.log('line 139')
            var fieldInternalId = mapKeys[1];
            console.log('Field ID: ' + fieldInternalId);
            //field internal id
            c1.scriptId = fieldInternalId;
            //c1.internalId = "1";

            console.log('line 144')
            //field value
            c1.value = updateData[0].fieldInternalId;

            customerRecord.customFieldList.customFields.push(c1);
            console.log('line 149')
            // Clear lists
            customerRecord.nullFieldList = new Record.Lists.NullFieldList();
            customerRecord.nullFieldList.names.push("salesRep");
            customerRecord.nullFieldList.names.push("custentity_item_restrictions");

            return service.update(customerRecord);
        }).then((result) => {

            console.log("result");
            console.log(JSON.stringify(result));
            console.log(service.config.client.lastRequest);

        }).catch(function(err) {
            console.log("error");
            console.log(service.config.client.lastRequest);
            console.log("message");
            console.log(err.message);
            console.log(JSON.stringify(err));
        });
}

