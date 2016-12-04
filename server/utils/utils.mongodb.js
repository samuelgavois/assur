MongoDbUtils = {
    /**
     * Set created_date and updated_date with system date when record is created
     * Set also created_by and updated_by with user 'Administrateur'
     * Set deleted_date and deleted_by with null value
     */
    setDateFieldsOnCreate: function(record, username) {
        record.created_date = moment().format();
        if (username === undefined) {
            record.created_by = cfg_server.mongodb.user_to_create;
        } else {
            record.created_by = username;
        }
    
        record.updated_date = record.created_date;
        record.updated_by = record.created_by;
        
        if (cfg_server.mongodb.flag_to_delete) {
            record.deleted_by = null;
            record.deleted_date = null;
        }
    },

    /**
     * Set updated_date and updated_by with username when record is updated
     */
    setDateFieldsOnUpdate: function(record, username) {
        record.updated_date = moment().format();
        record.updated_by = username;
    },

    /**
     * Set deleted_date and deleted_by with username when record is deleted
     */
    setDateFieldsOnUpdate: function(record, username) {
        record.updated_date = moment().format();
        record.updated_by = username;
    },

    /**
     * Define deleted_date and deleted_by with username when record is deleted
     */
    getDateFieldsOnDelete: function(username) {
        return {deleted_date: moment().format(), deleted_by: username};
    }
};