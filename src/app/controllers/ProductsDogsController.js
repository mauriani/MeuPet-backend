import * as Yup from 'yup';
import ProductsDogs from '../models/ProductsDogs';

class ProductsDogsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name_product: Yup.string().required(),
      description_product: Yup.string().required(),
      price_product: Yup.string().required(),
      category_product: Yup.string().required(),
      amount_product: Yup.string().required(),
      size_product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Ocorreu uma falha ao validar dados!' });
    }

    const {
      id,
      name_product,
      description_product,
      price_product,
      category_product,
      amount_product,
      size_product,
    } = await ProductsDogs.create(req.body);

    return res.json({
      id,
      name_product,
      description_product,
      price_product,
      category_product,
      amount_product,
      size_product,
    });
  }
}

export default new ProductsDogsController();
