const fs = require("fs");
const path = require("path");
const dns = require("node:dns");
const mongoose = require("mongoose");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) {
      continue;
    }

    const index = line.indexOf("=");
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(process.cwd(), ".env.local"));

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is missing in .env.local");
}

const dnsServers = process.env.MONGO_DNS_SERVERS?.split(",").map((value) => value.trim()).filter(Boolean);
if (dnsServers?.length) {
  dns.setServers(dnsServers);
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const productSchema = new mongoose.Schema(
  {
    name: String,
    slug: { type: String, unique: true },
    price: Number,
    category: String,
    image: String,
    description: String,
    stock: Number
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    customerName: String,
    phone: String,
    address: String,
    city: String,
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        _id: false
      }
    ],
    totalPrice: Number,
    status: String
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

const products = [
  {
    name: "Smart Breeze Ceiling Fan",
    price: 18999,
    category: "Fans",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    description: "Energy-efficient ceiling fan with low-noise performance, balanced airflow, and durable blades for everyday household use.",
    stock: 24
  },
  {
    name: "Turbo Stand Fan 18 Inch",
    price: 16499,
    category: "Fans",
    image: "https://images.unsplash.com/photo-1616628182509-6f0b7f89ef39?auto=format&fit=crop&w=1200&q=80",
    description: "High-speed pedestal fan with adjustable height, oscillation, and multiple speed controls for larger rooms.",
    stock: 18
  },
  {
    name: "Steam Press Dry Iron",
    price: 7999,
    category: "Irons",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=1200&q=80",
    description: "Compact dry iron with ceramic soleplate, quick heat-up, and smooth glide for regular garment care.",
    stock: 30
  },
  {
    name: "Pro Steam Iron Deluxe",
    price: 12499,
    category: "Irons",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80",
    description: "Steam iron with anti-drip control, vertical steam mode, and adjustable temperature settings for mixed fabrics.",
    stock: 16
  },
  {
    name: "Desert Air Cooler 60L",
    price: 42999,
    category: "Air Coolers",
    image: "https://images.unsplash.com/photo-1629042306547-b9df1c0d70d2?auto=format&fit=crop&w=1200&q=80",
    description: "Large-capacity air cooler with honeycomb cooling pads and strong air throw for hot summer conditions.",
    stock: 12
  },
  {
    name: "Compact Room Air Cooler",
    price: 28999,
    category: "Air Coolers",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
    description: "Portable room cooler with efficient water usage, caster wheels, and simple control interface for daily comfort.",
    stock: 20
  },
  {
    name: "Twin Tub Washing Machine 10KG",
    price: 51999,
    category: "Washing Machines",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=1200&q=80",
    description: "Twin tub washer built for practical family use, with strong spin drying and sturdy exterior construction.",
    stock: 9
  },
  {
    name: "Automatic Washing Machine 12KG",
    price: 86999,
    category: "Washing Machines",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80",
    description: "Fully automatic washing machine with multiple wash programs, child lock, and energy-conscious performance.",
    stock: 7
  }
].map((product) => ({ ...product, slug: slugify(product.name) }));

async function seed() {
  await mongoose.connect(mongoUri, { bufferCommands: false });

  await Order.deleteMany({});
  await Product.deleteMany({});

  const insertedProducts = await Product.insertMany(products);

  const fan = insertedProducts.find((product) => product.category === "Fans");
  const iron = insertedProducts.find((product) => product.category === "Irons");
  const cooler = insertedProducts.find((product) => product.category === "Air Coolers");
  const washer = insertedProducts.find((product) => product.category === "Washing Machines");

  await Order.insertMany([
    {
      customerName: "Ahmed Raza",
      phone: "+92 301 5557788",
      address: "House 44, Block C, Johar Town",
      city: "Lahore",
      products: [
        { productId: fan._id, quantity: 1 },
        { productId: iron._id, quantity: 2 }
      ],
      totalPrice: fan.price + iron.price * 2,
      status: "Pending"
    },
    {
      customerName: "Sara Khan",
      phone: "+92 333 7771122",
      address: "Street 12, Sector G-11",
      city: "Islamabad",
      products: [
        { productId: cooler._id, quantity: 1 },
        { productId: washer._id, quantity: 1 }
      ],
      totalPrice: cooler.price + washer.price,
      status: "Confirmed"
    }
  ]);

  console.log(`Seeded ${insertedProducts.length} products and 2 orders.`);
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
