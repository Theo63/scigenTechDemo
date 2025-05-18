const { initDB } = require('../config/database');
const db = initDB();


class Speaker {
    static create(data) {
        const { name, bio, email, topic, description, date, time, duration, location } = data;
        const stmt = db.prepare('INSERT INTO speakers (name, bio, email, topic, description, date, time, duration, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const result = stmt.run(name, bio, email, topic, description, date, time, duration, location); // Values match ? in order
                                                                                    // First ? gets name, second gets topic, third gets duration, fourth gets id
        return { id: result.lastInsertRowid, ...data };  //auto increment id
    }

    
    static findAll() {
        const stmt = db.prepare('SELECT * FROM speakers ORDER BY id DESC');
        return stmt.all();
    } //call it without instantiating the class -- just Speaker.findAll()

    



    static search(name) {
    try {
        const stmt = db.prepare(`
            SELECT * FROM speakers 
            WHERE LOWER(name) LIKE LOWER(?)
            ORDER BY date DESC
        `);
        const searchTerm = `%${name}%`;
        return stmt.all(searchTerm); // excecute the query with the 
                                    // searchterm in the ? placeholder
    } catch (error) {
        console.error('Search error:', error);
        throw new Error('Database search failed');
    }
    }




    static delete(id) {
        const stmt = db.prepare('DELETE FROM speakers WHERE id = ?');
        const result = stmt.run(id);
        return result.changes > 0;
    }
}

module.exports = Speaker;