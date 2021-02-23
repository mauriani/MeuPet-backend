import * as Yup from 'yup';
import File from '../models/File';
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

  async index(req, res) {
    const productsCats = await ProductsCats.findAll({
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

    return res.json(productsCats);
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
      cod_product,
      name_product,
      description_product,
      price_product,
      category_product,
      amount_product,
      size_product,
      product_file_id,
    } = req.body;

    // busca produto dentro do banco
    const productsCats = await ProductsCats.findByPk(req.params.id);

    if (!productsCats) {
      return res.status(400).json({
        error: 'Esse produto não está cadastrado em nossa plataforma!',
      });
    }

    await ProductsCats.update(
      {
        cod_product,
        name_product,
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

export default new ProductsCatsController();
