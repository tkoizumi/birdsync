const xlsx = require('node-xlsx');
var fs = require('fs');
var excel = require('./excel')

//excel functions
// function excelQueryFields() {

//     var fileDirectory = document.getElementById('actual-file').files[0].path;
//     var workSheetsFromBuffer = xlsx.parse(fs.readFileSync(fileDirectory));
//     console.log(workSheetsFromBuffer[0].data);
//     var columnNamesArray = workSheetsFromBuffer[0].data[0];

//     var fieldElement = document.getElementsByClassName('fields')[0];
//     createElements(fieldElement, 'div', 'excelField', columnNamesArray);
// }

module.exports = {
  sayExcel: function () {
    console.log('hello from excel.js')
  }
};
