import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.CONNECTIONSTRING;

export const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})

// Đồng bộ hóa cơ sở dữ liệu và tạo bảng (nếu chưa tồn tại)
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });


export const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};
