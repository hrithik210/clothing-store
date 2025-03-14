import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Product } from "@/models";

export async function GET() {
    try {
        await connectDB();
        const product = await Product.findOne({ isMainCard: true });

        if (!product) {
            return NextResponse.json({ error: "MainCard product not found" }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch MainCard" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const { name, description, price, image, category, isMainCard } = await req.json();

        // Validate required fields
        if (!name || !price || !description || !category || !image) {
            return NextResponse.json(
                { error: "Missing required fields: name, price, description, category, image" },
                { status: 400 }
            );
        }

        if (typeof price !== 'number' || price <= 0) {
            return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
        }

        if (typeof isMainCard !== 'boolean') {
            return NextResponse.json({ error: "isMainCard must be a boolean (true or false)" }, { status: 400 });
        }

        // Ensure only one product has isMainCard: true
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

        if (!id || !name || !price || !description || !category || !image) {
            return NextResponse.json(
                { error: "Missing required fields: id, name, price, description, category, image" },
                { status: 400 }
            );
        }

        if (typeof price !== 'number' || price <= 0) {
            return NextResponse.json({ error: "Price must be a positive number" }, { status: 400 });
        }

        if (typeof isMainCard !== 'boolean') {
            return NextResponse.json({ error: "isMainCard must be a boolean (true or false)" }, { status: 400 });
        }

        // If the updated product isMainCard, reset all others to false
        if (isMainCard) {
            await Product.updateMany({}, { isMainCard: false });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { name, description, price, image, category, isMainCard },
            { new: true }
        );

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json(
                { error: "Missing required field: id" },
                { status: 400 }
            );
        }

        const product = await Product.findByIdAndDelete(id);

        return NextResponse.json({ message: "Product deleted successfully", product });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
