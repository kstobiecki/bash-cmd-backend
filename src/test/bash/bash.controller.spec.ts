import { Test, TestingModule } from '@nestjs/testing';
import { BashController } from '../../bash/bash.controller';
import { BashService } from '../../bash/bash.service';
import { Bash } from '../../bash/schemas/bash.schema';
import { getModelToken } from '@nestjs/mongoose';
import { BashResultDto } from '../../bash/dto';

describe('BashController', () => {
  let bashController: BashController;
  let bashService: BashService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BashController],
      providers: [
        BashService,
        {
          provide: getModelToken(Bash.name),
          useValue: MockedBashModel,
        },
      ],
    }).compile();

    bashController = app.get<BashController>(BashController);
    bashService = app.get<BashService>(BashService);
  });

  describe('run-cmd', () => {
    it('should return cmd result"', async () => {
      expect(
        await bashController.runCommand({ cmd: 'echo test' }),
      ).toStrictEqual({
        cmd: 'echo test',
        result: 'test\n',
      });
    });

    it('should throw bad request exception when cmd is an empty string"', async () => {
      await expect(bashController.runCommand({ cmd: '' })).rejects.toThrow(
        'Bad Request Exception',
      );
    });

    it('should throw bad request exception when cmd is not known bash command"', async () => {
      await expect(bashController.runCommand({ cmd: 'asd' })).rejects.toThrow(
        'Bad Request Exception',
      );
    });
  });

  describe('results', () => {
    it('', async () => {
      expect(await bashController.getResults({})).toStrictEqual([
        mockedBashResult,
      ]);
    });
  });
});

class MockedBashModel {
  private readonly mockedModel: BashResultDto;
  constructor(mockedModel: BashResultDto) {
    this.mockedModel = mockedModel;
  }
  public async save() {
    return this.mockedModel;
  }

  public static aggregate() {
    return { exec: this.exec };
  }

  public static exec() {
    return [mockedBashResult];
  }
}

const mockedBashResult: BashResultDto = {
  cmd: 'cmd',
  result: 'result',
} as BashResultDto;
