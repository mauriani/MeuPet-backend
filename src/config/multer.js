import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  // carrega as imagens dentro da própria aplicação
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        // salva a imagem com o número hexadecimal mais a extensão do arquivo
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
