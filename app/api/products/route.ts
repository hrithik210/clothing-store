import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import { Product } from "@/models";

export async function GET({ params }: { params: { id: Number } }) {
    try {
        await connectDB();
        const product = await Product.findById(params.id);
        
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}
  
export async function POST(req: Request) {
    try {
        await connectDB();
        const {name , description , price , image , category} = await req.json();

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

        if(typeof name !== 'string' || typeof description !== 'string' || typeof category !== 'string' || typeof image !== 'string') {
            return NextResponse.json({ error: "Name, description, category, and image must be strings" }, { status: 400 });
        }



        const product = await Product.create({ name, description, price, image, category });
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}