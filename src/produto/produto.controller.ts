import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  /* http://localhost:3000/produto/(userid)/criar : */
  @Post(':userid/criar')
  create(@Param('userid') userid: number, @Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(+userid, createProdutoDto);
  }

  /* http://localhost:3000/produto : */
  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  /* http://localhost:3000/produto/(id) : */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  /* http://localhost:3000/produto/(userid)/modificar/(id) : */
  @Patch(':userid/modificar/:id')
  update(@Param('userid') userid: string, @Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+userid, +id, updateProdutoDto);
  }

  /* http://localhost:3000/produto/(userid)/deletar/(id) : */
  @Delete(':userid/deletar/:id')
  remove(@Param('userid') userid: string, @Param('id') id: string) {
    return this.produtoService.remove(+userid, +id);
  }
}
