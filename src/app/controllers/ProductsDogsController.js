import * as Yup from 'yup';
import File from '../models/File';
import ProductsDogs from '../models/ProductsDogs';

class ProductsDogsController {
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
    } = await ProductsDogs.create(req.body);

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

  async index(req, res) {
    const productsDogs = await ProductsDogs.findAll({
      attributes: [
        'id',
        'cod_product',
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

  async update(req, res) {
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
      name_product,
      cod_product,
      description_product,
      price_product,
      category_product,
      amount_product,
      size_product,
      product_file_id,
    } = req.body;

    // busca produto dentro do banco
    const productsDogs = await ProductsDogs.findByPk(req.params.id);

    if (!productsDogs) {
      return res.status(400).json({
        error: 'Esse produto não está cadastrado em nossa plataforma!',
      });
    }

    await ProductsDogs.update(
      {
        name_product,
        cod_product,
        description_product,
        price_product,
        category_product,
        amount_product,
        size_product,
        product_file_id,
      },
      {
        where: { id: req.params.id },
      }
    );

    return res.json({
      name_product,
      cod_product,
      description_product,
      price_product,
      category_product,
      amount_product,
      size_product,
      product_file_id,
    });
  }
}

export default new ProductsDogsController();
