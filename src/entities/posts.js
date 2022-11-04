const EntitySchema = require("typeorm").EntitySchema; 

module.exports = new EntitySchema({
    name: "posts",
    tableName: "post",
    columns: {
        id: {
            primary: true,
            type: "varchar"
        },
        title: {
            type: "varchar",
            nullable: false
        },
        content: {
            type: "varchar",
            nullable: true
        },
        password: {
            type: "varchar",
            nullable: false
        },
        weather: {
            type: "varchar",
            nullable: true
        },
        created_at: {
            type: "timestamp",
            default: () => 'CURRENT_TIMESTAMP',
        },
        updated_at: {
            type: "timestamp",
            nullable: true,
            onUpdate: 'CURRENT_TIMESTAMP'
        },
    }
});