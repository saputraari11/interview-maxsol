import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe, BadRequestException } from '@nestjs/common'
import { ValidationError } from 'class-validator'
import * as express from 'express'

import * as bodyParser from 'body-parser'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder()
    .setTitle('Bank api')
    .setDescription('Bank API Documentation')
    .setVersion('1.0')
    .addTag('bankapp-api')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  app.use(express.static(join(process.cwd(), '../temp/qrcode/')))

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessage = []
        errors.map(error => {
          const newMessages = []
          const property = error.property
          const messages = Object.values(error.constraints)
          messages.map(message => {
            newMessages.push(message.replace(property + ' ', ''))
          })

          const fullMessage = {}
          fullMessage[property] = newMessages

          errorMessage.push(fullMessage)
        })
        return new BadRequestException(errorMessage)
      },
    }),
  )
  app.enableCors()

  await app.listen(process.env.PORT || '4000')
}
bootstrap()
