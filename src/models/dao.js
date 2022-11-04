const { AppDataSource } = require("./datasource");

const dao = async () => {
    return await AppDataSource.query(
        `
        
        `
    )
}

module.exports = {
    dao
}