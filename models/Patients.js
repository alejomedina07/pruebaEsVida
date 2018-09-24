var mongoose = require ('mongoose'),
  debug = require("debug")("EV:Patients"),
  Schema =  mongoose.Schema,
  Patients = new Schema ({
    name: {type: String, required: true},
    birthdate: {type: Date, required: true},
    phone: {type: String, required: true},
    gender:{type: String, required: true}
    // usuarioId: {type: Schema.Types.ObjectId, required: true}
  });

module.exports= mongoose.model('Patients', Patients);
