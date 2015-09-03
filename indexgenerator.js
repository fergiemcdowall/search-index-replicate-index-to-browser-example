var dataset = require('./node_modules/reuters-21578-json/data/justTen/justTen.json');
var fs = require('fs');
var si = require('search-index')({
  indexPath: 'indexToBeReplicated'
});

si.add(dataset, {'batchName': 'reuters'}, function(err) {
  console.log('creating snapshot...');
  si.snapShotBatch(function(readStream) {
    readStream.pipe(fs.createWriteStream('backup.gz'))
      .on('close', function() {
        console.log('snapshot completed');
      });
  });
});

