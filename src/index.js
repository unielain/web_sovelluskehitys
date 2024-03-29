// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();


// Staattinen sivusto palvelimen juureen (public-kansion sisältö näkyy osoitteessa http://127.0.0.1:3000/sivu.html)
app.use(express.static('public'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Staattinen sivusto "ali-url-osoitteessa": http://127.0.0.1:3000/sivusto
// Tarjoiltava kansio määritellään relatiivisella polulla
app.use('/sivusto', express.static(path.join(__dirname, '../public')));

// mock data for simple API
const items = [
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
  {id: 3, name: 'Item kolme'},
  {id: 4, name: 'Item neljä'},
];

// GET http://127.0.0.1:3000/items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET http://127.0.0.1:3000/items/<ID>
app.get('/items/:id', (req, res) => {
  // palauttaa objektin ID-datan mukaan
  const itemFound = items.find(item => item.id == req.params.id);
  if (!itemFound){
    res.sendStatus(404);
  } else {
    const txt = res.json(itemFound);
    displayParagraph.innerHTML = txt;
  }
});

// Itemin lisäys
// POST http://127.0.0.1:3000/items/
app.post('/items', (req, res) => {
  // lisää postatun itemin items-taulukkoon
  const itemCreated = req.body;
  if (!itemCreated){
    res.sendStatus(200)
  } else {
    for (let i = 0; i < items.length; i++){
      if (i != items[i].item.id){
        const newId = i;
        const newItem = (newId, itemCreated) => ({newId, itemCreated});
      }
    }
    items.push(newItem);
    res.json({item:itemCreated}, items);
  }
});

// GET http://127.0.0.1:3000
app.get('/', (req, res) => {
  res.send('Welcome to my REST api!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
