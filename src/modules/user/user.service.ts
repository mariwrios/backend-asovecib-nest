import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {

  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new User();
      newUser.email = createUserDto.email;
      newUser.password = createUserDto.password;
      newUser.userTypeId = createUserDto.userTypeId;

      const userCreated = await this.userRepository.save(newUser);
      return userCreated;
    } catch (error) {
      this.logger.error('Ha ocurrido un error', error, 'create - UserService');
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
