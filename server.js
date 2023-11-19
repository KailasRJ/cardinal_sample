const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

// Get the absolute path to the bash script
const bashScriptPath = path.join(__dirname, '../python-start-script.sh');

// Start the Python server by executing the bash script
const startPythonServer = () => {
  const pythonProcess = exec(`bash ${bashScriptPath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting Python server: ${error.message}`);
    } else {
      console.log(`Python server started: ${stdout}`);
    }
  });

  // Forward Python server output to the Node.js server output
  pythonProcess.stdout.pipe(process.stdout);
  pythonProcess.stderr.pipe(process.stderr);
};

startPythonServer();  // Start the Python server when the Node.js server starts

app.get('/', (req, res) => {
  res.send("Hey, it's the Node.js server speaking!");
});

app.listen(port, () => {
  console.log(`Node.js server listening at http://localhost:${port}`);
});
