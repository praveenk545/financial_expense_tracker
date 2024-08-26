import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //2
  // app.use(
  //   // Paths you want to protect with basic auth
  //   '/docs*',
  //   basicAuth({
  //     challenge: true,
  //     users: {
  //       yourUserName: 'p4ssw0rd',
  //     },
  //   }),
  // ); // 2->end
  app.use(cookieParser());
  // app.enableCors({origin:['*'], credentials: true,});
   

  app.enableCors({
    origin: 'http://localhost:4200', // Replace with your Angular app URL
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   
  });
  // app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  const config = new DocumentBuilder()
    .setTitle('Employee')
    .setDescription('The user API description')
    .setVersion('1.0')
    // .addTag('cats')
    // 3
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    ) //3 -> end
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
 // app.register(multipart);
  await app.listen(3000);
}
bootstrap();
