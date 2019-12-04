import { Connection, createConnection, getConnection } from "typeorm";

import { Application } from "./resources/Application";
import { Item } from "./resources/Item";
import { Machine } from "./resources/Machine";
import { MachineProduct } from "./resources/MachineProduct";
import { Product } from "./resources/Product";
import { User } from "./resources/User";

/* tslint:disable:max-func-boxy-length */
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

  const vendingApplication = await Application.create({
    name: "Test Vending Machine",
    user: vendingUser
  }).save();
  console.log('TEST APP KEY="' + vendingApplication.token + '"');

  // Demo items added by Evan 12-3-19
  const cocaCola = await itemRepo.create({
    brand: "Coca-Cola",
    gtin: "89411670423598",
    name: "Coca-Cola Classic Bottle 20 fl oz."
  }).save();

   const drPepper = await itemRepo.create({
    brand: "Keurig Dr Pepper",
    gtin: "69080344246615",
    name: "Dr Pepper Bottle 20 fl oz."
  }).save();

  const sprite = await itemRepo.create({
    brand: "Coca-Cola",
    gtin: "97507010738872",
    name: "Sprite Bottle 20 fl oz."
  }).save();

  const dietCoke = await itemRepo.create({
    brand: "Coca-Cola",
    gtin: "42003992990092",
    name: "Diet Coke Bottle 20 fl oz."
  }).save();
  // ----- //

  // Products for demo Items
  const cocaColaProduct = await productRepo.create({
    displayName: "Coca-Cola Classic 20 fl oz.",
    item: cocaCola,
    owners: [vendingUser],
    price: 1.5,
    statementDescriptor: "Coca-Cola 20 oz"
  }).save();

  const drPepperProduct = await productRepo.create({
    displayName: "Dr Pepper 20 fl oz.",
    item: drPepper,
    owners: [vendingUser],
    price: 1.5,
    statementDescriptor: "Dr Pepper 20 oz"
  }).save();

  const spriteProduct = await productRepo.create({
    displayName: "Sprite 20 fl oz.",
    item: sprite,
    owners: [vendingUser],
    price: 1.5,
    statementDescriptor: "Sprite 20 oz"
  }).save();

  const dietCokeProduct = await productRepo.create({
    displayName: "Diet Coke 20 fl oz.",
    item: dietCoke,
    owners: [vendingUser],
    price: 1.5,
    statementDescriptor: "Diet Coke 20 oz"
  }).save();
  // ---- //

  const sampleMachine1 = await machineRepo.create({
    // BUG: with giving owners
    latitude: 37.951500,
    locationDescription: "Rolla",
    longitude: -91.772550,
    owners: [],
    shortName: "MST BCH 01"
  }).save();

  // Adding Demo Items to Sample Machine
  await machineProductRepo.create({
    machine: sampleMachine1,
    product: cocaColaProduct,
    quantity: 10
  }).save();

  await machineProductRepo.create({
    machine: sampleMachine1,
    product: drPepperProduct,
    quantity: 10
  }).save();

  await machineProductRepo.create({
    machine: sampleMachine1,
    product: spriteProduct,
    quantity: 10
  }).save();

  await machineProductRepo.create({
    machine: sampleMachine1,
    product: dietCokeProduct,
    quantity: 10
  }).save();
  //
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