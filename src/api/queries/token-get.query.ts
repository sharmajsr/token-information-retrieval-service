import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenGetQuery {
  constructor(public readonly id: string,public readonly token: string) {}
}
