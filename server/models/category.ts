import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  categoryName: string;
  subCategories?: string[];
}

const categorySchema: Schema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  subCategories: {
    type: [String],
    required: false
  }
});

const Category: Model<ICategory> = mongoose.connection.useDb('give&take').model<ICategory>('Category', categorySchema);

export default Category;