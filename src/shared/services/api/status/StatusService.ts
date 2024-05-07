import { Environment } from "../../../environment";
import { Api } from "../axios-config";

export interface IDetalheStatus {
  id: number;
  nome: string;
}

export interface IListagemStatus {
  id: number;
  nome: string;
}

type TStatusComTotalCount = {
  data: IListagemStatus[];
  totalCount: number;
};

const getAll = async (
  page = 1,
  filter = ""
): Promise<TStatusComTotalCount | Error> => {
  try {
    const urlRelativa = `/status?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nome_like=${filter}`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }

    return new Error("Erro ao listar os registros.");
  } catch (error) {
    console.error(error);
    return (
      new Error((error as { message: string }).message) ||
      "Erro ao listar os registros."
    );
  }
};

const getById = async (id: number): Promise<IDetalheStatus | Error> => {
  try {
    const { data } = await Api.get(`/status/${id}`);

    if (data) {
      return data;
    }

    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.error(error);
    return (
      new Error((error as { message: string }).message) ||
      "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dados: Omit<IDetalheStatus, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheStatus>("/status", dados);

    if (data) {
      return data.id;
    }

    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.error(error);
    return (
      new Error((error as { message: string }).message) ||
      "Erro ao criar o registro."
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetalheStatus
): Promise<void | Error> => {
  try {
    await Api.put(`/status/${id}`, dados);
  } catch (error) {
    console.error(error);
    return (
      new Error((error as { message: string }).message) ||
      "Erro ao atualizar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/status/${id}`);
  } catch (error) {
    console.error(error);
    return (
      new Error((error as { message: string }).message) ||
      "Erro ao remover o registro."
    );
  }
};

export const StatusService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
