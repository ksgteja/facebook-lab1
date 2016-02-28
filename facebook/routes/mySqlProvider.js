var mysql = require('mysql');

mysqlConnectionStringProvider = {
    
    getMySqlConnection : function () { 
    	
    	//var mysqlConnectionString = require('./mysqlConnectionString.js');
    
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
    },

    closeMySqlConnection : function (currentConnection) {
    
        if (currentConnection) {
        
            currentConnection.end(function (err) { 
            
                if (err) { throw err; }

                console.log('connection closed successfully.')
            })
        }
    
    }


}

module.exports.mysqlConnectionStringProvider = mysqlConnectionStringProvider;