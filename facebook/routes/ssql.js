var mysql = require('./connections.js');

var connectionProvider = require('./mySqlProvider.js');
db = {
		
 insertCollegeInfo : function(formData, userId, response){
		
		
	 var dbConn = mysql.getConnection();
		if(dbConn === "empty")
		{
			mysql.waitingPool({name: "insertCollegeInfo", formData : formData, user: userId, res : response});
		} else 
		{
			var query = "insert into about_school (college_name, college_year, concentration, attended, userId) values ('"+formData.name+"', "+formData.yearSelected+", '"+formData.concentration+"', '"+formData.typeOfDegree+"', "+userId+")";
			dbConn.query(query, function (err, rows, fields) {
				
				process.nextTick(function(){
					mysql.waitingPool(null);
				});
	              
	                if (err) { throw err; }
	                 
	            		   response.send("success");
	            		   
	
			});
		
			mysql.releaseConnection(dbConn);
		}
		
	},

insertSchoolInfo : function(form, userId, response){

		
		var dbConn = mysql.getConnection();
		if(dbConn === "empty")
		{
			mysql.waitingPool({name:"insertSchoolInfo", formData : form, user: userId, res : response});
		} else 
		{
			var query = "insert into about_school (school_name, school_year, userId) values ('"+form.name+"', "+form.yearSelected+", "+userId+")";
			dbConn.query(query, function (err, rows, fields) {
				
				process.nextTick(function(){
					mysql.waitingPool(null);
				});
	              
	                if (err) { throw err; }
	                 
	            		   response.send("success");
	            		   
	
			});
		
			mysql.releaseConnection(dbConn);
		}
		
	}, 
		
insertWorkInfo : function(formData, userId, response){
		
		 var dbConn = mysql.getConnection();
			if(dbConn === "empty")
			{
				mysql.waitingPool({name:"insertWorkInfo", formData : formData, user: userId, res : response});
			} else 
			{
				var query = "insert into about_work (company, position, city, year, userId) values ('"+formData.name+"', '"+formData.position+"', '"+formData.city+"', "+formData.yearSelected+", "+userId+")";
				dbConn.query(query, function (err, rows, fields) {
					
					process.nextTick(function(){
						mysql.waitingPool(null);
					});
		              
		                if (err) { throw err; }
		                 
		            		   response.send("success");
		            		   
		
				});
			
				mysql.releaseConnection(dbConn);
			}
		
	}, 
		
login : function(credentials,response, request){
		
		var dbConn = mysql.getConnection();
		if(dbConn === "empty")
		{
			mysql.waitingPool({name:"login", credentials : credentials, res: response, req : request});
		} else 
		{
		   
			var query = 
				"select salt from login where  email = '"+credentials.email+"'";
			dbConn.query(query, function (err, rows, fields) {
				
				process.nextTick(function(){
					mysql.waitingPool(null);
				});
		
				salt = rows[0].salt;
				password = db.hashCode(salt, credentials.password);
				var query = "select * from login,users where login.user_id = users.user_id and email = '"+credentials.email+"' and password = '"+password+"'";
				dbConn.query(query, function (err, rows, fields) {
				
				if(rows.length >0){
    				
    				request.session.email = rows[0].email;
    				request.session.id = rows[0].user_id;
    				request.session.name = rows[0].first_name;
    				json_responses = {"statusCode" : 200};
    				response.send(json_responses);
    				
    				
    			}
    			else
    			{
    				json_responses = {"statusCode" : 401};
    				response.send(json_responses);
    			}
		 
				});
		});
			mysql.releaseConnection(dbConn);
	}	
		
	},
	
getSchoolInfo : function(id, response){
		var dbConn = mysql.getConnection();
		if(dbConn === "empty")
		{
			mysql.waitingPool({name:"getSchoolInfo", user: id, res : response});
		} else 
		{
			var query = "select * from about_school where userId = "+id+" order by college_year desc";
			dbConn.query(query, function (err, rows, fields) {
				
				process.nextTick(function(){
					mysql.waitingPool(null);
				});
	              
	                if (err) { throw err; }
	                 
	            		   response.send(rows);
	            		   
	
			});
		
			mysql.releaseConnection(dbConn);
		}
	
		
	},
	
getWorkInfo : function(id,response){
		
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"getWorkInfo", user: id, res : response});
	} else 
	{
		var query = "select * from about_work where userId = "+id+" order by year desc";
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send(rows);
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}

		
	},
	
getGroupMembers : function(groupName,response){
	
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"getGroupMembers", groupName: groupName, res : response});
	} else 
	{
		var query = "select first_name,u.user_id from users u,groups g,group_members gm where u.user_id =gm.user_id and g.group_id = gm.group_id and group_name = '"+groupName+"'";
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send(rows);
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
		
		
	},	
	

getContactInfo : function(userId,response){
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"getContactInfo", user: userId, res : response});
	} else 
	{
		var query = "select mobile,address,dob,gender,email,shows,music,sports from users u,login l where u.user_id =l.user_id and u.user_id = "+userId;
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send(rows);
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
		
	},	
	
getGroup : function(groupName,response){
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"getGroup", groupName: groupName, res : response});
	} else 
	{
		var query = "select * from groups where group_name = '"+groupName+"'";
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                
                if(rows.length == 0){
	            	   
	            	   console.log("Rows retured by query "+ rows.length);
	        
	            		   response.send("sucess");
	            		   
	            	   }
	               
	               else
	            	   {
	            	   
	            	   		response.send("error");
	            	   
	            	   }
                             		   

		});
	
		mysql.releaseConnection(dbConn);
	}
		
	},
	
createGroup : function(groupName, id, response){
		
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"createGroup", groupName: groupName, user : id, res : response});
	} else 
	{
		var query = "CALL createGroup('"+groupName+"',"+id+")";
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                
     		   response.send("sucess");
                             		   

		});
	
		mysql.releaseConnection(dbConn);
	}
		
},
	
checkEmail : function(email, response){
		
	
		
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"checkEmail", email: email, res : response});
	} else 
	{
		var query = "select count(*) as count from login where email ='"+email+"'";
		console.log(query);
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                
                if(rows[0].count == 1){
                	
         		   response.send("failed");
                }
             
                else
                
                	response.send("success");
                             		   

		});
	
		mysql.releaseConnection(dbConn);
	}

		
}, 

getGroupMemberToAdd : function(groupName, response){
	
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"getGroupMemberToAdd", groupName: groupName, res : response});
	} else 
	{
		var query = "select first_name,user_id from users where user_id not in ( select user_id from group_members where group_id in (select group_id from groups where group_name = '"+groupName+"') )";
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send(rows);
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
	
}, 

getnewsFeedData : function(userName, userId, response){
	
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"getnewsFeedData", userName: userName, user : userId, res : response});
	} else 
	{
		var query = "select * from newsFeed where userName ='"+userName+"' or userName in ( select first_name from users,friends_list where users.user_id = friends_list.friendId and friends_list.userId ="+userId+") or friendName in ( select first_name from users,friends_list where users.user_id = friends_list.friendId and friends_list.userId ="+userId+") order by timestamp desc limit 10";
		console.log(query);
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send(rows);
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
	
}, 

addMemberToGroup : function(groupName, userid, response){
		
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"addMemberToGroup", groupName: groupName, user : userid, res : response});
	} else 
	{
		var query = "insert into group_members (user_id, group_id) values("+userid+", (select group_id from groups where group_name = '"+groupName+"')); insert into newsFeed (userName, groupName, timestamp, activity_type) values ( (select first_name from users where user_id ="+userid+"), '"+groupName+"', sysdate(), 'add_group')";
		console.log(query);
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send("success");
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
	
		
	},


updateStatus : function(userId, statusText, response){
			
	 var dbConn = mysql.getConnection();
		if(dbConn === "empty")
		{
			mysql.waitingPool({name:"updateStatus", user: userId, status : statusText, res : response});
		} else 
		{
			var query = "insert into newsFeed (status, userName, activity_type, timestamp) values('"+statusText+"', (select first_name from users where user_id = "+userId+"), 'status', sysdate())";
			dbConn.query(query, function (err, rows, fields) {
				
				process.nextTick(function(){
					mysql.waitingPool(null);
				});
	              
	                if (err) { throw err; }
	                 
	            		   response.send("success");
	            		   

			});
		
			mysql.releaseConnection(dbConn);
		}
		
	},
	
updateContactInfo : function(userId, contact, response){
		
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"updateContactInfo", user: userId, contact : contact, res : response});
	} else 
	{
		var query = "update users set mobile ="+contact.mobile+", address = '"+contact.address+"', sports = '"+contact.sports+"', music = '"+contact.music+"', shows = '"+contact.shows+"' where user_id ="+userId;
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send("success");
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
		
	},
	
getFriends : function(userId, response){
		
		
	
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"getFriends", user : userId, res : response});
	} else 
	{
		var query = "select first_name from users where user_id in (select friendId from friends_list where userid ="+userId+")";
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send(rows);
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
		
	}, 
	
	getLifeEvents : function(userName, response){
		
		var dbConn = mysql.getConnection();
		if(dbConn === "empty")
		{
			mysql.waitingPool({name:"getLifeEvents", userName: userName, res : response});
		} else 
		{
			var query = "select lifeEventType,lifeMessage from newsFeed where userName = '"+userName+"' and activity_type = 'lifeEvent'";
			dbConn.query(query, function (err, rows, fields) {
				
				process.nextTick(function(){
					mysql.waitingPool(null);
				});
	              
	                if (err) { throw err; }
	                 
	            		   response.send(rows);
	            		   

			});
		
			mysql.releaseConnection(dbConn);
		}
		
	},
	
submitLifeEvent : function(userName, lifeEvent, response){
		
		var dbConn = mysql.getConnection();
		if(dbConn === "empty")
		{
			mysql.waitingPool({name:"submitLifeEvent", userName: userName, lifeEvent : lifeEvent, res : response});
		} else 
		{
			var query = "insert into newsFeed (userName, lifeEventType, lifeMessage, activity_type, timestamp) values ('"+userName+"','"+lifeEvent.type+"','"+lifeEvent.message+"', 'lifeEvent', sysdate())";
			dbConn.query(query, function (err, rows, fields) {
				
				process.nextTick(function(){
					mysql.waitingPool(null);
				});
	              
	                if (err) { throw err; }
	                 
	            		   response.send("success");
	            		   

			});
		
			mysql.releaseConnection(dbConn);
		}
		
	},
	
approveRequest : function(userId, senderId, response){
		
	
		
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"approveRequest", userId: userId, senderId: senderId, res : response});
	} else 
	{
		var query = "insert into friends_list values ("+userId+","+senderId+"), ("+senderId+","+userId+");update friend_requests set status = 'approved' where senderId ="+senderId+" and receiverId = "+userId+"; insert into newsFeed (userName, friendName, timestamp, activity_type) values ((select first_name from users where user_id = "+userId+"),(select first_name from users where user_id = "+senderId+"),sysdate(),'friends')";
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send("success");
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
		
	},
	
rejectRequest : function(userId, senderId, response){
		
		
		
		var dbConn = mysql.getConnection();
		if(dbConn === "empty")
		{
			mysql.waitingPool({name:"rejectRequest", userId: userId, senderId : senderId, res : response});
		} else 
		{
			var query = "delete from friend_requests where senderId ="+senderId+" and receiverId = "+userId+";";
			dbConn.query(query, function (err, rows, fields) {
				
				process.nextTick(function(){
					mysql.waitingPool(null);
				});
	              
	                if (err) { throw err; }
	                 
	            		   response.send("success");
	            		   

			});
		
			mysql.releaseConnection(dbConn);
		}
		
	}, 
getAddFriends : function(userId, response){
		
		
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"getAddFriends", userId: userId, res : response});
	} else 
	{
		var query = "select user_id,first_name from users where user_id !="+userId+" and user_id not in (select friendID from friends_list where userid ="+userId+") and user_id not in (select senderid from friend_requests where receiverid ="+userId+"  ) and user_id not in ( select receiverid from friend_requests where senderid ="+userId+" );";
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send(rows);
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
		
	}, 
	
getFriendRequest : function(userId, response){
		
		
		
		var dbConn = mysql.getConnection();
		if(dbConn === "empty")
		{
			mysql.waitingPool({name:"getFriendRequest", userId: userId, res : response});
		} else 
		{
			var query = "select first_name,senderId from friend_requests f,users u where f.senderId = u.user_id and receiverId ="+userId+" and status = 'requested';";
			dbConn.query(query, function (err, rows, fields) {
				
				process.nextTick(function(){
					mysql.waitingPool(null);
				});
	              
	                if (err) { throw err; }
	                 
	            		   response.send(rows);
	            		   

			});
		
			mysql.releaseConnection(dbConn);
		}
		
	}, 
	
sendFriendRequest : function(senderId, receiverId, response){
		
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"sendFriendRequest", senderId: senderId, receiverId: receiverId, res : response});
	} else 
	{
		var query = "insert into friend_requests (senderId,receiverId) values ("+senderId+","+receiverId+");";
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send("success");
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
		
	}, 
	
	
deleteFromGroup: function(groupName, userId, response){
	
	
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"deleteFromGroup", groupName: groupName, user: userId, res : response});
	} else 
	{
		var query = "delete from group_members where group_id = (select group_id from groups where group_name = '"+groupName+"') and user_id ="+userId;
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send("success");
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
	},
	
deleteGroup: function(groupName, response){
	
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"deleteGroup", groupName: groupName, res : response});
	} else 
	{
		var query = "delete from groups where group_name = '"+groupName+"'";
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send("success");
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
},
	
getGroupById: function(id, response){
		
	
	var dbConn = mysql.getConnection();
	if(dbConn === "empty")
	{
		mysql.waitingPool({name:"getGroupById", user : id, res : response});
	} else 
	{
		var query = "select group_name from groups, group_members where group_members.group_id = groups.group_id and user_id ="+id;
		console.log(query);
		dbConn.query(query, function (err, rows, fields) {
			
			process.nextTick(function(){
				mysql.waitingPool(null);
			});
              
                if (err) { throw err; }
                 
            		   response.send(rows);
            		   

		});
	
		mysql.releaseConnection(dbConn);
	}
	},
	
signup: function(signupData,response){
	
		
		var dbConn = mysql.getConnection();
		if(dbConn === "empty")
		{
			mysql.waitingPool({name:"signup", signupData: signupData, res : response});
		} else 
		{
			var userData = {first_name : signupData.firstName,
					
					last_name : signupData.lastName,
					
					dob : signupData.dob,
					
					gender : signupData.gender
					};
			var query = "INSERT INTO users SET?";
			dbConn.query(query, userData, function (err, rows, fields) {
				
				process.nextTick(function(){
					mysql.waitingPool(null);
				});
	              
	                if (err) { throw err; }
	                
	                salt = db.generateSalt();
	                pass = db.hashCode(salt, signupData.password); 
	                query = "INSERT INTO login SET?";
	                console.log(signupData.email);
	                console.log(query);
	                password = signupData.password.toString();
	                console.log(typeof password);
	                var loginData = {user_id : rows.insertId,
	                				 email : signupData.email,
	                				 password: signupData.password,
	                				 salt : salt,
	             					password : pass};
	                console.log(query);
	                
	                dbConn.query(query, loginData,function (err, rows, fields){
	                	
	                	if(err){
	                		throw err;
	                	}
	                	
	                })
	            		   
	                 response.send("success");
			});
		
			mysql.releaseConnection(dbConn);
		}
		
	},
	
	hashCode : function(salt,pass) {
		
		pass = salt+pass;
		  var hash = 0, i, chr, len;
		  if (pass.length == 0) return hash;
		  for (i = 0, len = pass.length; i < len; i++) {
		    chr   = pass.charCodeAt(i);
		    hash  = ((hash << 5) - hash) + chr;
		    hash |= 0;
		  }
		  return hash;
	},
	
	generateSalt : function(){
		
		return Math.floor(Math.random()*1000);
	}
};

module.exports.db = db;