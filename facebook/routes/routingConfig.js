function facebookRouteConfig(app) {
    
    this.app = app;
    this.routeTable = [];
    this.init();
}


facebookRouteConfig.prototype.init = function () {
    
    var self = this;
    
    this.addRoutes();
    this.processRoutes();


}


facebookRouteConfig.prototype.processRoutes = function () {
    
    var self = this;
    
    self.routeTable.forEach(function (route) {
        
        if (route.requestType == 'get') {
            
         
            self.app.get(route.requestUrl, route.callbackFunction);
        }
        else if (route.requestType == 'post') {
            
            
            self.app.post(route.requestUrl, route.callbackFunction);
        }
        
        
        else if (route.requestType == 'put'){
            
            self.app.put(route.requestUrl, route.callbackFunction);
            
        }
        
        
    
    });
}


facebookRouteConfig.prototype.addRoutes = function () {
    
    var self = this;
    
    self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/',
        callbackFunction : function (request, response) {
            
            response.render('index.ejs');
        }
    });
    
self.routeTable.push({
        
        requestType : 'get',
        requestUrl : '/homepage',
        callbackFunction : function (request, response) {
            
        	if(request.session.email)
        	{
        		response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        		response.render('homePage.ejs',{username: request.session.name});
        	}
        	else
        	{
        		
        		response.redirect('/');
        	}
        }
    });

    self.routeTable.push({
        
        requestType : 'post',
        requestUrl : '/authenticate',
        callbackFunction : function (request, response) {
        	
        	credentials = request.body.credentials;
        	 var sql = require('./ssql.js');
        	 if(request.body.credentials.email !='' && request.body.credentials.password !=''){
        		 
        		// console.log("teja"+request.body.credentials.email);
        		 
        		// credentials = {email : 'steja66@gmail.com', password : 'Krishna18#'}
        
        	 sql.db.login(credentials,response, request);
        	 }
        	 
        }
        });
    
    self.routeTable.push({
	     
	     requestType : 'get',
	     requestUrl : '/getGroupsById',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 
	    	 sql.db.getGroupById(request.session.id, response);
	     }
	 });
    
    self.routeTable.push({
	     
	     requestType : 'post',
	     requestUrl : '/checkEmail',
	     callbackFunction : function (request, response) {
	    	 //console.log(request);
	    	 var sql = require('./ssql.js');
	    	 
	    	 var email = request.body.email;
	    	 sql.db.checkEmail(email, response);
	     }
	 });
    
    self.routeTable.push({
	     
	     requestType : 'get',
	     requestUrl : '/getnewsFeedData',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 
	    	 sql.db.getnewsFeedData(request.session.name, request.session.id, response);
	     }
	 });
    
    self.routeTable.push({
	     
	     requestType : 'post',
	     requestUrl : '/insertCollegeInfo',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 
	    	 var form = request.body.formData;
	    	 
	    	 sql.db.insertCollegeInfo(form, request.session.id, response);
	     }
	 });
    
    self.routeTable.push({
	     
	     requestType : 'post',
	     requestUrl : '/insertSchoolInfo',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 var formData = request.body.formData;
	    	 sql.db.insertSchoolInfo(formData, request.session.id, response);
	     }
	 });
    
    self.routeTable.push({
	     
	     requestType : 'post',
	     requestUrl : '/insertWorkInfo',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 var formData = request.body.formData;
	    	 sql.db.insertWorkInfo(formData, request.session.id, response);
	     }
	 }); 

    self.routeTable.push({
	     
	     requestType : 'get',
	     requestUrl : '/getSchoolInfo',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 sql.db.getSchoolInfo(request.session.id, response);
	     }
	 }); 
    
    self.routeTable.push({
	     
	     requestType : 'get',
	     requestUrl : '/getWorkInfo',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 sql.db.getWorkInfo(request.session.id, response);
	     }
	 }); 
    
    self.routeTable.push({
	     
	     requestType : 'get',
	     requestUrl : '/getContactInfo',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 sql.db.getContactInfo(request.session.id, response);
	     }
	 }); 
    
    self.routeTable.push({
	     
	     requestType : 'post',
	     requestUrl : '/updateContact',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 var contact = request.body.contactInfo;
	    	 sql.db.updateContactInfo(request.session.id, contact, response);
	     }
	 }); 
    
    self.routeTable.push({
	     
	     requestType : 'get',
	     requestUrl : '/getLifeEvents',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 sql.db.getLifeEvents(request.session.name, response);
	     }
	 }); 
    
    self.routeTable.push({
	     
	     requestType : 'post',
	     requestUrl : '/updateStatus',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 var statusText = request.body.status;
	    	 sql.db.updateStatus(request.session.id, statusText, response);
	     }
	 });
    
    self.routeTable.push({
	     
	     requestType : 'post',
	     requestUrl : '/submitLifeEvent',
	     callbackFunction : function (request, response) {
	    	 
	    	 var sql = require('./ssql.js');
	    	 var lifeEvent = request.body.lifeEvent;
	    	 sql.db.submitLifeEvent(request.session.name, lifeEvent, response);
	     }
	 });
    
 self.routeTable.push({ 
        
        requestType : 'post',
        requestUrl : '/signup',
        callbackFunction : function (request, response) {
        	
        	dob = request.body.dob.slice(0,10);
        	request.body.dob = dob;
        	var sql = require('./ssql.js');
        	sql.db.signup(request.body, response);
        	
        }
    });
 
 self.routeTable.push({
	 
     requestType : 'get',
     requestUrl : '/getGroup/:group',
     callbackFunction : function (request, response) {
     	groupName = request.params.group;
     	
     	console.log("In router server "+ groupName);
     	var sql = require('./ssql.js');
     	sql.db.getGroup(groupName, response);
     }
 });
 
 self.routeTable.push({
	 
 requestType : 'post',
 requestUrl : '/createGroup',
 callbackFunction : function (request, response) {
 	groupName = request.body.groupName;
 	var sql = require('./ssql.js');
 	sql.db.createGroup(groupName, request.session.id, response);
 }
});
  
 self.routeTable.push({
     
     requestType : 'get',
     requestUrl : '/partials/:name',
     callbackFunction : function (request, response) {
    	 var name = request.params.name;
         response.render('partials/'+name);
     }
 });
 
self.routeTable.push({
     
     requestType : 'get',
     requestUrl : '/getMembersByGroup/:name',
     callbackFunction : function (request, response) {
    	 var groupName = request.params.name;
    	 var sql = require('./ssql.js');
    	 sql.db.getGroupMembers(groupName, response);
         
     }
 });

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getFriends',
    callbackFunction : function (request, response) {
   	 var sql = require('./ssql.js');
   	 sql.db.getFriends(request.session.id, response);
        
    }
});

self.routeTable.push({
requestType : 'get',
requestUrl : '/getAddFriends',
callbackFunction : function (request, response) {
	 var sql = require('./ssql.js');
	 sql.db.getAddFriends(1, response);
    
}
});

self.routeTable.push({
	requestType : 'get',
	requestUrl : '/getGroupMemberToAdd/:groupName',
	callbackFunction : function (request, response) {
		 var sql = require('./ssql.js');
		 groupName = request.params.groupName;
		 sql.db.getGroupMemberToAdd(groupName, response);
	    
	}
	});
self.routeTable.push({
	requestType : 'post',
	requestUrl : '/approveRequest/:senderId',
	callbackFunction : function (request, response) {
		var senderId = request.params.senderId;
		 var sql = require('./ssql.js');
		 sql.db.approveRequest(request.session.id, senderId, response);
	    
	}
	});

self.routeTable.push({
	requestType : 'post',
	requestUrl : '/rejectRequest/:senderId',
	callbackFunction : function (request, response) {
		var senderId = request.params.senderId;
		 var sql = require('./ssql.js');
		 sql.db.rejectRequest(request.session.id, senderId, response);
	    
	}
	});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/deleteFromGroup/:group/:id',
    callbackFunction : function (request, response) {
   	 var userId = request.params.id;
   	 var group = request.params.group;
   	 var sql = require('./ssql.js');
   	 sql.db.deleteFromGroup(group, userId, response);
        
    }
});


self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/sendFriendRequest/:id',
    callbackFunction : function (request, response) {
   	 var receiverId = request.params.id;
   	 var senderId = request.session.id;
   	 var sql = require('./ssql.js');
   	 sql.db.sendFriendRequest(senderId, receiverId, response);
        
    }
});

self.routeTable.push({
    
    requestType : 'get',
    requestUrl : '/getFriendRequests',
    callbackFunction : function (request, response) {
   	 var userId = request.session.id;
   	 var sql = require('./ssql.js');
   	 sql.db.getFriendRequest(userId, response);
        
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/deleteGroup/:groupname',
    callbackFunction : function (request, response) {
   	 var groupName = request.params.groupname;
   	 var sql = require('./ssql.js');
   	 sql.db.deleteGroup(groupName, response);
        
    }
});

self.routeTable.push({
    
    requestType : 'post',
    requestUrl : '/addMemberToGroup/:groupname/:userId',
    callbackFunction : function (request, response) {
   	 var groupName = request.params.groupname;
   	 var userId = request.params.userId;
   	 var sql = require('./ssql.js');
   	 sql.db.addMemberToGroup(groupName,userId, response);
        
    }
});
 
 self.routeTable.push({
     
     requestType : 'get',
     requestUrl : '/logout',
     callbackFunction : function (request, response) {
    	 request.session.destroy();
         response.json({"value" : "success"});
     }
 });

    
}

module.exports = facebookRouteConfig;