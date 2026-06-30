import fs from "node:fs";
import path from "node:path";

// ALGORITHM PURPOSE:
// - Finds files & directories. Stores the files data in an object of arrays

/**
 * 
 * @param {string} folderPath - Must be the path of the folder over which the files must be scan and mapped be perform
 * @param {string[]} excludeList - Files that shouldn't be stored
 * @param {import("./TraceabilityPipeline").DirectoryAndFileMap} mapOfDirsAndFilesObj 
 */

export default function SearchAndDivide(folderPath, excludeList, mapOfDirsAndFilesObj) {
  try {
    const arrItems = fs.readdirSync(folderPath, { withFileTypes: true }); 
    const filteredItems = arrItems.filter(
      (item) => !excludeList.includes(item.name),
    );
    //console.log('Items found filtered: ', filteredItems); // This should be deleted

    // Separating files from directories
    filteredItems.forEach((item) => {
      if (item.isFile()) {
        mapOfDirsAndFilesObj.files.push(item);
      } else {
        // If item as been added then avoid adding it again and delete it Specially directories

        mapOfDirsAndFilesObj.dirs.push(item);
      }
    });

    /*
    // AVOIDING A INFINITE RECURSION LOOP
    // - Before Iterating over the directories that are store, find the current one and delete it
    // - The stop condition is the directories array being completely empty, indicating all dirs have been read and files extracted
    */

    const currentFolderLocation = mapOfDirsAndFilesObj.dirs.findIndex(
      (dir) => path.join(dir.path, dir.name) === folderPath, //Checks if the item is actually the scanned directory and figure out its index!
    ); // Breaks once true returning the index of that elements otherwise -1

    console.log("Index of found element: ", currentFolderLocation);

    if (currentFolderLocation != -1) {
      console.log("Item to pop ", mapOfDirsAndFilesObj.dirs[currentFolderLocation]);
      mapOfDirsAndFilesObj.dirs.splice(currentFolderLocation, 1); // Splice deletes the element at a given index and a number of elements from that index 
    }
    console.log("Dirs state after pop ", mapOfDirsAndFilesObj.dirs);

    console.log("Lenght of dir: ", mapOfDirsAndFilesObj.dirs.length);

    // Recursive call when directories to explore and extract but also works as stop condition
    if (mapOfDirsAndFilesObj.dirs.length > 0) {
      mapOfDirsAndFilesObj.dirs.forEach((dir) => {
        SearchAndDivide(
          path.join(dir.path, dir.name),
          excludeList,
          mapOfDirsAndFilesObj,
        );
      });
    } else {
      return mapOfDirsAndFilesObj;
    }
  } catch (error) {
    console.log("Program did not found and divide, this is the error:", error);
    return error;
  }
}
