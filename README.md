# QuestionsandAnswers


ETL Code

//*********************************************************************************
                      Imports
*********************************************************************************//

mongoimport --db=sdc --collection=questions --type=csv --headerline --ignoreBlanks --file=/Users/felipeerazo/Downloads/questions.csv
mongoimport --db=sdc --collection=answers --type=csv --headerline --ignoreBlanks --file=/Users/felipeerazo/Downloads/answers.csv
mongoimport --db=sdc --collection=photos --type=csv --headerline --ignoreBlanks --file=/Users/felipeerazo/Downloads/photos.csv

//*********************************************************************************
                      Indexing
*********************************************************************************//

db.questions.createIndex({id: 1})
db.questions.createIndex({product: 1})
db.answers.createIndex({id: 1})
db.photos.createIndex({answer_id: 1})
db.answerscombines.createIndex({id: 1})
db.answerscombines.createIndex({question_id: 1})

//*********************************************************************************
                      Aggregation Pipiline
*********************************************************************************//

db.answers.aggregate([{$lookup: { from: 'photos', 
  localField: 'id', 
  foreignField: 'answer_id', 
  as: 'photos'
}}, {$project: {
  photos: {answer_id : 0}
}}, {$out: 'answerscombines'}]);

db.questions.find().forEach(doc => db.answerscombines.update({'question_id':doc.id},{$set: {'question_id':doc._id}}))
