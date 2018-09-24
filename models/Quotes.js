var mongoose = require ('mongoose'),
  debug = require("debug")("EV:Quotes"),
  Schema =  mongoose.Schema,
  Quotes = new Schema ({
    patientId: {type: Schema.Types.ObjectId, required: true},
    reason: {type: String, required: true},
    appointmentTime: {type: Date, required: true},
    type: {type: String, required: true},
  });

module.exports= mongoose.model('Quotes', Quotes);
