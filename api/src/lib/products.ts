// import { paymentIntents } from "stripe";
// import { Field, ObjectType, registerEnumType } from "type-graphql";
//
// import { Order } from "../resources/Order";
// import { Product } from "../resources/Product";
// import { User } from "../resources/User";
//
// import { BadUserInputError } from "./errors";
// import { stripe } from "./stripe";

// export interface IPurchase {
//   transaction: Transaction;
//   intent: paymentIntents.IPaymentIntent;
// }
//
// export const purchaseSingleProduct = async (
//   product: Product,
//   quantity: number,
//   user: User
// ): Promise<IPurchase> => {
//   const reqProductPurchase = await Purchase.create({
//     product,
//     quantity
//   });
//   await reqProductPurchase.save();
//
//   // Charge the customer from stripe (stripe only allows cents) and store
//   // the transaction in our database for lookup later.
//   const normalizedCost = product.price * 100 * quantity;
//   const intent = await stripe.paymentIntents.create({
//     amount: normalizedCost,
//     currency: "usd",
//     description: product.displayName,
//     metadata: {
//       email: user.email,
//       productTag: product.tag,
//       userId: user.id
//     },
//     payment_method_types: ["card"],
//     receipt_email: user.email,
//     statement_descriptor: `VEND ${product.statementDescriptor}`
//   });
//
//   const newTransaction: Transaction = await Transaction.create({
//     charged: normalizedCost,
//     intent: intent.id,
//     purchases: [reqProductPurchase],
//     user
//   });
//
//   const savedTransaction: Transaction = await newTransaction.save();
//
//   return Promise.resolve({ transaction: savedTransaction, intent });
// };
//
// export const fulfillProduct = async (productTag: string, user: User) => {
//   const curDate: Date = new Date();
//
//   if (productTag in addDates) {
//     let newMonth: number = curDate.getMonth() + addDates[productTag];
//
//     const normalizedMonth: number = (newMonth % 12) + 1;
//
//     if (normalizedMonth > 5 && normalizedMonth < 8) {
//       newMonth += 8 - normalizedMonth;
//     }
//
//     user.membershipExpiration = new Date(curDate.setMonth(newMonth));
//     await user.save();
//   } else {
//     throw new BadUserInputError(
//       "We currently only support fulfilling ACM membership"
//     );
//   }
// };
