import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TokenController } from './api/controllers';
import { TokenMapper } from './api/core/mappers';
import { TokenGetQueryHandler } from './api/handlers';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenClient } from './connectors/clients';

@Module({
  imports: [CqrsModule, HttpModule],
  controllers: [AppController, TokenController],
  providers: [AppService,TokenGetQueryHandler,TokenClient,TokenMapper,TokenClient],
})
export class AppModule {}
