import connectDB from "@/lib/mongodb";
import { Product } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        await connectDB();

        // Extract the product ID from the URL
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        const product = await Product.findById(id);
        
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
    }
}