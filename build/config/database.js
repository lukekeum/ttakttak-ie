"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Database {
    async connect(options) {
        const { MONGO_URI } = process.env;
        if (!MONGO_URI)
            throw new Error('MongoURI not found');
        try {
            await mongoose_1.connect(MONGO_URI, options);
            console.log('Database Connected');
        }
        catch (err) {
            console.error(err);
        }
    }
    disconnect() {
        return mongoose_1.disconnect();
    }
}
exports.default = Database;
