import expressAsyncHandler from "express-async-handler";
import { Address } from "../models/AddressModel.js";

export const createAddress = expressAsyncHandler( async (req, res) => {
   const { _id } = req.user;

   const newAddress =  await Address.create({user: _id, ...req.body});

   res.json(newAddress);
});

export const getAddressByUserId = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const results = await Address.find({ user: id });
  res.status(200).json(results);
});

export const updateAddressById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updated = await Address.findByIdAndUpdate(id, req.body, { new: true });

  if (updated) {
    console.log(updated);
    res.status(200).json(updated);
  } else {
    res.status(404).json({ message: 'Address not found' });
  }
})

export const deleteAddressById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Address.findByIdAndDelete(id);

  if (deleted) {
    res.status(200).json(deleted);
  } else {
    res.status(404).json({ message: 'Address not found' });
  }
});


