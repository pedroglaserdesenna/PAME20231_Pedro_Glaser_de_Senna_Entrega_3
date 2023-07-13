import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database:'db',
    entities:[],
    synchronize:true,
    autoLoadEntities:true
  }), UserModule, ProdutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
