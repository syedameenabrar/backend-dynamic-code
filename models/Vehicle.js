const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");


const vehicleSchema = new mongoose.Schema({
  vehicleType: String,
  condition: String,
  location: String,
  brandName: String,
  modelName: String,
  fuleWhellType: String,
  manufactureYear: Number,
  vehiclePictures: [{ img: String }],
  rcPictures: [{ img: String }],
  chasisPictures: [{ img: String }],
  enginePictures: [{ img: String }],
  scrapPictures: [{ img: String }],
  scrapLetterPictures: [{ img: String }],
  towingPictures: [{ img: String }],
  userDocumentsPictures: [{ img: String }],
  price: String,
  phoneNumber: String,
  collectionName: String,
  leadStatus: String,
  teleCaller: String,
  adminSeen: Boolean,
  uniqueProductName: String,
  clientUsername: String,
  clientId: String,
  createdDate: String,
  createdAt: Date,
  updatedAt: Date,
  __v: Number,
  adminHasSeenQuotation: Boolean,
  items: [Object],
  schedulePickUp: Object,
  teleCallerData: {
    fullName: String,
    userName: String,
    id: String,
    accountType: String
  },
  generatedPdfUrl: String,
  userFinalAmount: String,
  vehicleNumber: String,
  fullName: String,
  whatsAppNumber: String,
  chasisNumber: String,
  engineNumber: String,
  userDocumentType: String,
  userDocumentNumber: String,
  userAddress: String,
  userAddressGoogleMapLink: String,
},
    {
        timestamps: true,
    }
);

vehicleSchema.plugin(paginate);
vehicleSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('products', vehicleSchema);
