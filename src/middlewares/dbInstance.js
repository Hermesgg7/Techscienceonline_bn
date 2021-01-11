import { Sequelize } from "sequelize";

const sequelize = new Sequelize('TechScienceMVC', 'sa', 'Brutarwt@85', {
  dialect: 'mssql',
  dialectOptions: {
    instanceName: 'WTINSTANCE',
    options: {
      useUTC: false,
      dateFirst: 1
    }
  },
  logging: false
})

export default sequelize