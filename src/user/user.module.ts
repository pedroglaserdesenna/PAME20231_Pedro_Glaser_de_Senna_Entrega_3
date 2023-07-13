import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from 'src/produto/entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
            TypeOrmModule.forFeature([Produto])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
