// test for s3 connections
const AWS = require('aws-sdk');
const fs = require('fs');

AWS.config.loadFromPath('./aws_config.json');

//var bucketParams = {Bucket: "giffimager" }

var s3 = new AWS.S3({params: {Bucket: 'giffimager'}});

fs.readFile('../sample/DSC_0001.jpg', function(err,file){
  if(err){
    console.log('Error: ', err)
  }
  else{
    upload(file, function(err, result){
      if(err){
        console.log('Error: ', err);
      }
      else{
        console.log('Success');
      }
    })
  }
});

function upload(file, callback){
  var data = {
    Key: 'sampleImage',
    Body: file
  }

  s3.putObject(data, function(err,data){
    if(err){
      console.log('Error: ', err);
    }
    else{
      callback(null,{})
    }
  });
}
