var mysql = require('mysql');
var queue = require('queue');
var dbLogic = require('./ssql.js');

var connectionList = new queue();
var waitQueue = new queue();

function dbConnect()
{
	var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password : 'admin',
        database : 'facebook',
        multipleStatements : true
    });

    connection.connect(function (err) {
    
        if (err) { throw err; }

        console.log('Connected Successfully');
    });
    return connection;
} 


function initializeConnPool()
{
	numberOfConnections = 100;
	if(connectionList !== null)
	{
		connectionList.start();
		for(var value = 0; value < numberOfConnections; value++)
		{
			connectionList.push(dbConnect());
		}
	}
	if(waitQueue !== null)
	{
		waitQueue.start();
	}
}


function waitingPool(requestedObject)
{
	
	if(connectionList !== null){
		if(connectionList.length <= 0){
			//add user request to wait queue here
			if(requestedObject !== null)
			{
				waitQueue.push(requestedObject);
				
			}
		}
		else{
			//process request from wait queue here
			if(waitQueue.length <= 0)
			{
				return;
			}
			waitQueue.reverse();
			var userRequest = waitQueue.pop();
			waitQueue.reverse();
			
			
			switch(userRequest.name){
				case "login":
					dbLogic.login(userRequest.credentials, userRequest.res, userRequest.req);
					break;
				case "insertCollegeInfo":
					dbLogic.insertCollegeInfo(userRequest.formData, userRequest.user, userRequest.res);
					break;
				case "insertSchoolInfo":
					dbLogic.insertSchoolInfo(userRequest.formData, userRequest.user, userRequest.res);
					break;
				case "insertWorkInfo":
					dbLogic.insertWorkInfo(userRequest.formData, userRequest.user, userRequest.res);
					break;
				case "getSchoolInfo":
					dbLogic.getSchoolInfo(userRequest.user, userRequest.req);
					break;
				case "getWorkInfo":
					dbLogic.getWorkInfo(userRequest.id, userRequest.res);
					break;
				case "getGroupMembers":
					dbLogic.getGroupMembers(userRequest.groupName, userRequest.res);
					break;
				case "getContactInfo":
					dbLogic.getContactInfo(userRequest.user, userRequest.res);
					break;
				case "getGroup":
					dbLogic.getGroup(userRequest.groupName, userRequest.res);
					break;
				case "createGroup":
					dbLogic.createGroup(userRequest.groupName, userRequest.user, userRequest.res);
					break;
				case "checkEmail":
					dbLogic.checkEmail(userRequest.credentials, userRequest.email, userRequest.res);
					break;
				case "getGroupMemberToAdd":
					dbLogic.getGroupMemberToAdd(userRequest.groupName, userRequest.res);
					break;
				case "getnewsFeedData":
					dbLogic.getnewsFeedData(userRequest.userName, userRequest.user, userRequest.res);
					break;
				case "addMemberToGroup":
					dbLogic.addMemberToGroup(userRequest.groupName, userRequest.user, userRequest.res);
					break;
				case "updateStatus":
					dbLogic.updateStatus(userRequest.user, userRequest.status, userRequest.res);
					break;
				case "updateContactInfo":
					dbLogic.updateContactInfo(userRequest.user, userRequest.contact, userRequest.res);
					break;
				case "getFriends":
					dbLogic.getFriends(userRequest.user, userRequest.res);
					break;
				case "getLifeEvents":
					dbLogic.getLifeEvents(userRequest.userName, userRequest.res);
					break;
				case "submitLifeEvent":
					dbLogic.submitLifeEvent(userRequest.userName, userRequest.lifeEvent, userRequest.res);
					break;
				case "approveRequest":
					dbLogic.approveRequest(userRequest.userId, userRequest.senderId, userRequest.res);
					break;
				case "rejectRequest":
					dbLogic.rejectRequest(userRequest.userId, userRequest.senderId, userRequest.res);
					break;
				case "getAddFriends":
					dbLogic.getAddFriends(userRequest.userId, userRequest.res);
					break;
				case "getFriendRequest":
					dbLogic.getFriendRequest(userRequest.userId, userRequest.res);
					break;
				case "sendFriendRequest":
					dbLogic.sendFriendRequest(userRequest.senderId, userRequest.receiverId, userRequest.res);
					break;
				case "deleteFromGroup":
					dbLogic.deleteFromGroup(userRequest.groupName, userRequest.userId, userRequest.res);
					break;
				case "deleteGroup":
					dbLogic.deleteGroup(userRequest.groupName, userRequest.res);
					break;
				case "getGroupById":
					dbLogic.getGroupById(userRequest.user, userRequest.res);
					break;
				case "signup":
					dbLogic.signup(userRequest.signupData, userRequest.res);
					break;
			}
		}
	}
}

function getConnection()
{
	var connection;
	
		if(connectionList.length <= 0)
		{
			connection = "empty";
		}
		else{
			connection = connectionList.pop();
		}
	
    return connection;
}

function releaseConnection(connection)
{
		
		connectionList.push(connection);
}


exports.initializeConnPool = initializeConnPool;
exports.getConnection = getConnection;
exports.releaseConnection = releaseConnection;
exports.waitingPool = waitingPool;