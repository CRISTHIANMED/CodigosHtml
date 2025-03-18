import http from 'http';

const server = http.createServer((req, res) => {
  res.end('Hello World, here go the frontend');
});

server.listen(3000, () => {   
    console.log('Server is running on port 3000');
 });