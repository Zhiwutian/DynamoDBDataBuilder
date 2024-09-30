const AWS = require('aws-sdk');
const fs = require("fs");
const csv = require('csvtojson');
const dealerData = require('./createDealerData.cjs');


// configures the s3 connection to use config / credentials files
process.env.AWS_SDK_LOAD_CONFIG = 1;

let s3 = new AWS.S3();


//Access the S3 bucket and download the file

    let s3File = fs.createWriteStream('./files/newFiles/dealers.csv');

    let params = {
      Bucket:"brett-sbs-database-bucket-test",
      Key:"hma-dealer-master.csv"
    }

    s3.getObject(params).createReadStream().pipe(s3File);


// convert the csv file to JSON
// write the file to the server
// upload the file to the desired S3 bucket
csv({
  delimiter: "|"
})
  .fromFile("./files/newFiles/dealers.csv")
  .then((jsonObj)=> {
    fs.writeFileSync("./files/dealer-data.json", JSON.stringify(jsonObj,null,2));


  });
