import * as Yup from 'yup';
import File from '../models/File';
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
      product_file_id: Yup.string().required(),
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
      product_file_id,
    } = await ProductsDogs.create(req.body);

    return res.json({
      id,
      name_product,
      description_product,
      price_product,
      category_product,
      amount_product,
      size_product,
      product_file_id,
    });
  }

  async index(req, res) {
    const productsDogs = await ProductsDogs.findAll({
      attributes: [
        'id',
        'name_product',
        'description_product',
        'price_product',
        'category_product',
        'amount_product',
        'size_product',
      ],
      include: [
        {
          model: File,
          as: 'product_image',
          attributes: ['id', 'url'],
        },
      ],
    });

    return res.json(productsDogs);
  }
}

export default new ProductsDogsController();
