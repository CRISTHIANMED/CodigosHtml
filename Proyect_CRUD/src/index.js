import express from 'express';

//Initialize
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Run server
app.listen(app.get('port'), () => {
  console.log('Server lisening on port', app.get('port'));
});

