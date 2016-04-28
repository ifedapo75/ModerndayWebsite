/**
 * Created by orajiakuchukwudalu on 2016-04-28.
 */
var express = require('express');
var router = express.Router();
var aws = require('aws-sdk');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
    var email = req.body.email;
    var message = req.body.message;
    var name = req.body.name;

    try {
        aws.config.loadFromPath('./credentials.json');

        var ses = new aws.SES();
        var params = {
            Destination: { /* required */
                BccAddresses: [
                    /* more items */
                ],
                CcAddresses: [
                    /* more items */
                ],
                ToAddresses: [
                    email
                    /* more items */
                ]
            },
            Message: { /* required */
                Body: { /* required */
                    Text: {
                        Data: message + '\n' + "Email : "+ email /* required */
                    }
                },
                Subject: { /* required */
                    Data: 'Message from '+ name, /* required */
                    Charset: 'utf-8'
                }
            },
            Source: 'chukwudalurjk@gmail.com', /* required */
            ReplyToAddresses: [
                'chukwudalurjk@yahoo.com'
                /* more items */
            ],
            SourceArn: 'arn:aws:ses:us-east-1:215199617074:identity/chukwudalurjk@gmail.com'
        };
        ses.sendEmail(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            } // an error occurred
            else {
                console.log(data);

                // successful response
            }
        });
        if(req.app.get('env') == "development"){
            res.redirect('http://'+ req.hostname + ':3000/');
        }else{
            res.redirect('http://'+ req.hostname + '/');
        }
    }catch(err){
        console.log(err);
    }

    //res.render('index', { title: 'Express' });
});

module.exports = router;
