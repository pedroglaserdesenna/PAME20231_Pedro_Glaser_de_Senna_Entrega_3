import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]),
            TypeOrmModule.forFeature([User])],
  controllers: [ProdutoController],
  providers: [ProdutoService]
})
export class ProdutoModule {}
