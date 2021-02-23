import * as Yup from 'yup';
import ProductsCats from '../models/ProductsCats';

class ProductsCatsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cod_product: Yup.string().required(),
      name_product: Yup.string().required(),
      description_product: Yup.string().required(),
      price_product: Yup.string().required(),
      category_product: Yup.string().required(),
      amount_product: Yup.string().required(),
      size_product: Yup.string(),
      product_file_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação de dados' });
    }

    const {
      id,
      cod_product,
      name_product,
      description_product,
      price_product,
      category_product,
      amount_product,
      size_product,
      product_file_id,
    } = await ProductsCats.create(req.body);

    return res.json({
      id,
      cod_product,
      name_product,
      description_product,
      price_product,
      category_product,
      amount_product,
      size_product,
      product_file_id,
    });
  }
}

export default new ProductsCatsController();
