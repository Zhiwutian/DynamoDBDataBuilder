const AWS = require('aws-sdk');
const fs = require("fs");

process.env.AWS_SDK_LOAD_CONFIG = 1;

// AWS.config.update({
//   region:"us-west-2",
// });

let s3 = new AWS.S3();

const fileToUpload = fs.readFileSync('./files/hma-dealer-master.zip');


let UploadParams = {
  Bucket: "brett-sbs-database-bucket-test",
  Key: "hma-dealer-master.zip",
  Body: fileToUpload
}


s3.upload(UploadParams, (err, data)=> {
  if(err){
    console.error("error uploading file", err);
  } else {
    console.log("file uploaded successfully", `${data.Location}`);
  }
})
