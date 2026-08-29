const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Task API listening at http://localhost:${PORT}`);
});
