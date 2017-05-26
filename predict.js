const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

AWS.config.loadFromPath('aws-credential.json');

const machineLearning = new AWS.MachineLearning();

app.get('/', (req, res) => {
  const params = {
    MLModelId: 'ml-CznkWH5YetX',
    PredictEndpoint: 'https://realtime.machinelearning.us-east-1.amazonaws.com',
    //Record: req.body,
    Record: {
            "age": "36",
            "job": "admin.",
            "marital": "married",
            "education": "university.degree",
            "default": "no",
            "housing": "no",
            "loan": "no",
            "contact": "cellular",
            "month": "jun",
            "day_of_week": "mon",
            "duration": "174",
            "campaign": "1",
            "pdays": "3",
            "previous": "1",
            "poutcome": "success",
            "emp_var_rate": "-2.9",
            "cons_price_idx": "92.963",
            "cons_conf_idx": "-40.8",
            "euribor3m": "1.266",
            "nr_employed": "5076.2"
            },
  };

  machineLearning.predict(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      
      res.json({ category: data.Prediction.predictedLabel });
    }
  });
});

app.listen(8080);