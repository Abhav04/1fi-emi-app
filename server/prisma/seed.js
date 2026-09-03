require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function calculateMonthlyAmount(price, tenureMonths, interestRate) {
  if (interestRate === 0) {
    return Number((price / tenureMonths).toFixed(2));
  }
  const monthlyRate = interestRate / (12 * 100);
  const emi =
    (price * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  return Number(emi.toFixed(2));
}

async function main() {
  console.log('Cleaning existing database records...');
  // Delete in order to respect foreign key constraints
  await prisma.emiPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  console.log('Seeding new product catalog...');

  const productsData = [
    {
      name: 'iPhone 17 Pro',
      slug: 'iphone-17-pro',
      description:
        'The next-generation iPhone engineered with titanium and powered by the groundbreaking A19 Pro chip.',
      variants: [
        {
          variantLabel: '256GB · Natural Titanium',
          mrp: 139900.0,
          price: 134900.0,
          hex: '78736e',
          colorName: 'Natural Titanium',
          imageUrl:
            'https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-17-Pro/Cosmic-Orange/Apple-iPhone-17-Pro-Cosmic-Orange-thumbnail_v1.png',
          rate24: 10.5
        },
        {
          variantLabel: '512GB · Midnight Navy',
          mrp: 159900.0,
          price: 154900.0,
          hex: '1e293b',
          colorName: 'Midnight Navy',
          imageUrl: '/products/iphone-17-pro-midnight-navy.jpg',
          rate24: 11.0
        },
        {
          variantLabel: '1TB · Desert Bronze',
          mrp: 179900.0,
          price: 174900.0,
          hex: 'a16207',
          colorName: 'Desert Bronze',
          imageUrl: '/products/iphone-17-pro-desert-bronze.jpg',
          rate24: 10.5
        }
      ]
    },
    {
      name: 'Samsung Galaxy S25 Ultra',
      slug: 'samsung-galaxy-s25-ultra',
      description:
        "Samsung's ultimate flagship phone combining Snapdragon 8 Elite power with intuitive Galaxy AI features.",
      variants: [
        {
          variantLabel: '256GB · Titanium Silver',
          mrp: 134999.0,
          price: 129999.0,
          hex: '64748b',
          colorName: 'Titanium Silver',
          imageUrl:
            'https://api.samsungmobilepress.com/file/515828F7CDAC4DF062DBCB152FA6FB017602E0CC9078379C0E27644770D54F4F297E7E805E99F940AE1D73916BD3E426AA063CAB0D863151598728FEB42E60119952CE58DA24B8014D6CC947FCB97BE8CEF0449DC70517B868A96B3736A55737BD548ECEE8441F44715859C31565F4F03418701F96EE9031A0F66642A33FEC640AE44153234E71C7E8952D5D07020ED3',
          rate24: 9.5
        },
        {
          variantLabel: '512GB · Onyx Black',
          mrp: 149999.0,
          price: 144999.0,
          hex: '0f172a',
          colorName: 'Onyx Black',
          imageUrl:
            'https://api.samsungmobilepress.com/file/E1666224AD997CAC89729C6D7BA5CD4FF9C2F5A1140B11BDE85B5EFE8FC90AD8306D85C173474FD35645F0CF13520C185F1D3F294ECE53C905459C724AB42EDC0AA0B32021C97DD67C822A6D91AE92D68B39B0B7BA4A0A608208BED3436C23E04D78668C266101F6BA956136893B405412DC4456ED0AD4F3A34276D4166F3924836162E72845283D99032EFBC1AF52A4',
          rate24: 10.0
        },
        {
          variantLabel: '1TB · Forest Emerald',
          mrp: 169999.0,
          price: 164999.0,
          hex: '166534',
          colorName: 'Forest Emerald',
          imageUrl:
            'https://api.samsungmobilepress.com/file/9A8B0C5E7AE223941FE931B23B810EB4B0889FB378F9B1FA94096036C43DE1D9CBD04954550FBC1C771FCC793F100E9B5F5CA2F530F87B9FD4380D9EADEC2F54798273B45EB93A9033A5AD11EE2772F26A4BAD909A7CC2D855BCEDD00CD694A0D3D74A1A1DFD89AB23A207E29BB7C4FCB75408D09299E0D7A20B2E7C743E5C83BFD92E8F115E7A657CE4E9C368FF4F451E8D9FE7A63E4C776A67EDBF7A360A39',
          rate24: 10.5
        }
      ]
    },
    {
      name: 'Google Pixel 10 Pro',
      slug: 'google-pixel-10-pro',
      description:
        "Google's premier smartphone delivering advanced pro cameras and deep Gemini intelligence powered by Tensor G5.",
      variants: [
        {
          variantLabel: '128GB · Hazel Green',
          mrp: 109999.0,
          price: 104999.0,
          hex: '3f4f44',
          colorName: 'Hazel Green',
          imageUrl:
            'https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/Google/Google-Pixel-10-Pro/Moonstone/Google-Pixel-10-Pro-Moonstone-thumbnail.png',
          rate24: 9.0
        },
        {
          variantLabel: '256GB · Berry Rose',
          mrp: 119999.0,
          price: 114999.0,
          hex: '831843',
          colorName: 'Berry Rose',
          imageUrl: '/products/pixel-10-pro-berry-rose.jpg',
          rate24: 9.5
        },
        {
          variantLabel: '512GB · Amber Coral',
          mrp: 134999.0,
          price: 129999.0,
          hex: 'c2410c',
          colorName: 'Amber Coral',
          imageUrl: '/products/pixel-10-pro-amber-coral.jpg',
          rate24: 10.0
        }
      ]
    }
  ];

  for (const product of productsData) {
    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        variants: {
          create: product.variants.map((variant) => {
            const price = Number(variant.price.toFixed(2));
            const mrp = Number(variant.mrp.toFixed(2));
            const imageUrl = variant.imageUrl;
            // 3% cashback on the 12-month plan
            const cashbackAmount = Number((price * 0.03).toFixed(2));

            return {
              variantLabel: variant.variantLabel,
              mrp,
              price,
              imageUrl,
              colorHex: `#${variant.hex}`,
              emiPlans: {
                create: [
                  {
                    tenureMonths: 3,
                    interestRate: 0.0,
                    cashback: 0.0,
                    monthlyAmount: calculateMonthlyAmount(price, 3, 0.0)
                  },
                  {
                    tenureMonths: 12,
                    interestRate: 0.0,
                    cashback: cashbackAmount,
                    monthlyAmount: calculateMonthlyAmount(price, 12, 0.0)
                  },
                  {
                    tenureMonths: 24,
                    interestRate: variant.rate24,
                    cashback: 0.0,
                    monthlyAmount: calculateMonthlyAmount(price, 24, variant.rate24)
                  }
                ]
              }
            };
          })
        }
      },
      include: {
        variants: {
          include: {
            emiPlans: true
          }
        }
      }
    });

    console.log(`Created product: ${createdProduct.name} (${createdProduct.slug}) with ${createdProduct.variants.length} variants`);
  }

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
