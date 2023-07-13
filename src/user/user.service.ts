import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from 'src/produto/entities/produto.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>,
              @InjectRepository(Produto) private produtoRepository:Repository<Produto>){}
  
  /* criar um usuário. */
  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...createUserDto,
      produtos: '',
    });
    this.userRepository.save(newUser);
  }

  /* ver lista de usuários (apenas admins). */
  async findAll(nome: string, senha: string) {
    if ((await this.userRepository.findOneBy({ username: nome })).password == senha) {
      if ((await this.userRepository.findOneBy({ username: nome })).admin == true) {
        return this.userRepository.find();
      } else {
        return "Não é permitido realizar essa ação.";
      }
    } else {
      return "Senha incorreta"
    }
  }

  /* checar dados (apenas com senha). */
  async findOne(nome: string, senha: string) {
    if ((await this.userRepository.findOneBy({ username: nome })).password == senha) {
    return this.userRepository.findOneBy({ username: nome });
    } else {
      return "Senha incorreta"
    }
  }

  /* modificar nome ou senha (apenas com senha atual). */
  async update(nome: string, senha: string, updateUserDto: UpdateUserDto) {
    if ((await this.userRepository.findOneBy({ username: nome })).password == senha) {
      let id = (await this.userRepository.findOneBy({ username: nome })).id
      this.userRepository.update({id}, {...updateUserDto});
    } else {
      return "Senha incorreta.";
    }
  }

  /* comprar um produto. */
  async sell(nome: string, senha: string, produtoid: number) {
    if ((await this.userRepository.findOneBy({ username: nome })).password == senha) {
      if ((await this.produtoRepository.findOneBy({ id: produtoid })).amount > 0) {
        let id = (await this.userRepository.findOneBy({ username: nome })).id;
        this.produtoRepository.increment({ id: produtoid }, "amount", -1);
        let type = (await this.produtoRepository.findOneBy({ id: produtoid })).type;
        let size = (await this.produtoRepository.findOneBy({ id: produtoid })).size;
        this.userRepository.increment({ id }, "produtos", type + "-" + size +", ");
        return "Produto comprado."
      } else {
        return "Produto sem estoque.";
      }
    } else {
      return "Senha incorreta."
    }
  }

  /* deletar um usuário (apenas com senha). */
  async remove(nome: string, senha: string) {
    if ((await this.userRepository.findOneBy({ username: nome })).password == senha) {
      let id = (await this.userRepository.findOneBy({ username: nome })).id
      return this.userRepository.delete({id});
    } else {
      return "Não é permitido realizar essa ação.";
    }
  }
}
