import { connectMongoDB } from "@/libs/mongodb";
import { isValidEmail } from "@/utils/isValidEmail";
import { messages } from "@/utils/messages";
import { NextRequest, NextResponse } from "next/server";
import User, { IUser, IUserSchema } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export async function POST(request: NextRequest) {
    try {
        await connectMongoDB();

        const body = await request.json()

        const { email, password, confirmPassword } = body;

        //Validar campos del registro
        if(!email || !password || !confirmPassword) {
            return NextResponse.json({
                message: messages.error.needProps,
            },
            {
                status: 400,
            });
        }

        //Validar el email
        if(!isValidEmail(email)) {
            return NextResponse.json({
                messages: messages.error.emailNoValido
            },
            {
                status: 400,
            });
        }

        //Validar que la contraseña sea igual en la confirmación
        if(password  !== confirmPassword) {
            return NextResponse.json({
                messages: messages.error.passwordNotMatch
            },
            {
                status: 400,
            });
        }

        //Encontrar usuarios existentes
        const userFind = await User.findOne({email})

        if(userFind) {
            return NextResponse.json({
                messages: messages.error.emailExiste
            },
            {
                status: 400,
            });
        }

        //Encriptación de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser: IUserSchema = new User({
            email,
            password: hashedPassword,
        });

        // @ts-ignore
        const { password: userPass, ...rest } = newUser._doc;

        await newUser.save()

        const token = jwt.sign({data: rest }, 'secreto', {
            expiresIn: 86300,
        });

        //Usuario creado correctamente
        const response = NextResponse.json({
            newUser: rest,
            message: messages.success.userCreado,
        },
        {
            status: 200,
        });

        response.cookies.set("auth_cookie", token, {
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 86400,
            path: "/",
        });

        return response;

    } catch (error) {
        return NextResponse.json({
            message: messages.error.default, error
        },
        {
            status: 404,
        });
    }
}