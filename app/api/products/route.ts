import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Product } from "@/models";
import { console } from "inspector";

export async function GET() {
  try {
    await connectDB();
    
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, description, price, image, category, isMainCard } = await req.json();
    
    // Validate required fields
    if (!name || !price || !description || !category || !image) {
      return NextResponse.json(
        { error: "Missing required fields. Please provide name, price, description, category, and image" },
        { status: 400 }
      );
    }
    
    // Validate data types
    if (typeof price !== 'number' || price <= 0) {
      return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
    }
    
    if (typeof name !== 'string' || typeof description !== 'string' || typeof category !== 'string' || typeof image !== 'string') {
      return NextResponse.json({ error: "Name, description, category, and image must be strings" }, { status: 400 });
    }
    
    // If isMainCard is true, unset any existing main card
    if (isMainCard) {
      await Product.updateMany({}, { isMainCard: false });
    }
    
    const product = await Product.create({ name, description, price, image, category, isMainCard });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { id, name, description, price, image, category, isMainCard } = await req.json();
    
    // Validate required fields
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }
    
    // Check if product exists
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    // Update data validation - only validate fields that are provided
    if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
      return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
    }
    
    // Build update object with only provided fields
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (image !== undefined) updateData.image = image;
    if (category !== undefined) updateData.category = category;
    if (isMainCard !== undefined) updateData.isMainCard = isMainCard;
    
    // If setting as main card, unset any existing main card
    if (isMainCard) {
      await Product.updateMany({ _id: { $ne: id } }, { isMainCard: false });
    }
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }
    
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}