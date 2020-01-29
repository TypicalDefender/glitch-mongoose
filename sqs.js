const AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-2'});

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
let accountId = 201471907306;
let queueName = "stackAbuseQueue";

let params = {
    MessageBody : JSON.stringify({
        order_id : 1235,
        data : (new Date()).toISOString()
    }),
    QueueUrl : `https://sqs.us-east-2.amazonaws.com/${accountId}/${queueName}`
};

sqs.sendMessage(params, (err, data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("the message sent successfully ",data.MessageId);
    }
    let receiveParams = {
        QueueUrl : `https://sqs.us-east-2.amazonaws.com/${accountId}/${queueName}`,
        MaxNumberOfMessages : 2,
        VisibilityTimeout: 0,
        WaitTimeSeconds: 0
    }
    sqs.receiveMessage(receiveParams, (err, data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("the data is ", data);
        }
        const Data = data.Messages[0].Body;
        console.log("data received ", JSON.parse(Data));
        let deleteParams = {
            QueueUrl : `https://sqs.us-east-2.amazonaws.com/${accountId}/${queueName}`,
            ReceiptHandle : data.Messages[0].ReceiptHandle,
        }
        sqs.deleteMessage(deleteParams, (err, data)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("deleted from the queue ", data);
            }
        });
    });
});

// db.masterresults.aggregate([{
//     $group : {
//         _id : {
//             "studentId" : "$studentId"
//         },
//         uniqueIds : {
//             $addToSet : "$_id"
//         },
//         count : {
//             $sum : 1
//         }
//     }
// },
// {
//   $match : {
//       count : {
//           $gt : 1
//       }
//   }
// },
// {
//     $sort : {
//         count : -1
//     }
// },
// {
//     $unwind : "$uniqueIds"
// },
// {
//     $addFields : {
//         academicYear : "2020-21"
//     }
// }]).pretty()