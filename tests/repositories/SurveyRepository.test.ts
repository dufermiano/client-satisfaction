import { SurveyRepository } from '../../src/repositories/SurveyRepository';

// Mockando os modelos diretamente
jest.mock('../../src/models/Survey', () => ({
  Survey: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
}));
jest.mock('../../src/models/Question', () => ({
  Question: {},
}));
jest.mock('../../src/models/Answer', () => ({
  Answer: {},
}));

const { Survey } = require('../../src/models/Survey'); // Importando o mock

describe('SurveyRepository', () => {
  let surveyRepository: SurveyRepository;

  beforeEach(() => {
    surveyRepository = new SurveyRepository();
    jest.clearAllMocks(); // Limpa os mocks a cada teste
  });

  it('deve criar uma nova survey', async () => {
    const surveyData = { title: 'Teste Survey' };
    Survey.create.mockResolvedValue({ id: 1, ...surveyData });

    const result = await surveyRepository.create(surveyData);

    expect(Survey.create).toHaveBeenCalledWith(surveyData);
    expect(result).toEqual({ id: 1, ...surveyData });
  });

  it('deve buscar todas as surveys', async () => {
    const surveys = [{ id: 1, title: 'Survey 1' }];
    Survey.findAll.mockResolvedValue(surveys);

    const result = await surveyRepository.findAll();

    expect(Survey.findAll).toHaveBeenCalled();
    expect(result).toEqual(surveys);
  });

  it('deve buscar uma survey por ID', async () => {
    const survey = { id: 1, title: 'Survey 1' };
    Survey.findByPk.mockResolvedValue(survey);

    const result = await surveyRepository.findById(1);

    expect(Survey.findByPk).toHaveBeenCalledWith(
      1,
      expect.objectContaining({
        include: expect.any(Array),
      })
    );
    expect(result).toEqual(survey);
  });

  it('deve retornar null se não encontrar a survey por ID', async () => {
    Survey.findByPk.mockResolvedValue(null);

    const result = await surveyRepository.findById(99);

    expect(Survey.findByPk).toHaveBeenCalledWith(
      99,
      expect.objectContaining({
        include: expect.any(Array),
      })
    );
    expect(result).toBeNull();
  });
});
