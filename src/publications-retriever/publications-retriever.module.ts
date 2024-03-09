import { Module } from '@nestjs/common';
import { PublicationsRetrieverService } from './publications-retriever.service';
import { PublicationsRetrieverController } from './publications-retriever.controller';
import {HttpModule} from "@nestjs/axios";

@Module({
  controllers: [PublicationsRetrieverController],
  imports: [HttpModule],
  providers: [PublicationsRetrieverService],
  exports: [PublicationsRetrieverService]
})
export class PublicationsRetrieverModule {}
