import { DataSource } from "typeorm";

// @ts-ignore
export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(() => ({
  findAll: jest.fn(),
  getRepository: jest.fn()
}));

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};