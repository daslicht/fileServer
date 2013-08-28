app.post('/upload', function( req, res) {

    console.log('BODY',req.files)
    var formidable = require('formidable'),
        form = new formidable.IncomingForm(),
        files = [],
        fields = [];

    form.keepExtensions = true;
    form.uploadDir = appDir + "/public/rte/uploads";

    form.on('progress', function(bytesReceived, bytesExpected) {
        console.log('bytesReceived: ', bytesReceived);
        console.log('bytesExpected: ', bytesExpected);
    })

        .on('field', function(field, value) {
            //console.log('FIELD: ',field, value);
            fields.push([field, value]);
        })

        .on('file', function(field, file) {
            console.log('FILE: ',field, file);
            files.push([field, file]);
        })

        .on('end', function() {
            console.log('----------------------upload done')
            for(var i=0; i<files.length;i++){

                console.log('Path: ',files[i][1].path);
                console.log('Name: ',files[i][1].name);


                var uniqueName = path.basename(files[i][1].path)

                res.json({filelink :  '/uploads/' + uniqueName})

//                    var vo ={
//                        name : files[i][1].name,
//                        path : files[i][1].path
//                    }
//                    addImageToCollection(vo);
            }
        });


    form.parse(req);





});
