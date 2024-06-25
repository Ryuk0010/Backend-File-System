    const express = require('express');
    const fs = require('fs');
    const path = require('path');
    const app = express();
    const port = 3000;

    app.get('/', (req, res) => {
      res.send('Hello 123 World!')
    })
    
    app.get('/files', (req, res) => {
      const dir = 'C:\\Users\\iammo\\OneDrive\\Desktop\\File System Backend\\files'; // Corrected path
      try {
          const files = fs.readdirSync(dir);
          res.status(200).json({ files }); // Send files as JSON
      } catch (err) {
          console.error(err);
          res.status(500).send('Unable to read the directory');
      }
  });
  
    
  app.get('/files/:filename', (req, res) => {
    const dir = 'C:\\Users\\iammo\\OneDrive\\Desktop\\File System Backend\\files'; // Corrected path
    const filename = req.params.filename;
    const filePath = path.join(dir, filename);

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (data) {
            res.json({ data });
        }
        else{
          console.error(err);
          return res.status(500).send('Unable to read the file');
        }
    });
});

    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    }) 
