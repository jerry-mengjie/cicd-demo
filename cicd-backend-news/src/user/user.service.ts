import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject('Micro_Service_User') private client: ClientProxy,
  ) {}

  findMicro() {
    return this.client
      .send<string, string>('Micro_Service_User_Find_All', '')
      .subscribe(
        (response) => console.log(11, response),
        (error) => console.error(22, error),
      );
  }

  async findAxios(query: { keyWord: string; page: number; pageSize: number }) {
    console.log('query', query);
    console.log('MYSQL_HOST', this.configService.get('MYSQL_HOST'));
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `http://${
            this.configService.get('MYSQL_HOST') +
            ':' +
            this.configService.get('AXIOS_USER_PORT')
          }/api-user/user`,
          {
            params: query,
          },
        )
        .pipe(
          catchError((error) => {
            throw '11' + error.response.data;
          }),
        ),
    );
    console.log('22', data);
    return data;
  }
}
