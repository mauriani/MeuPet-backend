import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Ocorreu uma falha ao validar dados!' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // verificando se o usuário existe ou não

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Esse usuário não foi encontrado em nosso sistema' });
    }

    // check password user

    if (!(await user.checkPassword(password))) {
      return res
        .status(401)
        .json({ error: 'A senha informada está incorreta!' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
