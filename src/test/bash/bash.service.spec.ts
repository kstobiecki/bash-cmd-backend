import { Test, TestingModule } from '@nestjs/testing';
import { BashService } from '../../bash/bash.service';
import { Bash } from '../../bash/schemas/bash.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('BashService', () => {
  let bashService: BashService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        BashService,
        {
          provide: getModelToken(Bash.name),
          useValue: MockedBashModel,
        },
      ],
    }).compile();

    bashService = app.get<BashService>(BashService);
  });

  describe('execCommand', () => {
    it('should execute given command and return proper value', async () => {
      expect(await bashService['execCommand']('echo test')).toStrictEqual(
        'test\n',
      );
    });

    it('should throw an error when passing empty string as a command', async () => {
      await expect(bashService['execCommand']('')).rejects.toThrow(
        `The argument 'file' cannot be empty. Received ''`,
      );
    });

    it('should throw an error when passing not known command', async () => {
      await expect(bashService['execCommand']('asd12')).rejects.toThrow(
        `Command failed: asd12\n/bin/sh: asd12: command not found`,
      );
    });
  });
});

class MockedBashModel {}
