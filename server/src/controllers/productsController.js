const prisma = require('../lib/prisma');

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true,
      },
    });
    return res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        variants: {
          include: {
            emiPlans: true,
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(`Error fetching product by slug (${req.params?.slug}):`, error);
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
};

module.exports = {
  getAllProducts,
  getProductBySlug,
};
