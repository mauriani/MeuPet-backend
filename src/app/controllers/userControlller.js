import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Ocorreu uma falha ao validar dados!' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({
        error: 'Usuário já cadastrado',
      });
    }

    // criando o usuário
    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),

      // se a variavel oldPassword for preenchida pelo usuário a nova senha é exibida
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),

      // confirmando se a password e confirmPassord é igual
      confirmPassword: Yup.string().when('password', (password, field) =>
        // password == confirmPassword
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Ocorreu uma falha ao validar dados!' });
    }

    // buscando os campos do meu frontEnd

    const { email, oldPassword } = req.body;

    // buscando usuário informado no banco

    const user = await User.findByPk(req.userId);

    // se o usuário quiser alterar o email cai aqui
    if (email && email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'Esse e-mail já está cadastrado em nosso sistema' });
      }
    }

    // só entra nesse if se o usuário informar a senha antiga

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
