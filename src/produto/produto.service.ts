import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProdutoService {
  constructor(@InjectRepository(Produto) private produtoRepository:Repository<Produto>,
              @InjectRepository(User) private userRepository:Repository<User>){}
  
  /* criar um produto (apenas admins). */
  async create(id: number, createProdutoDto: CreateProdutoDto) {
    if ((await this.userRepository.findOneBy({ id })).admin == true) {
      const newProduto = this.produtoRepository.create({
        ...createProdutoDto,
      });
      this.produtoRepository.save(newProduto);
    } else {
      return "Não é permitido realizar essa ação."
    }
  }

  /* ver lista de produtos. */
  findAll() {
    return this.produtoRepository.find();
  }

  /* ver um produto. */
  findOne(id: number) {
    return this.produtoRepository.findOneBy({id});
  }

  /* modificar um produto (apenas admins). */
  async update(userid: number, id: number, updateProdutoDto: UpdateProdutoDto) {
    if ((await this.userRepository.findOneBy({ id: userid })).admin == true) {
      this.produtoRepository.update({id}, {...updateProdutoDto});
    } else {
      return "Não é permitido realizar essa ação."
    }
  }

  /* deletar um produto (apenas admins). */
  async remove(userid: number, id: number) {
    if ((await this.userRepository.findOneBy({ id: userid })).admin == true) {
      this.produtoRepository.delete({id});
    } else {
      return "Não é permitido realizar essa ação."
    }
  }
}
