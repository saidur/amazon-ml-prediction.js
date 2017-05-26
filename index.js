/* 
Setup your aws account and create a credentials file:
$ mkdir ~/.aws # if it doesn't exist
$ cat <<'EOF' >> ~/.aws/credentials
[default]
aws_secret_access_key = "secret key"
aws_access_key_id = "your id"
EOF

Install aws module:
npm install aws-sdk

Train an example modle with AWS Machine Learning following the steps in these slides starting on slide 22:
https://docs.google.com/a/kdk-id.com/presentation/d/1NYBcMamiZ9Kn4cSantDlPwG21XLPA3Z2cFmX_HpPXC0/edit?usp=sharing

Execute the following script. Return contains:
Request {
...
{ Prediction: 
   { predictedLabel: '1',
     predictedScores: { '1': 0.5786105394363403 },
     details: { Algorithm: 'SGD', PredictiveModelType: 'BINARY' } } }
Yay! We're 58% sure 'y' is going to happen with this person.
*/
var AWS = require('aws-sdk')
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
AWS.config.update({region: 'us-east-1'});
var machinelearning = new AWS.MachineLearning({apiVersion: '2014-12-12', region: "us-east-1"});
var params = {
  MLModelId: 'ml-CznkWH5YetX', /* required */
  
  PredictEndpoint: 'https://realtime.machinelearning.us-east-1.amazonaws.com', /* required */
  
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
  }
};
machinelearning.predict(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});