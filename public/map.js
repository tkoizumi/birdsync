function createDataSourceUI(element_id){
    var app_id = element_id.split("-")[0];
    var elementClass = element_id.split("-")[1];
    var objSelectorParentEl = document.getElementsByClassName(elementClass)[1].childNodes[1];
    var objSelectorChildEl = objSelectorParentEl.childNodes;
    removeElements(objSelectorChildEl);
    createAllUIEl(app_id,ui_data,objSelectorParentEl);
    displayFieldTitle(app_id,elementClass);
}

function displayFieldTitle(app_id, destinationOrSource){
    console.log('Selected ' + app_id);
    var parentEl = document.getElementsByClassName(destinationOrSource)[2];
    var titleEl = parentEl.childNodes[1];
    titleEl.innerHTML = app_id[0].charAt(0).toUpperCase() + app_id.slice(1) + ' Fields';
    titleEl.innerHTML[0]=titleEl.innerHTML[0].toUpperCase();
}

function createAllUIEl(applicationName,uiObjects,parentEl){
    var result = uiObjects.filter(obj => {
        return obj.application === applicationName;
    });

    for(var i=0;i<result.length;i++){
        createSingleEl(parentEl,result[i].tag,result[i].type,result[i].id,result[i].className,result[i].value,result[i].innerHTML,result[i].onclick,result[i].children);
    }
}

function removeElements(nodeArray){
    for(var i=nodeArray.length-1;i>=0;i--){
        nodeArray[i].remove();
    }
}

function createSingleEl(parentEl,tag,type,id,className,value,innerHTML,onclick,childrenArray){
    var newEl = document.createElement(tag);
    newEl.type = type;
    newEl.id = id;
    newEl.className = className;
    newEl.value = value;
    newEl.innerHTML = innerHTML;
    newEl.addEventListener('click', onclick, false);
    if(childrenArray.length>0){
        for(var i=0;i<childrenArray.length;i++){
            var newChildEl = document.createElement('option');
            newChildEl.value = childrenArray[i];
            newChildEl.innerHTML = childrenArray[i];
            newEl.appendChild(newChildEl);
        }
    }
    parentEl.appendChild(newEl);

    return newEl;
}

var alertButtonEl = document.getElementsByTagName('button')[0];
var sfLoginBtnEl = document.getElementsByClassName('sf-login')[0];
// var username = document.getElementById('user_name');
// var password = document.getElementById('password');

var mapFieldArray = ["x", "x"];
var mapFieldsArray = [];

//creates array of fields for Salesforce object
function createFieldsArray(obj) {
    var fieldsArray = [];
    var fieldName;
    var numFields = obj.fields.length;
    for (i = 0; i < numFields; i++) {
        fieldName = obj.fields[i].name;
        fieldsArray.push(fieldName);
    }
    return fieldsArray;
}

//creates child elements for all elements in an array
function createElements(parentElement, tagName, className, arrayInnerHTML) {
    var arrayLength = arrayInnerHTML.length;
    var idNum
    var j = 0;
    for (j; j < arrayLength; j++) {
        var newElement = document.createElement(tagName);
        idNum = j + 1;
        newElement.id = className + idNum;
        newElement.innerHTML = arrayInnerHTML[j];
        newElement.addEventListener('mousedown', mapMouseDown, false);
        newElement.addEventListener('mouseup', mapMouseUp, false);
        parentElement.appendChild(newElement);
    }
}

var xOffset = 20;
var yOffset = 498;

var linePoint = [];
var stPoint;
var endPoint;

function mapMouseDown(e) {
    var fieldElement = document.getElementById(this.id);
    mapFields(fieldElement);
    startDragLine(e);
}

function mapMouseUp() {
    var destinationElement = document.getElementById(this.id);
    mapFields(destinationElement);
    stopDragLine();
}

//creates array of source/destination fields
function mapFields(fieldElement) {
    var fieldValue = fieldElement.innerHTML;
    var parentClass = fieldElement.parentElement.classList[1];
    var sourceField;
    var destinationField;
    console.log("Parent Class: " + parentClass);
    if (parentClass == 'source') {
        mapFieldArray[0] = fieldValue;
        sourceField = mapFieldArray[0];
    } else if (parentClass == 'destination') {
        mapFieldArray[1] = fieldValue;
        destinationField = mapFieldArray[1];
    }
    //push mapped fields as soon as source & destination fields are selected
    if (mapFieldArray.indexOf("x") == -1) {
        mapFieldsArray.push(mapFieldArray);
        console.log(mapFieldsArray);
        mapFieldArray = ["x", "x"];
    }
}



function startDragLine(e) {
    firstClick = [e.pageX - xOffset, e.pageY - yOffset];
    stPoint = new Point(firstClick[0], firstClick[1]); //get start point for line
    logclick = [e.pageX, e.pageY];
    console.log(stPoint)
    //start the loop
    intervalLoop = setInterval(function() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawLines();
        ctx.beginPath();
        ctx.moveTo(firstClick[0], firstClick[1]);
        ctx.lineTo(cursorX, cursorY, 6);

        ctx.strokeStyle = '#000000';
        ctx.closePath();
        ctx.stroke();
    }, 10);
}

function stopDragLine(e) {
    endPoint = new Point(cursorX, cursorY); //get end point
    linePoint.push(new lineP(stPoint, endPoint)); //store line points for next draw
    console.log(linePoint);
    clearInterval(intervalLoop);
}

//draw all lines from stored point
function drawLines() {

    linePoint.forEach(function(item) {
        ctx.beginPath();
        ctx.moveTo(item['stPoint'].x, item['stPoint'].y);
        ctx.lineTo(item['endPoint'].x, item['endPoint'].y);
        ctx.stroke();
        ctx.closePath();
    })
}

function Point(x, y) {
    this.x = x;
    this.y = y;
}

function lineP(stPoint, endPoint) {
    this.stPoint = stPoint;
    this.endPoint = endPoint;
}


function init() {

    document.onmousemove = function(e) {
        cursorX = e.pageX - xOffset;
        cursorY = e.pageY - yOffset;
    };
    // canvas.addEventListener('mousedown', startDragLine, false);
    // canvas.addEventListener('mouseup', stopDragLine, false);
}

var cursorX;
var cursorY;
var canvas = document.getElementById("canvas"); //canvas, context, other vars etc
var ctx = canvas.getContext("2d");
var firstClick = [0, 0];
var intervalLoop = null;
init();