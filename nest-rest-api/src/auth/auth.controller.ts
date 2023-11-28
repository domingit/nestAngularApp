import {Body, Controller, Post, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import { Model } from 'mongoose';
import { UserSch } from 'src/auth/user.schema';


@Controller("/login")
export class AuthController {

    constructor(
        @InjectModel("User") private userModel: Model<UserSch>) {

    }

    @Post()
    async login(@Body("email") email:string,
        @Body("password") plaintextPassword:string) {

        const user = await this.userModel.findOne({email}).exec();

        if(!user) {
            console.error(`User email ${email} does exist on the database.`);
            throw new UnauthorizedException();
        }

        return new Promise((resolve, reject) => {
            password(plaintextPassword).verifyAgainst(
                user.password, 
                (err, verified) => {
                    if (!verified) {
                        console.error(`Incorrect ${user.email} user password`);
                        reject(new UnauthorizedException());
                    }

                    const authJwtToken =
                        jwt.sign({email, roles: user.roles},
                            JWT_SECRET);

                    console.log('authJwtToken >> ', authJwtToken);

                    resolve({authJwtToken});
                    // resolve({JWT_SECRET})
                }
            );

            // console.log('out');
            // resolve({JWT_SECRET})
        });
    }

}













