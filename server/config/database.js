const Database = require('better-sqlite3');
const path = require('path');
const config = require('./config');

const initDB = () => {
    const db = new Database(path.join(__dirname, config.DATABASE_URL), {
        // verbose: config.NODE_ENV === 'development' ? console.log : null
    });

    try {
        // Create speakers table if it doesn't exist
        const createTable = db.prepare(`
            CREATE TABLE IF NOT EXISTS speakers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                bio TEXT,
                email TEXT,
                topic TEXT NOT NULL,
                description TEXT,
                date TEXT,
                time TEXT,
                duration INTEGER,
                location TEXT
            )
        `);
        
        // Execute the prepared statement
        createTable.run();

        console.log('Database initialized successfully');
        return db;
    } catch (error) {
        console.error('Database initialization failed:', error.message);
        throw error;
    }
}

const dropDB =  () => {
    const db = new Database(path.join(__dirname, config.DATABASE_URL));
    db.prepare('DROP TABLE IF EXISTS speakers').run();
    db.close();
    console.log('Database schema dropped');
}


module.exports = {initDB, dropDB};

