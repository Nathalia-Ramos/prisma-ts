import { randomBytes } from "crypto";
import { request } from "http";
import { diskStorage, Options } from "multer";
import {resolve} from 'path';

export const multerConfig = {
  dest: resolve(__dirname, '..', '..', 'uploads'), 

  storage : diskStorage({
    destination: (request, file, callback) => {
      callback(null, resolve(__dirname, '..', '..', 'uploads'))
    },
    filename: (request, file, callback) => {
      randomBytes(16,(error, hash) => {
        if(error){
          callback(error, file.filename)
        }
        const filename = `${hash.toString('hex')}`
        callback(null, filename)
       
      })
    }
   
  }),

  limits: {
    fileSize: 5 * 1024 * 1024 //5MB
  },

  fileFilter: (request, file, callback) => {
    const formats = [
      'image/jpg',
      'image/jpeg',
      'image/png'
    ]
    if(formats.includes(file.mimetype)) {
      callback(null, true)
    }else{
      callback(new Error('Formato inválido'))
    }
  }

} as Options