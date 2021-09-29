import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('Kaholo recruitment task')
    .setDescription('API for recruitment task')
    .setVersion('1.0')
    .addTag('Bash')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => {
    Logger.log(`App is listening on port ${port}`);
  });
}
bootstrap();
