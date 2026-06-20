import fs from 'node:fs';
// Findins Files and directories function
export function SearchAndDivide(folderPath, excludeList){
    try {
        const arrItems = fs.readdirSync(folderPath, { withFileTypes: true });
        const filteredItems = arrItems.filter(item => !excludeList.includes(item.name));
        console.log('Items found filtered: ', filteredItems); // This should be deleted

        let arrObjItems = {
            files: [],
            dirs: []
        };
        // Separating files from directories
        filteredItems.map(item => { item.isFile() ? arrObjItems.files.push(item) : arrObjItems.dirs.push(item) })
        console.log('This are the current items store in the object', arrObjItems);
        return arrObjItems;
    }
    catch (error) {

        console.log('Program did not found and divide, this is the error:', error);
        return error;
    }

}

