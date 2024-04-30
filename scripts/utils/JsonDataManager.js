const fs = require('fs');

exports.JsonDataManager = class JsonDataManager {
    projectFilePath = "scripts/data/";
    constructor(filePath) {
        this.filePath = this.projectFilePath + filePath;
    }

    readDataWithFileName(fileName) {
        try {
            const jsonData = fs.readFileSync(this.projectFilePath + fileName, 'utf-8');
            return JSON.parse(jsonData);
        } catch (error) {
            console.error('Error reading JSON file:', error);

            return null;
        }
    }

}

