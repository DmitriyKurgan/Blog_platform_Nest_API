import {IsEmail, IsNotEmpty, IsString, Length, Matches} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 10)
    @Matches(/^[a-zA-Z0-9_-]*$/, {
        message: 'Login can only contain letters, numbers, underscores, and dashes',
    })
    login: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}
