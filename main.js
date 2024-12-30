const fs = require('fs');

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file ${filePath}: ${err}`);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    // TODO: Perform error handling for invalid file format and missing data
     if (!jsonData || typeof jsonData !== 'object' || Array.isArray(jsonData)) {
      console.error('Error: JSON file must contain an object with required data.');
      process.exit(1);
    }
    console.log('JSON data read successfully:', jsonData);
    const requiredKeys = ['key1', 'key2']; // Replace with actual required keys
    const missingKeys = requiredKeys.filter(key => !(key in jsonData));

    if (missingKeys.length > 0) {
      console.error(`Error: Missing required data in JSON file: ${missingKeys.join(', ')}`);
      process.exit(1);
    }

    console.log('All required data is present.');
  } catch (err) {
    console.error('Invalid JSON file format. Please provide a valid JSON file.');
    process.exit(1);
  }
});
