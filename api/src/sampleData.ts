import { Connection, createConnection, getConnection } from "typeorm";

import { Item } from "./resources/Item";
import { Machine } from "./resources/Machine";
import { MachineProduct } from "./resources/MachineProduct";
import { Product } from "./resources/Product";
import { User } from "./resources/User";


export async function populate() {
  const connection = getConnection();

  const itemRepo = connection.getRepository(Item);
  const machineRepo = connection.getRepository(Machine);
  const machineProductRepo = connection.getRepository(MachineProduct);
  const userRepo = connection.getRepository(User);
  const productRepo = connection.getRepository(Product);

  const vendingUser = await userRepo.create({
    email: "vending@snackhack.tech",
    emailVerified: true,
    firstName: "Vending",
    isSuperAdmin: true,
    lastName: "Test",
    sub: "1234567890123456"
  }).save();

  const sampleItem = await itemRepo.create({
    brand: "Sample Brand",
    gtin: "98739501946271",
    name: "Sample Item"
  }).save();

  const sampleProduct = await productRepo.create({
    displayName: "Sample Product",
    item: sampleItem,
    owners: [vendingUser],
    price: 1.5,
    statementDescriptor: "sample product"
  }).save();

  const sampleMachine = await machineRepo.create({
    locationDescription: "Anywhere you want",
    // BUG: with giving owners
    owners: [],
    shortName: "Sample"
  }).save();

  await machineProductRepo.create({
    machine: sampleMachine,
    product: sampleProduct,
    quantity: 10
  }).save();
}

if (require !== undefined && require.main === module) {
  createConnection()
    .then(async (connection: Connection) => {
      // await connection.dropDatabase();
      console.log('Finished populating database');
      await connection.close();
    }).catch((err: Error) => {
      console.error('Unexpected error populating database', err);
    });
}