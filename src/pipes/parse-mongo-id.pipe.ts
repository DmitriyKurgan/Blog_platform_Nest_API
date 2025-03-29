import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string> {

    private readonly objectIdRegex = /^[0-9a-fA-F]{24}$/

    transform(value: string): string {
        if (!this.objectIdRegex.test(value)) {
            throw new BadRequestException(`Invalid MongoDB ID format: ${value}`);
        }
        return value;
    }
}
