var ui_data = 
[{
	application:'excel',
	tag:'input',
	type:'file',
	id:'actual-file',
	className:'',
	value:'',
	innerHTML:'',
	onclick: function(){

	},
	children:[]
},{
	application:'excel',
	tag:'br',
	type:'',
	id:'',
	className:'',
	value:'',
	innerHTML:'',
	onclick: function(){

	},
	children:[]
},{
	application:'excel',
	tag:'button',
	type:'button',
	id:'',
	className:'excel-query btn btn-success btn-md',
	value:'',
	innerHTML:'Display Excel Fields',
	onclick: excelQueryFields,
	children:[]
},{
	application:'salesforce',
	tag:'label',
	type:'',
	id:'',
	className:'',
	value:'',
	innerHTML:'Select Salesforce Object',
	onclick: function(){

	},
	children:[]
},{
	application:'salesforce',
	tag:'select',
	type:'',
	id:'',
	className:'',
	value:'',
	innerHTML:'',
	onclick: function(){

	},
	children:['Account','Contact']
},{
	application:'salesforce',
	tag:'button',
	type:'button',
	id:'',
	className:'sf-login btn btn-primary btn-md',
	value:'',
	innerHTML:'Display Salesforce Fields',
	onclick:sfQueryFields,
	children:[]
},{
	application:'netsuite',
	tag:'label',
	type:'',
	id:'',
	className:'',
	value:'',
	innerHTML:'Select NetSuite Record',
	onclick: function(){

	},
	children:[]
},{
	application:'netsuite',
	tag:'select',
	type:'',
	id:'',
	className:'',
	value:'',
	innerHTML:'',
	onclick: function(){

	},
	children:['Account','Contact']
},{
	application:'netsuite',
	tag:'br',
	type:'',
	id:'',
	className:'',
	value:'',
	innerHTML:'',
	onclick: function(){

	},
	children:[]
},{
	application:'netsuite',
	tag:'button',
	type:'button',
	id:'',
	className:'sf-login btn btn-primary btn-md',
	value:'',
	innerHTML:'Display NetSuite Fields',
	onclick:nsQueryFields2,
	children:[]
}
];