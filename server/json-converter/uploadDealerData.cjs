const AWS = require('aws-sdk');
const fs = require('fs').promises;
// configures the s3 connection to use config / credentials files
process.env.AWS_SDK_LOAD_CONFIG = 1;
let s3 = new AWS.S3();


async function uploadDealerData(){
  try {
    const dealerData = await fs.readFile("./files/S3DealerData.json", 'utf-8');
    let UploadParams = {
      Bucket: "brett-sbs-database-bucket-test",
      Key: "S3DealerData.json",
      Body: dealerData
    }


    s3.upload(UploadParams, (err, data) => {
      if (err) {
        console.error("error uploading file", err);
      } else {
        console.log("file uploaded successfully", `${data.Location}`);
      }
    })


  } catch (err) {
    console.error("error", err)
  }

}

uploadDealerData()
