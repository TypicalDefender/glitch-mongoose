// const app = require('express')();
const AWS = require('aws-sdk');

const credentials =  new AWS.SharedIniFileCredentials({});
const sns = new AWS.SNS({credentials : credentials, region : 'us-east-2'});

let params = {
    Name: "stackAbuseTopic",
  };
let k = "";
let Endpoint = 'https://qa3-otmnode.vedantu.com/recorder/launchOtfSessionRecorderCron';

  sns.createTopic(params, (err, data)=> {
    if (err) console.log(err, err.stack);
    else{
    //  console.log(data);
     console.log("topic json", data);
     const topicName = data["TopicArn"].split(':')[5];
     console.log("List of topics",topicName);
     k = data["TopicArn"];
     let params = {
        TopicArn: k
      };
      //list subscriptions by topic
      let listAttr = sns.listSubscriptionsByTopic(params).promise();
      listAttr.then((data)=>{
        //   console.log('this is lisAttr',data);
          let mapped_endpoints = data.Subscriptions.map(x => x.Endpoint);
          console.log("list of subscriptions ",mapped_endpoints);
          // console.log(Endpoint);
          if(mapped_endpoints.includes(Endpoint)){
            console.log("endpoint exists");
          }
          else{
            // console.log("create subscription")
            let subscribeParams = {
              Protocol : 'HTTPS',
              TopicArn : k,
              Endpoint : Endpoint
          }
          let subSns = sns.subscribe(subscribeParams).promise();
          subSns.then((data)=>{
              console.log("subscription is created "+data.SubscriptionArn);
          }).catch((err)=>{
              console.log(err);
          })
          }
      }).catch((err)=>{
          console.log(err);
      })
    }       
});