import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /*http://localhost:3000/user/criar:
  criar um usuário.*/
  @Post('criar')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /*http://localhost:3000/user/(nome)/(senha)/lista:
  ver lista de usuários (apenas admins).*/
  @Get(':nome/:senha/lista')
    findAll(@Param('nome') nome: string, @Param('senha') senha: string) {
      return this.userService.findAll(nome, senha);
  }

  /*http://localhost:3000/user/(nome)/(senha):
  checar dados (apenas com senha).*/
  @Get(':nome/:senha')
  findOne(@Param('nome') nome: string, @Param('senha') senha: string) {
    return this.userService.findOne(nome, senha);
  }

  /*http://localhost:3000/user/(nome)/(senha)/modificar:
  modificar nome ou senha (apenas com senha atual).*/
  @Patch(':nome/:senha/modificar')
  update(@Param('nome') nome: string, @Param('senha') senha: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(nome, senha, updateUserDto);
  }

  /*http://localhost:3000/user/(nome)/(senha)/comprar/(produtoid):
  comprar um produto (apenas com senha).*/
  @Get(':nome/:senha/comprar/:produtid')
  sell(@Param('nome') nome: string, @Param('senha') senha: string, @Param('produtoid') produtoid: string) {
    return this.userService.sell(nome, senha, +produtoid);
  }

  /*http://localhost:3000/user/(nome)/(senha)/deletar:
  deletar um usuário (apenas com senha).*/
  @Delete(':nome/:senha/deletar')
  remove(@Param('nome') nome: string, @Param('senha') senha: string) {
    return this.userService.remove(nome, senha);
  }
}
