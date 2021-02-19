import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    // executado antes de salvar qualquer usuario
    this.addHook('beforeSave', async (user) => {
      // só preenche quando informo o campo de password para o meu usuario
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  // checagem de senha do nosso usuário
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
