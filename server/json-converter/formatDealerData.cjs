const dealerData = require("./files/dealer-data.json");
const fs = require('fs').promises;


dealerData.forEach(async (dealer, index) => {

  if (!dealer["ZipCd"] || !dealer["DealerCd"] || !dealer["Region"] || !dealer["Latitude"] || !dealer["Longitude"]){
    return;
  }


  const dealerObject = {
    "Item": {
      "#ZIPCODE#zipcode": {
        "S": dealer["ZipCd"],
      },
      "dealerCode": {
        "S": dealer["DealerCd"],
      },
      "regionCode": {
        "S": dealer["Region"],
      },
      "dealerDetails": {
        "S":JSON.stringify({
          "DealerNm": dealer["DealerNm"],
          "OperationDt": dealer["OperationDt"],
          "SalesDistrict": dealer["SalesDistrict"],
          "ServiceDistrict": dealer["ServiceDistrict"],
          "PartsDistrict": dealer["PartsDistrict"],
          "PrincipalNm": dealer["PrincipalNm"],
          "BillingAddress1": dealer["BillingAddress1"],
          "BillingCity": dealer["BillingCity"],
          "BillingState": dealer["BillingState"],
          "BillingZipCd": dealer["BillingZipCd"],
          "Phone": dealer["Phone"],
          "Fax": dealer["Fax"],
          "ADI": dealer["ADI"],
          "GeneralManager": dealer["GeneralManager"],
          "DealerUrl": dealer["DealerUrl"],
          "DealerEmail": dealer["DealerEmail"],
          "IsCarCareExpress": dealer["IsCarCareExpress"],
          "IsPresidentAward": dealer["IsPresidentAward"],
          "Latitude": dealer["Latitude"],
          "Longitude": dealer["Longitude"],
          "Tier3Vendor": dealer["Tier3Vendor"],
          "IsGenesisBrand": dealer["IsGenesisBrand"],
          "DealerInventoryURL": dealer["DealerInventoryURL"],
          "RedCapUrl": dealer["RedCapUrl"],
          "IsClickToBuy": dealer["IsClickToBuy"],
          "IsHomeNet": dealer["IsHomeNet"],
          "IsDWCP": dealer["IsDWCP"],
          "DealerTestDriveUrl": dealer["DealerTestDriveUrl"],
          "IsIoniqCertified": dealer["IsIoniqCertified"],
          "IsEVGMACertified": dealer["IsEVGMACertified"],
          "IsRoadsterDealerFlag": dealer["IsRoadsterDealerFlag"]
        })
      },
      "latitude": {
        "S": dealer["Latitude"],
      },
      "longitude": {
        "S": dealer["Longitude"],
      },
      "geoHash": {
        "S": dealer["DealerCd"],
      }
    }
  }
  try {
    await fs.writeFile('./files/S3DealerData.json', `${JSON.stringify(dealerObject, null, 2)}\n`, { flag: 'a' });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})
