var fs = require('fs')
app.post('/upload', function( req, res) {


    var post = JSON.parse( req.body.post);

    console.log('POST',post.id)
    //console.log('FILES',req.files.myFile.path, appDir+'/public/rte/moved');

    console.log('FILES',req.files)

    var tmpPath = req.files.myFile.path
    var destinationPath = appDir+'/public/rte/moved/'+path.basename(tmpPath);
    var url = '/rte/moved/'+path.basename(tmpPath)
    fs.rename(tmpPath, destinationPath, function(){
        console.log('ready');
        console.log()
    });
    console.log({"path":url})
    res.json({"path":url})


});


app.post('/save', function( req, res) {


//    var post = JSON.parse( req.body.post);
//
//    console.log('POST',post.id)
//    //console.log('FILES',req.files.myFile.path, appDir+'/public/rte/moved');
//
//    console.log('FILES',req.files)
//
//    var tmpPath = req.files.myFile.path
//    var destinationPath = appDir+'/public/rte/moved/'+path.basename(tmpPath);
//    var url = '/rte/moved/'+path.basename(tmpPath)
//    fs.rename(tmpPath, destinationPath, function(){
//        console.log('ready');
//        console.log()
//    });
//    console.log({"path":url})
//    res.json({"path":url})


});
