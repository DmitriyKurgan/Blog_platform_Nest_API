import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';

export function logAndThrowError(error: Error, logger: LoggerService): never {
    logger.logError(error);
    throw new BadRequestException(error.message);
}

@Injectable()
export class LoggerService {
    private logFilePath = path.resolve(__dirname, '..', '..', 'logs', 'error.log'); // Используем path.resolve

    // Функция для записи ошибок
    logError(error: Error): void {
        const logMessage = `
            Timestamp: ${new Date().toISOString()}
            Error Name: ${error.name}
            Error Message: ${error.message}
            Stack: ${error.stack}
        `;

        // Проверяем, существует ли директория для логов
        const logDirectory = path.dirname(this.logFilePath);
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory, { recursive: true });
        }

        // Записываем в файл
        fs.appendFileSync(this.logFilePath, logMessage + '\n\n', 'utf-8');

        // Выводим на консоль для удобства
        console.error(logMessage);
    }
}
